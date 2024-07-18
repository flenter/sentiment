CREATE TABLE IF NOT EXISTS "sentiment" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"content" jsonb,
	"score" integer NOT NULL
);
