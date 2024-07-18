import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { Context } from "hono";

import { sentimentTable } from "./schema";
export { sentimentTable } from "./schema";
export * from "./queries";

export function createDb(c: Context) {
  if (!c.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not defined");
  }

  const sql = neon(c.env.DATABASE_URL);
  const db = drizzle(sql, {
    schema: {
      sentiment: sentimentTable,
    },
    // logger: true,
  });
  return db;
}
