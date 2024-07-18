import { useRequestContext } from "hono/jsx-renderer";
import { createDb, getSentimentHistory } from "../../db";
import { Score } from "../../components/Score";

export async function History({ url, active }: { url: string, active: number }) {
  const c = useRequestContext();
  const db = createDb(c);

  const history = await getSentimentHistory(db, url);

  return (
    <>
      <h1 class="text-2xl">History</h1>
      <div class="grid grid-cols-4 gap-x-4 gap-y-1 -mx-2">
        {history.map((sentiment) => (
          <div key={sentiment.id}>
            <a class="grid gap-2 grid-cols-4 gap-0.5 px-2 items-center hover:bg-gray-600 py-2 rounded" href={`/sentiments/${encodeURIComponent(url)}/${sentiment.id}`}>
              <span class={`${active === sentiment.id ? "font-bold underline" : ""} text-sm col-span-3`}>
                {sentiment.createdAt.toLocaleTimeString()}
              </span>
              <span class="text-2xl"><Score score={sentiment.score} class="min-w-5 no-underline" /></span>
            </a>
          </div>
        ))}
      </div>
    </>);
}
