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
	validator("form", async (value, c) => {
		const parsed = schema.safeParse(value);
		if (!parsed.success) {
			return c.json(parsed.error);
		}
		return parsed.data;
	}),
	async (c) => {
		const db = createDb(c);
		const { url } = await c.req.valid("form");
		const headers = {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"Accept-Language": "en-US,en;q=0.9",
			"Accept-Encoding": "gzip, deflate, br",
			Connection: "keep-alive",
			"Upgrade-Insecure-Requests": "1",
			"Sec-Fetch-Dest": "document",
			"Sec-Fetch-Mode": "navigate",
			"Sec-Fetch-Site": "none",
			"Sec-Fetch-User": "?1",
		};
		const result = await fetch(url, {
			headers,
		});
		const html = await result.text();
		const $ = load(html);
		const title = $("title").text() || "No title";
		const text = stripHtml(html).result;
		const api = new Sentiment();
		const { score } = api.analyze(text);

		const last = await getLatestSentiment(db, url);

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
		}

		return c.redirect(`/sentiments/${encodeURIComponent(url)}`);
	},
);
