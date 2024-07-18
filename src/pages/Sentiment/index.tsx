import { useRequestContext } from "hono/jsx-renderer";
import { createDb, getLatestSentiment } from "../../db";
import { History } from "./History";

export const Sentiment = async ({ url }: { url: string }) => {
  const c = useRequestContext();
  const db = createDb(c);
  const sentiment = await getLatestSentiment(db, url);
  if (!sentiment) {
    return <p>No sentiment found for {url}</p>
  }

  return (
    <>
      <div class="pb-4 grid grid-cols-12 items-center">
        <div class="col-span-10">
          <div class="text-2xl">
            <a
              class="block  pb-2"
              href={sentiment.url}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              {sentiment.title}
            </a>
            <span class="text-xs">{sentiment.createdAt.toLocaleTimeString()}</span>
          </div>
        </div>
        <div class="col-span-2 text-2xl text-bold text-right">
          {sentiment.score}
        </div>
      </div>
      <div>Content</div>
      <div>
        <pre class="text-wrap text-pretty max-h-20 overflow-auto">
          {sentiment.content}
        </pre>
      </div>
      <History url={url} active={sentiment.id} />
    </>
  );
};
