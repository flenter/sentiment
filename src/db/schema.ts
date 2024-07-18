import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const sentimentTable = pgTable("sentiment", {
	id: serial("id").primaryKey(),
	url: text("url").notNull(),
	title: text("title").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	content: text("content").notNull(),
	score: integer("score").notNull(),
});

export type InsertSentiment = typeof sentimentTable.$inferInsert;
export type SelectSentiment = typeof sentimentTable.$inferSelect;
