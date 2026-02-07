import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import useImages from "@/hooks/useImages";
import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Images() {
  const setTitle = useOutletContext();
  setTitle("Images");

  const { images } = useImages();
  const [selectedImage, setSelectedImage] = useState({});
  const addDialog = useRef(null);
  const updateDialog = useRef(null);
  const deleteDialog = useRef(null);

  const dataFields = [
    { name: "Name", value: selectedImage.name },
    { name: "URL", value: selectedImage.url },
  ];

  return (
    <>
      <div className="dialogs">
        <Dialog title={"Add Image"} ref={addDialog}>
          <Form
            fields={dataFields}
            empty={true}
            action={{ name: "Add", handler: () => {} }}
          />
        </Dialog>
        <Dialog title={"Update Image"} ref={updateDialog}>
          <Form
            fields={dataFields}
            action={{ name: "Update", handler: () => {} }}
          />
        </Dialog>
        <Dialog title={"Delete Image"} ref={deleteDialog}>
          <p>Are you sure you want to delete this image?</p>
        </Dialog>
      </div>

      <button onClick={() => (addDialog.current.open = true)}>Add</button>
      <div className="images">
        {images.map((image) => (
          <div key={image.name} className="image">
            <div className="top">
              <h2>{image.name}</h2>
              <div className="options">
                <a href="">View Objects</a>
                <button
                  onClick={() => {
                    setSelectedImage(image);
                    updateDialog.current.open = true;
                  }}
                >
                  Update
                </button>
                <button onClick={() => (deleteDialog.current.open = true)}>
                  Delete
                </button>
              </div>
            </div>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>
    </>
  );
}
