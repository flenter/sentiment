import { Hono } from "hono";
import { createHonoMiddleware } from "@fiberplane/hono";
import { app as apiApp } from "./api";
import { app as pagesApp } from "./pages";

const app = new Hono();
app.use(createHonoMiddleware(app));
app.route("/", apiApp);
app.route("/", pagesApp);


export default app;
