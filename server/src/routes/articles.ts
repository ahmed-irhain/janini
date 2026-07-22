import { Router } from "express";
import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "../db/client.js";
import { articles, topics } from "../db/schema.js";

export const articlesRouter = Router();

function withTopic() {
  return db
    .select({
      id: articles.id,
      weekNumber: articles.weekNumber,
      titleAr: articles.titleAr,
      summaryAr: articles.summaryAr,
      bodyAr: articles.bodyAr,
      sourceName: articles.sourceName,
      sourceUrl: articles.sourceUrl,
      publishedAt: articles.publishedAt,
      createdAt: articles.createdAt,
      topic: topics,
    })
    .from(articles)
    .leftJoin(topics, eq(articles.topicId, topics.id));
}

function normalizeTopic<T extends { topic: { id: string | null } | null }>(row: T) {
  return { ...row, topic: row.topic?.id ? row.topic : null };
}

// Single article by id. Must be registered before "/:week" — otherwise a
// request like "/id/<uuid>" gets intercepted by "/:week" (week="id") and
// 400s before ever reaching this route.
articlesRouter.get("/id/:id", async (req, res) => {
  const [row] = await withTopic().where(eq(articles.id, req.params.id));
  if (!row) {
    return res.status(404).json({ error: "article not found" });
  }
  res.json(normalizeTopic(row));
});

// Articles tied to a specific week.
articlesRouter.get("/:week", async (req, res) => {
  const week = Number(req.params.week);
  if (!Number.isInteger(week) || week < 1 || week > 42) {
    return res.status(400).json({ error: "week must be an integer between 1 and 42" });
  }

  const rows = await withTopic()
    .where(eq(articles.weekNumber, week))
    .orderBy(desc(articles.publishedAt));

  res.json(rows.map(normalizeTopic));
});

// General articles not tied to any specific week, optionally filtered by topic slug.
articlesRouter.get("/", async (req, res) => {
  const topicSlug = typeof req.query.topic === "string" ? req.query.topic : undefined;

  const rows = await withTopic()
    .where(
      topicSlug
        ? and(isNull(articles.weekNumber), eq(topics.slug, topicSlug))
        : isNull(articles.weekNumber)
    )
    .orderBy(desc(articles.publishedAt));

  res.json(rows.map(normalizeTopic));
});
