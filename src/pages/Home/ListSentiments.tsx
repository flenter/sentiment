import { useRequestContext } from "hono/jsx-renderer";
import { createDb, getSentiments } from "../../db";
import type { FC } from "hono/jsx";

export const ListSentiments: FC = async () => {
  const c = useRequestContext();
  const db = createDb(c);
  const sentiments = await getSentiments(db);
  console.log('sentimensts', sentiments.length.toString())
  return (
    <ul>
      {sentiments.map((sentiment) => {
        console.log(sentiment.createdAt)
        return (
          <li key={sentiment.url} >
            <a href={`/sentiments/${encodeURIComponent(sentiment.url)}`}>
              {sentiment.title} - {sentiment.createdAt.toLocaleTimeString()}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
