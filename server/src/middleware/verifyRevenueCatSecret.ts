import type { NextFunction, Request, Response } from "express";

export function verifyRevenueCatSecret(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.REVENUECAT_WEBHOOK_SECRET;
  if (!expected) {
    throw new Error("REVENUECAT_WEBHOOK_SECRET is not set");
  }

  const header = req.headers.authorization;
  if (header !== `Bearer ${expected}`) {
    return res.status(401).json({ error: "unauthorized" });
  }

  next();
}
