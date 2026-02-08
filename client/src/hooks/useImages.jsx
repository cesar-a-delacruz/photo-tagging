import { useEffect, useState } from "react";

export default function useImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const img = [
      { id: 1, name: "1", url: "/sample.webp" },
      { id: 2, name: "2", url: "/sample.webp" },
      { id: 3, name: "3", url: "/sample.webp" },
    ];

    setImages(img);
  }, []);

  return { images, setImages };
}
