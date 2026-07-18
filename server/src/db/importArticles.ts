import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { articles } from "./schema.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const contentDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../content/articles");

interface ParsedArticle {
  titleAr: string;
  summaryAr: string;
  bodyAr: string | null;
  sourceName: string | null;
  sourceUrl: string | null;
  weekNumber: number | null;
}

/** Parses a `---`-delimited frontmatter block (title/summary/sourceName/
 * sourceUrl/weekNumber) followed by a raw Markdown body, per the format
 * documented in server/content/articles/*.md. Values must fit on one line —
 * no multi-line YAML folding is supported, keeping this a plain key:value
 * splitter rather than a full YAML parser. */
function parseArticleFile(raw: string): ParsedArticle {
  const normalized = raw.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    throw new Error("Article markdown file must start with a --- frontmatter block");
  }
  const frontmatterEnd = normalized.indexOf("\n---", 4);
  if (frontmatterEnd === -1) {
    throw new Error("Article markdown file is missing a closing --- for frontmatter");
  }

  const frontmatter: Record<string, string> = {};
  for (const line of normalized.slice(4, frontmatterEnd).split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    frontmatter[line.slice(0, separatorIndex).trim()] = line.slice(separatorIndex + 1).trim();
  }

  const body = normalized
    .slice(frontmatterEnd + 4)
    .replace(/^\n+/, "")
    .trimEnd();

  if (!frontmatter.title) throw new Error("Article markdown file is missing a 'title' frontmatter field");
  if (!frontmatter.summary) throw new Error("Article markdown file is missing a 'summary' frontmatter field");

  return {
    titleAr: frontmatter.title,
    summaryAr: frontmatter.summary,
    bodyAr: body.length > 0 ? body : null,
    sourceName: frontmatter.sourceName ?? null,
    sourceUrl: frontmatter.sourceUrl ?? null,
    weekNumber: frontmatter.weekNumber ? Number(frontmatter.weekNumber) : null,
  };
}

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

const files = readdirSync(contentDir).filter((file) => file.endsWith(".md"));

let inserted = 0;
let updated = 0;
for (const file of files) {
  const parsed = parseArticleFile(readFileSync(path.join(contentDir, file), "utf-8"));

  const [existing] = await db.select().from(articles).where(eq(articles.titleAr, parsed.titleAr));

  if (existing) {
    await db
      .update(articles)
      .set({
        summaryAr: parsed.summaryAr,
        bodyAr: parsed.bodyAr,
        sourceName: parsed.sourceName,
        sourceUrl: parsed.sourceUrl,
        weekNumber: parsed.weekNumber,
      })
      .where(eq(articles.id, existing.id));
    updated++;
  } else {
    await db.insert(articles).values({
      weekNumber: parsed.weekNumber,
      titleAr: parsed.titleAr,
      summaryAr: parsed.summaryAr,
      bodyAr: parsed.bodyAr,
      sourceName: parsed.sourceName,
      sourceUrl: parsed.sourceUrl,
      publishedAt: new Date(),
    });
    inserted++;
  }
}

await sql.end();
console.log(`Imported ${files.length} article file(s): ${inserted} inserted, ${updated} updated.`);
