import { Router } from "express";
import { asc } from "drizzle-orm";
import { db } from "../db/client.js";
import { topics } from "../db/schema.js";

export const topicsRouter = Router();

topicsRouter.get("/", async (_req, res) => {
  const rows = await db.select().from(topics).orderBy(asc(topics.sortOrder));
  res.json(rows);
});
