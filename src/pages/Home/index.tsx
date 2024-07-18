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
  return (
    <ListSentiments />
  )
}
