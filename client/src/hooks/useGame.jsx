import { useEffect, useState } from "react";

export default function useGame() {
  const [image, setImage] = useState({ name: "", url: "" });
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    setImage({ name: "Park", url: "/sample.webp" });
    setObjects([
      { name: "Man", position: { x: 383, y: 898 } },
      { name: "Woman", position: { x: 799, y: 1018 } },
      { name: "Cat", position: { x: 505, y: 972 } },
    ]);
  }, []);

  return { image, objects };
}
