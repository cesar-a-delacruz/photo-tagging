import requestHandler from "@/utils/requestHandler";
import { useEffect, useState } from "react";

export default function useImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const images = await requestHandler.get("image");
      setImages(images);
    })();
  }, []);

  return { images, setImages };
}
