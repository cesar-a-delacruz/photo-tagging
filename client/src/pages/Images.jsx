import AlertForm from "@/components/AlertForm";
import Dialog from "@/components/Dialog";
import DataForm from "@/components/DataForm";
import useData from "@/hooks/useData";
import requestHandler from "@/utils/requestHandler";
import { useReducer, useRef } from "react";
import { formDataReducer } from "@/utils/objectHandler";
import DataFormReducer from "@/reducers/DataFormReducer";

export default function Images() {
  document.title = `${import.meta.env.VITE_TITLE}: Images`;

  const [images, setImages] = useData("image");

  const addDialog = useRef(null);
  const updateDialog = useRef(null);
  const deleteDialog = useRef(null);

  const [formData, dispatchFormData] = useReducer(DataFormReducer, [
    { name: "id", value: "", type: "hidden" },
    { name: "name", label: "Name", value: "", type: "text" },
    { name: "url", label: "URL", value: "", type: "text" },
  ]);

  return (
    <>
      <h2>Images</h2>
      <div className="options">
        <h3>Options:</h3>
        <button onClick={() => addDialog.current.show()}>Add</button>
      </div>
      <div className="dialogs">
        <Dialog title={"Add Image"} ref={addDialog}>
          <DataForm
            data={formData.filter((field) => field.name !== "id")}
            dispatchFormData={dispatchFormData}
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
                dispatchFormData({ type: "clear" });
              },
            }}
          />
        </Dialog>
        <Dialog title={"Update Image"} ref={updateDialog}>
          <DataForm
            data={formData}
            dispatchFormData={dispatchFormData}
            action={{
              name: "Update",
              handler: async (data) => {
                data = formDataReducer(data);
                await requestHandler.put(data, "image");
                setImages(
                  images.map((image) => (image.id === data.id ? data : image)),
                );
                updateDialog.current.close();
                dispatchFormData({ type: "clear" });
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
                dispatchFormData({ type: "clear" });
              },
            }}
          >
            Are you sure you want to delete this image?
          </AlertForm>
        </Dialog>
      </div>
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
                      dispatchFormData({ type: "load", payload: image });
                      updateDialog.current.show();
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      dispatchFormData({ type: "load", payload: image });
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
