import { createContext } from "react";

export default createContext({
  start: true,
  objects: {
    current: null,
    found: [],
  },
});
