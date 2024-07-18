import { Hono } from "hono";
import { validator } from "hono/validator";
import { load } from "cheerio";
import { stripHtml } from "string-strip-html";
import { diffWords } from "diff";
import { z } from "zod";
import Sentiment from "sentiment";
import {
  createDb,
  getLatestSentiment,
  getSentiments,
  sentimentTable,
} from "../db";

export const app = new Hono();

app.get("/api/sentiments", async (c) => {
  const db = createDb(c);
  const sentiments = await getSentiments(db);
  return c.json(sentiments);
});

const schema = z.object({
  url: z.string().url(),
});

app.post(
  "/api/sentiments",
  validator("query", async (value, c) => {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      return c.json(parsed.error);
    }
    return parsed.data;
  }),
  async (c) => {
    const db = createDb(c);
    const { url } = await c.req.valid("query");
    const result = await fetch(url);
    const html = await result.text();
    const $ = load(html);
    const title = $("title").text() || "No title";
    const text = stripHtml(html).result;
    const api = new Sentiment();
    const { score, ...analysis } = api.analyze(text);

    const last = await getLatestSentiment(db, url);

    let delta: number | null = null;
    if (last) {
      delta = score - last.score;
    }

    const diff =
      last?.content !== text
        ? diffWords(last?.content || "", text, {
            ignoreWhitespace: true,
          })
        : [];

    if (!last || last.content !== text) {
      await db
        .insert(sentimentTable)
        .values({
          url,
          score,
          title,
          content: text,
        })
        .execute();

      // const newest = await getLatestSentiment(db, url);
      // if (newest) {
      //   console.log(`id: ${newest.id}`);
      // }
    }

    return c.json({
      score,
      delta,
      diff,
      changed: last?.content !== text,
    });
  },
);
