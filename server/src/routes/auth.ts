import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { users } from "../db/schema.js";
import { hashPassword, verifyPassword } from "../auth/password.js";
import { signToken } from "../auth/jwt.js";
import { isValidEmail, isValidPassword, normalizeEmail } from "../auth/validation.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const authRouter = Router();

const PUBLIC_USER_COLUMNS = {
  id: users.id,
  email: users.email,
  displayName: users.displayName,
  locale: users.locale,
  createdAt: users.createdAt,
};

authRouter.post("/signup", async (req, res) => {
  const { email, password, displayName } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "invalid_email" });
  }

  const normalizedEmail = normalizeEmail(email);
  if (!isValidEmail(normalizedEmail)) {
    return res.status(400).json({ error: "invalid_email" });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: "invalid_password" });
  }

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, normalizedEmail));
  if (existing) {
    return res.status(409).json({ error: "email_taken" });
  }

  const passwordHash = await hashPassword(password);
  const [created] = await db
    .insert(users)
    .values({
      email: normalizedEmail,
      passwordHash,
      displayName: typeof displayName === "string" ? displayName : null,
    })
    .returning(PUBLIC_USER_COLUMNS);

  const token = signToken(created.id);
  res.status(201).json({ token, user: created });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  const normalizedEmail = normalizeEmail(email);
  const [found] = await db.select().from(users).where(eq(users.email, normalizedEmail));
  if (!found) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  const passwordMatches = await verifyPassword(password, found.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  const token = signToken(found.id);
  res.json({
    token,
    user: {
      id: found.id,
      email: found.email,
      displayName: found.displayName,
      locale: found.locale,
      createdAt: found.createdAt,
    },
  });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const [found] = await db
    .select(PUBLIC_USER_COLUMNS)
    .from(users)
    .where(eq(users.id, req.userId!));
  if (!found) {
    return res.status(401).json({ error: "unauthorized" });
  }
  res.json({ user: found });
});
