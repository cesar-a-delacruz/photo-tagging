import AlertForm from "@/components/AlertForm";
import Dialog from "@/components/Dialog";
import DataForm from "@/components/DataForm";
import useGetData from "@/hooks/useGetData";
import requestHandler from "@/utils/requestHandler";
import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { formDataReducer, formDataReseter } from "@/utils/objectHandler";

export default function Images() {
  const setTitle = useOutletContext();
  setTitle("Images");
  const [images, setImages] = useGetData("image");

  const addDialog = useRef(null);
  const updateDialog = useRef(null);
  const deleteDialog = useRef(null);

  const [formData, setFormData] = useState([
    { name: "id", value: "", type: "hidden" },
    { name: "name", label: "Name", value: "", type: "text" },
    { name: "url", label: "URL", value: "", type: "text" },
  ]);

  return (
    <>
      <div className="dialogs">
        <Dialog title={"Add Image"} ref={addDialog}>
          <DataForm
            data={formData.filter((field) => field.name !== "id")}
            setData={setFormData}
            action={{
              name: "Add",
              handler: async (data) => {
                data = formDataReducer(data);
                data.id = undefined;

                const result = await requestHandler.post(data, "image");
                if (!result) return;
                data.id = result.data.id;

                setImages([...images, data]);
                addDialog.current.close();
                setFormData((prev) => formDataReseter(prev));
              },
            }}
          />
        </Dialog>
        <Dialog title={"Update Image"} ref={updateDialog}>
          <DataForm
            data={formData}
            setData={setFormData}
            action={{
              name: "Update",
              handler: async (data) => {
                data = formDataReducer(data);
                await requestHandler.put(data, "image");
                setImages(
                  images.map((image) => (image.id === data.id ? data : image)),
                );
                updateDialog.current.close();
                setFormData((prev) => formDataReseter(prev));
              },
            }}
          />
        </Dialog>
        <Dialog title={"Delete Image"} ref={deleteDialog}>
          <AlertForm
            data={formData.find((field) => field.name === "id")}
            action={{
              name: "Delete",
              handler: async (data) => {
                await requestHandler.delete(data.value, "image");
                setImages(images.filter((image) => image.id !== data.value));
                deleteDialog.current.close();
                setFormData((prev) => formDataReseter(prev));
              },
            }}
          >
            Are you sure you want to delete this image?
          </AlertForm>
        </Dialog>
      </div>

      <button onClick={() => addDialog.current.show()}>Add</button>
      <div className="images">
        {images &&
          images.map((image) => (
            <div key={image.id} className="image">
              <div className="top">
                <h2>{image.name}</h2>
                <div className="options">
                  <a href={`images/${image.id}/objects`}>View Objects</a>
                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        for (let i = 0; i < prev.length; i++) {
                          if (
                            prev[i].type === "json" &&
                            typeof prev[i].value === "string"
                          )
                            prev[i].value = JSON.parse(image[prev[i].name]);
                          else prev[i].value = image[prev[i].name];
                        }
                        return [...prev];
                      });
                      updateDialog.current.show();
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        for (let i = 0; i < prev.length; i++) {
                          prev[i].value = image[prev[i].name];
                        }
                        return [...prev];
                      });
                      deleteDialog.current.show();
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
