import type { drizzle } from "drizzle-orm/neon-http";
import { and, desc, eq, sql } from "drizzle-orm";

import { sentimentTable } from "./schema";

export async function getSentiments(db: ReturnType<typeof drizzle>) {
  // const urls = await db.selectDistinct({url: sentimentTable.url}).from(sentimentTable).execute();

  // return await db
  // 	.selectDistinct()
  // 	.from(sentimentTable)
  // 	.orderBy(desc(sentimentTable.createdAt))
  // 	.execute();
  // Subquery to get the latest createdAt for each URL
  // Subquery to get the latest createdAt for each URL
  const latestPerURL = db
    .select({
      url: sentimentTable.url,
      latestCreatedAt: sql`MAX(${sentimentTable.createdAt})`.as(
        "latest_created_at",
      ),
    })
    .from(sentimentTable)
    .groupBy(sentimentTable.url)
    .as("latest_per_url");

  // Main query to get the complete row for each URL's latest createdAt
  const query = db
    .select()
    .from(sentimentTable)
    .innerJoin(
      latestPerURL,
      and(
        eq(sentimentTable.url, latestPerURL.url),
        eq(sentimentTable.createdAt, latestPerURL.latestCreatedAt),
      ),
    )
    .orderBy(desc(sentimentTable.createdAt));

  // Execute the query
  const results = await db.execute(query);

  return results.rows;
}

export async function getLatestSentiment(
  db: ReturnType<typeof drizzle>,
  url: string,
) {
  const entries = await db
    .select()
    .from(sentimentTable)
    .orderBy(desc(sentimentTable.createdAt))
    .where(eq(sentimentTable.url, url))
    .limit(1)
    .execute();

  return entries[0];
}

export async function getSentimentHistory(
  db: ReturnType<typeof drizzle>,
  url: string,
) {
  return await db
    .select()
    .from(sentimentTable)
    .orderBy(desc(sentimentTable.createdAt))
    .where(eq(sentimentTable.url, url))
    .execute();
}

export async function getSentimentHistoryForId(
  db: ReturnType<typeof drizzle>,
  id: number,
) {
  const entries = await db
    .select()
    .from(sentimentTable)
    .where(eq(sentimentTable.id, id))
    .limit(1)
    .execute();
  return entries[0];
}
