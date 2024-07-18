import { type FC, useRef } from "hono/jsx";

export const UrlForm: FC = () => {
  const ref = useRef(null);
  const submitForm = (e: Event) => {
    e.preventDefault();
  };
  return (
    <>
      <form action="/api/sentiment" ref={ref} method="get" class="grid gap-2" onSubmit={submitForm}>
        <input type="url" name="url" placeholder="URL" class="w-full p-2 bg-gray-700 text-gray-200 placeholder:text-slate-400" required />
        <button type="submit" class="w-full p-2 bg-blue-500 text-white" onClick={(event) => {
          event.preventDefault();
          console.log('ref', ref);
        }}>Submit</button>
      </form>
    </>
  )
}
