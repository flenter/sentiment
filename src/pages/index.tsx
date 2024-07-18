import { useRef, type FC } from 'hono/jsx'
import { RequestContext, useRequestContext } from "hono/jsx-renderer";

import { createDb, getLatestSentiment, getSentiments } from "../db";
import { Hono } from 'hono';
import { Layout } from './Layout';
import { Home } from './Home';
import { Sentiment } from './Sentiment';

export const app = new Hono();

app.get("/", async (c) => {
  return c.html(
    <Layout context={c}>
      <Home />
    </Layout>);
});

app.get("/sentiments/:url", async (c) => {
  const url = c.req.param("url");
  return c.html(<Layout context={c}>
    <Sentiment url={url} />
  </Layout>);
});

app.get("/sentiments/:url/:id", async (c) => {
  const url = c.req.param("url");
  const rawId = c.req.param("id");
  const id = Number.parseInt(rawId, 10);

  return c.html(<Layout context={c}>
    <Sentiment url={url} id={id} />
  </Layout>);
});
