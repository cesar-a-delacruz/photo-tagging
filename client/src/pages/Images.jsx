import { useReducer, useRef } from "react";
import AlertForm from "@/components/AlertForm";
import Dialog from "@/components/Dialog";
import DataForm from "@/components/DataForm";
import useData from "@/hooks/useData";
import requestHandler from "@/utils/js/requestHandler";
import { formDataValues } from "@/utils/js/objectHandler";
import actions from "@/reducers/actions";
import formDataReducer from "@/reducers/formDataReducer";
import "@/utils/css/pages.css";
import styles from "./styles/Images.module.css";

export default function Images() {
  document.title = `${import.meta.env.VITE_TITLE}: Images`;

  const [images, setImages] = useData("image");

  const addDialog = useRef(null);
  const editDialog = useRef(null);
  const deleteDialog = useRef(null);

  const [formData, dispatchFormData] = useReducer(formDataReducer, [
    { name: "id", value: "", type: "hidden" },
    { name: "name", label: "Name", value: "", type: "text" },
    { name: "file", label: "File", type: "file", url: "" },
  ]);

  return (
    <div className="page images">
      <h2>Images</h2>
      <div className="options">
        <h3>Options:</h3>
        <button
          className="option"
          onClick={() => {
            dispatchFormData({ type: actions.formData.CLEAR });
            addDialog.current.showModal();
          }}
          aria-label="Add image"
        >
          <img src="/icons/add.svg" className="icon" aria-hidden="true" />
          Add
        </button>
      </div>
      <div className={styles.images}>
        {images &&
          images.map((image) => (
            <div key={image.id} className={styles.image}>
              <div className="top">
                <h3>{image.name}</h3>
                <div className="options">
                  <button
                    onClick={() =>
                      location.assign(`images/${image.id}/objects`)
                    }
                    aria-label="View objects"
                  >
                    <img
                      src="/icons/view.svg"
                      className="icon"
                      aria-hidden="true"
                    />
                    View objects
                  </button>
                  <button
                    onClick={() => {
                      dispatchFormData({
                        type: actions.formData.LOAD,
                        payload: image,
                      });
                      editDialog.current.showModal();
                    }}
                    aria-label="Edit image"
                  >
                    <img
                      src="/icons/edit.svg"
                      className="icon"
                      aria-hidden="true"
                    />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      dispatchFormData({
                        type: actions.formData.LOAD,
                        payload: image,
                      });
                      deleteDialog.current.showModal();
                    }}
                    aria-label="Delete image"
                  >
                    <img
                      src="/icons/delete.svg"
                      className="icon"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                </div>
              </div>
              <img src={image.url} alt={image.name} />
            </div>
          ))}
      </div>
      <div className="dialogs">
        <Dialog title={"Add Image"} ref={addDialog}>
          <DataForm
            data={formData.filter((field) => field.name !== "id")}
            dispatchFormData={dispatchFormData}
            action={{
              name: "Add",
              handler: async (data) => {
                data = formDataValues(data);

                const result = await requestHandler.postFile(data, "image");
                if (!result) return;
                data.id = result.data.id;
                data.url = result.data.url;

                setImages([...images, data]);
                addDialog.current.close();
                dispatchFormData({ type: actions.formData.CLEAR });
                alert(result.message);
              },
            }}
          />
        </Dialog>
        <Dialog title={"Edit Image"} ref={editDialog}>
          <DataForm
            data={formData}
            dispatchFormData={dispatchFormData}
            action={{
              name: "Edit",
              handler: async (data) => {
                data = formDataValues(data);
                await requestHandler.put(data, "image");
                setImages(
                  images.map((image) => {
                    if (image.id !== data.id) return image;
                    data.url = image.url;
                    return data;
                  }),
                );
                editDialog.current.close();
                dispatchFormData({ type: actions.formData.CLEAR });
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
                dispatchFormData({ type: actions.formData.CLEAR });
              },
            }}
          >
            Are you sure you want to delete this image?
          </AlertForm>
        </Dialog>
      </div>
    </div>
  );
}
