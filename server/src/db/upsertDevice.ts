import { sql } from "drizzle-orm";
import { db } from "./client.js";
import { devices } from "./schema.js";

export async function upsertDevice(deviceId: string) {
  await db
    .insert(devices)
    .values({ id: deviceId })
    .onConflictDoUpdate({
      target: devices.id,
      set: { lastSeenAt: sql`now()` },
    });
}
