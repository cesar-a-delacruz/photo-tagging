import { useEffect, useState } from "react";

export default function useImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const img = [
      { name: "1", url: "/sample.webp" },
      { name: "2", url: "/sample.webp" },
      { name: "3", url: "/sample.webp" },
    ];

    setImages(img);
  }, []);

  return { images, setImages };
}
