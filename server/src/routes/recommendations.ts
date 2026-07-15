import { Router } from "express";
import { asc, eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { recommendations } from "../db/schema.js";

export const recommendationsRouter = Router();

recommendationsRouter.get("/:week", async (req, res) => {
  const week = Number(req.params.week);
  if (!Number.isInteger(week) || week < 1 || week > 42) {
    return res.status(400).json({ error: "week must be an integer between 1 and 42" });
  }

  const rows = await db
    .select()
    .from(recommendations)
    .where(eq(recommendations.weekNumber, week))
    .orderBy(asc(recommendations.sortOrder));

  res.json(rows);
});
