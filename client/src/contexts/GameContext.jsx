import { createContext } from "react";

export default createContext({
  end: false,
  objects: {
    current: null,
    found: 0,
  },
});
