import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { weeklyContent } from "../db/schema.js";

export const weeklyContentRouter = Router();

// Content is grounded in and cited to trusted authorities (docs/plan.md Section 6.2)
// rather than gated behind a human review step — no reviewedByObGyn check here.
weeklyContentRouter.get("/:week", async (req, res) => {
  const week = Number(req.params.week);
  if (!Number.isInteger(week) || week < 1 || week > 42) {
    return res.status(400).json({ error: "week must be an integer between 1 and 42" });
  }

  const [content] = await db
    .select()
    .from(weeklyContent)
    .where(eq(weeklyContent.weekNumber, week));

  if (!content) {
    return res.status(404).json({ error: "No content for this week yet" });
  }

  res.json(content);
});
