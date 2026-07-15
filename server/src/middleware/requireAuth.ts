import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../auth/jwt.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;
  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "unauthorized" });
  }

  req.userId = payload.sub;
  next();
}
