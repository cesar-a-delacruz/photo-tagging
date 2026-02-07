import useImages from "@/hooks/useImages";
import { useOutletContext } from "react-router-dom";

export default function Images() {
  const setTitle = useOutletContext();
  setTitle("Images");

  const { images, setImages } = useImages();

  return (
    <>
      <button>Add</button>
      <div className="images">
        {images.map((image) => (
          <div key={image.name} className="image">
            <div className="top">
              <h2>{image.name}</h2>
              <div className="options">
                <a href="">View Objects</a>
                <button>Update</button>
                <button>Delete</button>
              </div>
            </div>
            <img src={image.url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}
