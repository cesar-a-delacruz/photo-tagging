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
    { name: "Name", initialValue: selectedImage.name },
    { name: "URL", initialValue: selectedImage.url },
  ];

  return (
    <>
      <div className="dialogs">
        <Dialog
          title={"Add Image"}
          action={{ name: "Add", handler: () => {} }}
          ref={addDialog}
        >
          <Form fields={dataFields} empty={true} />
        </Dialog>
        <Dialog
          title={"Update Image"}
          action={{ name: "Update", handler: () => {} }}
          ref={updateDialog}
        >
          <Form fields={dataFields} />
        </Dialog>
        <Dialog
          title={"Delete Image"}
          action={{ name: "Delete", handler: () => {} }}
          ref={deleteDialog}
        >
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
