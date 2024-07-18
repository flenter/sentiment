import { useRequestContext } from "hono/jsx-renderer";
import { createDb, getSentiments } from "../../db";
import type { FC } from "hono/jsx";
import { Score } from "../../components/Score";

export const ListSentiments: FC = async () => {
  const c = useRequestContext();
  const db = createDb(c);
  const sentiments = await getSentiments(db);
  // console.log(sentiments[0].created_at)
  // console.log('sentimensts', sentiments.length.toString())
  return (
    <ul>
      {
        // .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        sentiments
          .map((sentiment) => {
            const url = new URL(sentiment.url);
            return (
              <li key={sentiment.url} >
                <a href={`/sentiments/${encodeURIComponent(sentiment.url)}`}
                  class="hover:underline hover:text-blue-400 text-blue-300 block py-2 grid grid-cols-12 gap-1 text-l"
                >
                  <div class="col-span-10">
                    {sentiment.title}
                  </div>
                  <div class="col-span-2 grid justify-end">
                    <Score score={sentiment.score} class="min-w-6 w-fit h-fit text-center text-white px-1 py-0.5" />
                  </div>
                  <div class="col-span-12 grid gap-0.5">
                    <div class="flex justify-between text-blue-200 opacity-50">
                      <span class="text-xs block">{sentiment.url}</span>
                      <span class="text-xs block whitespace-nowrap">{new Date(sentiment.created_at).toLocaleTimeString()}</span>
                    </div>
                    <div class="flex gap-1">
                      <div class="rounded-full bg-slate-500 px-2 w-fit text-gray-100 text-xs">
                        {url.hostname}
                      </div>
                      {url.pathname === "/" || url.pathname === "" ?
                        <div class="rounded-full bg-indigo-500 px-2 w-fit text-indigo-100 text-xs">
                          root
                        </div> : null}
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
    </ul>
  );
}
