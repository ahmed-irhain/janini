import { Router } from "express";
import { eq } from "drizzle-orm";
import type { SubscriptionState, SubscriptionStatus } from "@janini/shared";
import { db } from "../db/client.js";
import { subscriptions } from "../db/schema.js";
import { upsertDevice } from "../db/upsertDevice.js";
import { requireDeviceId } from "../middleware/requireDeviceId.js";
import { verifyRevenueCatSecret } from "../middleware/verifyRevenueCatSecret.js";

export const subscriptionsRouter = Router();

// RevenueCat event types that grant/restore access. NON_RENEWING_PURCHASE
// covers the one-time pass (a non-consumable product, not a subscription).
const ACTIVE_EVENT_TYPES = new Set(["INITIAL_PURCHASE", "RENEWAL", "UNCANCELLATION", "NON_RENEWING_PURCHASE"]);

// CANCELLATION intentionally does NOT map to "expired" here: the user has
// turned off auto-renew but keeps access through the end of the period
// they already paid for. Apple/RevenueCat send a separate EXPIRATION event
// once that period actually ends — that's the only event that revokes
// access. Flipping status on CANCELLATION would cut users off early.
export function statusForEvent(eventType: string): SubscriptionStatus | null {
  if (ACTIVE_EVENT_TYPES.has(eventType)) return "active";
  if (eventType === "EXPIRATION") return "expired";
  if (eventType === "BILLING_ISSUE") return "billing_issue";
  return null;
}

interface RevenueCatWebhookBody {
  event?: {
    type?: string;
    app_user_id?: string;
    product_id?: string;
    expiration_at_ms?: number;
    environment?: string;
  };
}

subscriptionsRouter.post("/webhook", verifyRevenueCatSecret, async (req, res) => {
  const body = req.body as RevenueCatWebhookBody;
  const event = body.event;
  const deviceId = event?.app_user_id;

  if (!event?.type || !deviceId) {
    return res.status(400).json({ error: "missing_app_user_id" });
  }

  const nextStatus = statusForEvent(event.type);
  if (!nextStatus) {
    // Unrecognized/no-op event type (e.g. TRANSFER, SUBSCRIPTION_PAUSED) —
    // acknowledge so RevenueCat doesn't retry, but don't touch stored state.
    console.log(`Ignoring unhandled RevenueCat event type: ${event.type}`);
    return res.status(200).json({ received: true });
  }

  await upsertDevice(deviceId);

  const environment = event.environment === "SANDBOX" ? "sandbox" : "production";

  await db
    .insert(subscriptions)
    .values({
      deviceId,
      revenueCatAppUserId: deviceId,
      productId: event.product_id ?? null,
      status: nextStatus,
      expiresAt: event.expiration_at_ms ? new Date(event.expiration_at_ms) : null,
      environment,
      lastEventType: event.type,
      lastEventAt: new Date(),
    })
    .onConflictDoUpdate({
      target: subscriptions.deviceId,
      set: {
        productId: event.product_id ?? null,
        status: nextStatus,
        expiresAt: event.expiration_at_ms ? new Date(event.expiration_at_ms) : null,
        environment,
        lastEventType: event.type,
        lastEventAt: new Date(),
        updatedAt: new Date(),
      },
    });

  res.status(200).json({ received: true });
});

subscriptionsRouter.get("/status", requireDeviceId, async (req, res) => {
  const deviceId = req.deviceId!;

  const [row] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.deviceId, deviceId));

  if (!row) {
    const empty: SubscriptionState = {
      deviceId,
      status: "none",
      productId: null,
      expiresAt: null,
      environment: null,
    };
    return res.json(empty);
  }

  // Lazy expiry check: webhook delivery isn't instant, and the app calls
  // this on every launch, so a stale "active" row past its expiresAt should
  // read as expired even before the EXPIRATION webhook lands. This does not
  // mutate the row — the webhook remains the source of truth for writes.
  const isPastExpiry = row.status === "active" && row.expiresAt !== null && row.expiresAt < new Date();

  const state: SubscriptionState = {
    deviceId,
    status: isPastExpiry ? "expired" : row.status,
    productId: row.productId,
    expiresAt: row.expiresAt ? row.expiresAt.toISOString() : null,
    environment: row.environment,
  };

  res.json(state);
});
