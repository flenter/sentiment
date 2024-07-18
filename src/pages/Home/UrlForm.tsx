import { html } from "hono/html";
import { type FC, useRef } from "hono/jsx";

export const UrlForm: FC = () => {
  return (
    <>
      <form action="/api/sentiments" method="post" class="grid gap-2 grid-cols-12 border-b border-slate-600 pt-2 pb-4">
        <label for="url" class="col-span-12">Add url</label>
        <input id="url" type="url" name="url" placeholder="URL" class="w-full p-2 bg-gray-700 text-gray-200 placeholder:text-slate-400 px-1 py-0 col-span-8" required />
        <button type="submit" class="w-full px-1 py-0 bg-blue-500 text-white col-span-4">Submit</button>
      </form>
    </>
  )
}
