// export function findLatestSentiment() {
//   return db
//   return db.query.sentiment.findFirst({
//     orderBy: {
//       createdAt: "desc"
//     }
//   });
// }

import type { drizzle } from "drizzle-orm/neon-http";
import { sentimentTable } from "./schema";
import { desc, eq } from "drizzle-orm";

export async function getSentiments(db: ReturnType<typeof drizzle>) {
  return await db
    .selectDistinctOn([sentimentTable.url])
    .from(sentimentTable)
    // .orderBy(desc(sentimentTable.createdAt))
    .execute();
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
