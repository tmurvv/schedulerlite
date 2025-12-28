import { createContext } from "react";

export const PageContext = createContext({
  page: "login",
  setPage: () => {},
});
