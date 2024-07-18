import { useRequestContext } from "hono/jsx-renderer";
import { createDb, getSentimentHistory } from "../../db";

export async function History({ url, active }: { url: string, active: number }) {
  const c = useRequestContext();
  const db = createDb(c);

  const history = await getSentimentHistory(db, url);

  return (
    <>
      <h1 class="text-2xl">History</h1>
      <div class="grid grid-cols-4 gap-4">
        {history.map((sentiment) => (
          <div key={sentiment.id} class={`py-4 ${active === sentiment.id ? "font-bold" : ""}`}>
            <span class="text-2xl">{sentiment.score}</span> -
            <span class="text-sm">
              {sentiment.createdAt.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </>);
}
