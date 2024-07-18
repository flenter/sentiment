import type { FC } from "hono/jsx";
import { RequestContext } from "hono/jsx-renderer";

export const Layout: FC = (
  { children, context }
) => {
  return (
    <html lang="en" class="dark">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com" />
      </head>
      <body class="bg-gray-800 text-gray-200">
        <div class="flex justify-center h-screen py-2">
          <div class="w-1/2">
            <h1 class="text-3xl py-2 font-serif">
              <a href="/" class="text-blue-400 hover:underline decoration-1 underline-offset-4">
                Sentiment
              </a>
            </h1>
            <RequestContext.Provider value={context}>
              {children}
            </RequestContext.Provider>
          </div>
        </div>
      </body>
    </html>
  );
};
