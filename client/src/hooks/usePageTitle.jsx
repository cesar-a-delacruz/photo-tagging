import { useEffect, useState } from "react";
export default function usePageTitle() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    document.title = "Photo Tagging" + (title ? `: ${title}` : "");
  }, [title]);

  return { title, setTitle };
}
