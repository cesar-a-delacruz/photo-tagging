import { createContext } from "react";

export default createContext({
  time: "",
  end: false,
  objects: {
    current: null,
    found: 0,
  },
});
