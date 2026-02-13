import AlertForm from "@/components/AlertForm";
import Dialog from "@/components/Dialog";
import DataForm from "@/components/DataForm";
import useGetData from "@/hooks/useGetData";
import requestHandler from "@/utils/requestHandler";
import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Images() {
  const setTitle = useOutletContext();
  setTitle("Images");

  const [images, setImages] = useGetData("image");
  const [selectedImage, setSelectedImage] = useState({});
  const addDialog = useRef(null);
  const updateDialog = useRef(null);
  const deleteDialog = useRef(null);

  const dataFields = [
    { name: "id", value: selectedImage.id, type: "hidden" },
    { name: "name", label: "Name", value: selectedImage.name, type: "text" },
    { name: "url", label: "URL", value: selectedImage.url, type: "text" },
  ];

  return (
    <>
      <div className="dialogs">
        <Dialog title={"Add Image"} ref={addDialog}>
          <DataForm
            fields={dataFields.filter((field) => field.name !== "id")}
            empty={true}
            action={{
              name: "Add",
              handler: async (data) => {
                await requestHandler.post(data, "image");
                setImages([...images, data]);
                addDialog.current.close();
              },
            }}
          />
        </Dialog>
        <Dialog title={"Update Image"} ref={updateDialog}>
          <DataForm
            fields={dataFields}
            action={{
              name: "Update",
              handler: async (data) => {
                await requestHandler.put(data, "image");
                setImages(
                  images.map((image) => (image.id === data.id ? data : image)),
                );
                updateDialog.current.close();
              },
            }}
          />
        </Dialog>
        <Dialog title={"Delete Image"} ref={deleteDialog}>
          <AlertForm
            field={dataFields.find((field) => field.name === "id")}
            action={{
              name: "Delete",
              handler: async (data) => {
                await requestHandler.delete(data.id, "image");
                setImages(images.filter((image) => image.id !== data.id));
                deleteDialog.current.close();
              },
            }}
          >
            Are you sure you want to delete this image?
          </AlertForm>
        </Dialog>
      </div>

      <button onClick={() => (addDialog.current.open = true)}>Add</button>
      <div className="images">
        {images &&
          images.map((image) => (
            <div key={image.id} className="image">
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
                  <button
                    onClick={() => {
                      setSelectedImage(image);
                      deleteDialog.current.open = true;
                    }}
                  >
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
