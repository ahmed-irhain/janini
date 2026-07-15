import { Router } from "express";
import { desc, eq, isNull } from "drizzle-orm";
import { db } from "../db/client.js";
import { articles } from "../db/schema.js";

export const articlesRouter = Router();

// Articles tied to a specific week.
articlesRouter.get("/:week", async (req, res) => {
  const week = Number(req.params.week);
  if (!Number.isInteger(week) || week < 1 || week > 42) {
    return res.status(400).json({ error: "week must be an integer between 1 and 42" });
  }

  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.weekNumber, week))
    .orderBy(desc(articles.publishedAt));

  res.json(rows);
});

// General articles not tied to any specific week.
articlesRouter.get("/", async (_req, res) => {
  const rows = await db
    .select()
    .from(articles)
    .where(isNull(articles.weekNumber))
    .orderBy(desc(articles.publishedAt));

  res.json(rows);
});
