import { createContext } from "react";

export default createContext({
  start: false,
  stop: false,
  objects: {
    current: null,
    found: [],
  },
});
