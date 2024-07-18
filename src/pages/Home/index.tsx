import type { FC } from "hono/jsx"
import { ListSentiments } from "./ListSentiments";
import { UrlForm } from "./UrlForm";
import { render, useEffect } from "hono/jsx/dom";

export const Home: FC = () => {
  return (
    <InternalHome />
  )
};

export const InternalHome = () => {
  return (<div class="grid grid-cols-12">
    <div class="col-span-8">
      <ListSentiments />
    </div>
    <div class="col-span-4">
      <UrlForm />
    </div>
  </div>
  )
}
