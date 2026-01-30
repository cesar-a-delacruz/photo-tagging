import { useEffect, useState } from "react";

export default function useGame() {
  const [image, setImage] = useState({ name: "", url: "", size: {} });
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const img = {
      name: "Park",
      url: "/sample.webp",
    };
    const obj = [
      { name: "Man", position: { x: 383, y: 998 } },
      { name: "Woman", position: { x: 799, y: 1110 } },
      { name: "Cat", position: { x: 508, y: 1077 } },
    ];

    setImage(img);
    setObjects(obj);
  }, []);

  return { image, objects, setObjects };
}
