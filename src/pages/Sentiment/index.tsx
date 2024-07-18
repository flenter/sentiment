import { useRequestContext } from "hono/jsx-renderer";
import { createDb, getLatestSentiment, getSentimentHistoryForId } from "../../db";
import { History } from "./History";
import { Score } from "../../components/Score";

export const Sentiment = async ({ url, id }: { url: string, id?: number }) => {
  const c = useRequestContext();
  const db = createDb(c);
  const sentiment = id !== undefined ?
    await getSentimentHistoryForId(db, id)
    : await getLatestSentiment(db, url);

  if (!sentiment || sentiment.url !== url) {
    return <p>No sentiment found for {url}</p>
  }

  return (
    <>
      <div class="pb-4 grid grid-cols-12 gap-y-0.5">
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
            <span class="text-xs opacity-40">{sentiment.createdAt.toLocaleTimeString()}</span>
          </div>
        </div>
        <div class="col-span-2 text-2xl text-bold text-right flex justify-end items-top gap-2">
          <span class="inline-block px-1"><Score score={sentiment.score} /></span>
          <form action="/api/sentiments" method="post" class="grid justify-end m-0">
            <input type="hidden" name="url" value={sentiment.url} />
            <button type="submit" class="p-0.5 text-white hover:bg-slate-600 rounded min-w-6 h-fit mt-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.7656 7.78906H17.5156V4.03906" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.14062 5.14063C5.77843 4.50189 6.53591 3.99516 7.36973 3.64942C8.20355 3.30369 9.09735 3.12573 10 3.12573C10.9027 3.12573 11.7965 3.30369 12.6303 3.64942C13.4641 3.99516 14.2216 4.50189 14.8594 5.14063L17.5156 7.78907" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.23438 12.2109H2.48438V15.9609" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.8594 14.8594C14.2216 15.4981 13.4641 16.0048 12.6303 16.3506C11.7965 16.6963 10.9027 16.8743 10 16.8743C9.09735 16.8743 8.20355 16.6963 7.36973 16.3506C6.53591 16.0048 5.77843 15.4981 5.14063 14.8594L2.48438 12.2109" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <History url={url} active={sentiment.id} />
      <div>Content</div>
      <div class="min-w-0">
        <pre class="text-wrap text-pretty overflow-auto">
          <code>
            {sentiment.content}
          </code>
        </pre>
      </div>
    </>
  );
};
