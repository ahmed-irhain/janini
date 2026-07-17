import type { NextFunction, Request, Response } from "express";
import { upsertDevice } from "../db/upsertDevice.js";

export async function requireDeviceId(req: Request, res: Response, next: NextFunction) {
  const deviceId = req.headers["x-device-id"];
  if (typeof deviceId !== "string" || deviceId.length < 8) {
    return res.status(400).json({ error: "missing_device_id" });
  }

  req.deviceId = deviceId;
  await upsertDevice(deviceId);
  next();
}
