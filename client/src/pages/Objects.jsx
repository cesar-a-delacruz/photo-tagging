import AlertForm from "@/components/AlertForm";
import Dialog from "@/components/Dialog";
import DataForm from "@/components/DataForm";
import Pin from "@/components/Pin";
import useData from "@/hooks/useData";
import requestHandler from "@/utils/js/requestHandler";
import { useRef, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { formDataValues, imageClickedPosition } from "@/utils/js/objectHandler";
import formDataReducer from "@/reducers/formDataReducer";
import "@/utils/css/pages.css";
import styles from "./styles/Objects.module.css";

export default function Objects() {
  document.title = `${import.meta.env.VITE_TITLE}: Objects`;

  const imageId = useParams().id;
  const [image, setImage, setObjects] = useData(`image/${imageId}`);

  const addDialog = useRef(null);
  const editDialog = useRef(null);
  const deleteDialog = useRef(null);

  const [formData, dispatchFormData] = useReducer(formDataReducer, [
    { name: "id", value: "", type: "hidden" },
    { name: "name", label: "Name", value: "", type: "text" },
    {
      name: "position",
      label: "Position",
      value: { x: "", y: "" },
      type: "json",
      buttonInput: {
        text: "Click Position",
        handler: () => {
          setClickPosition((prev) => {
            prev.dialog.close();
            return { ...prev, active: true };
          });
        },
      },
    },
  ]);

  const [pinPosition, setPinPosition] = useState(null);
  const [clickPosition, setClickPosition] = useState({
    active: false,
    dialog: null,
  });

  return (
    <div className="page objects">
      {image && (
        <>
          <div className="top">
            <h2>{image.name} objects</h2>
            <div className="options">
              <h3>Options:</h3>
              <button
                onClick={() => location.assign("/images")}
                aria-label="Return to images"
              >
                <img
                  src="/icons/return.svg"
                  className="icon"
                  aria-hidden="true"
                />
                Return
              </button>
              <button
                onClick={() => {
                  dispatchFormData({ type: "clear" });
                  setClickPosition({
                    ...clickPosition,
                    dialog: addDialog.current,
                  });
                  addDialog.current.showModal();
                }}
                aria-label="Add object"
              >
                <img src="/icons/add.svg" className="icon" aria-hidden="true" />
                Add
              </button>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <img
                src={image.url}
                alt={image.name}
                onClick={(e) => {
                  if (!clickPosition.active) return;

                  const clickedPosition = imageClickedPosition(e);
                  dispatchFormData({
                    type: "change",
                    payload: {
                      id: "position",
                      value: {
                        x: parseInt(clickedPosition.x),
                        y: parseInt(clickedPosition.y),
                      },
                    },
                  });

                  setClickPosition((prev) => {
                    prev.dialog.showModal();
                    return { ...prev, active: false };
                  });
                  setPinPosition({ x: e.pageX, y: e.pageY });
                }}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.objects}>
                {image &&
                  image.objects.map((object, index) => (
                    <div key={object.id} className={styles.object}>
                      <h3 aria-label={`${object.name} object`}>
                        {index + 1}. {object.name}
                      </h3>
                      <div className={styles.options}>
                        <button
                          onClick={() => {
                            dispatchFormData({
                              type: "load",
                              payload: object,
                            });
                            setClickPosition({
                              ...clickPosition,
                              dialog: editDialog.current,
                            });
                            editDialog.current.showModal();
                          }}
                          aria-label={`Edit ${object.name} object`}
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
                              type: "load",
                              payload: object,
                            });
                            deleteDialog.current.showModal();
                          }}
                          aria-label={`Delete ${object.name} object`}
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
                  ))}
              </div>
            </div>
          </div>
          {pinPosition && (
            <Pin position={pinPosition} setPosition={setPinPosition} />
          )}
        </>
      )}
      <div className="dialogs">
        <Dialog title={"Add Object"} ref={addDialog}>
          <DataForm
            data={formData.filter((field) => field.name !== "id")}
            dispatchFormData={dispatchFormData}
            action={{
              name: "Add",
              handler: async (data) => {
                data = formDataValues(data);
                data.imageId = image.id;
                data.position = JSON.stringify(data.position);

                const result = await requestHandler.post(data, "object");
                if (!result) return;
                data.id = result.data.id;

                setObjects("objects", [...image.objects, data]);
                addDialog.current.close();
                dispatchFormData({ type: "clear" });
                alert(result.message);
              },
            }}
          />
        </Dialog>
        <Dialog title={"Edit Object"} ref={editDialog}>
          <DataForm
            data={formData}
            dispatchFormData={dispatchFormData}
            action={{
              name: "Edit",
              handler: async (data) => {
                data = formDataValues(data);
                data.imageId = image.id;
                data.position = JSON.stringify(data.position);
                setObjects(
                  "objects",
                  image.objects.map((object) =>
                    object.id === data.id ? data : object,
                  ),
                );
                await requestHandler.put(data, "object");
                editDialog.current.close();
                dispatchFormData({ type: "clear" });
              },
            }}
          />
        </Dialog>
        <Dialog title={"Delete Object"} ref={deleteDialog}>
          <AlertForm
            data={formData.find((field) => field.name === "id")}
            action={{
              name: "Delete",
              handler: async (data) => {
                await requestHandler.delete(data.value, "object");
                setObjects(
                  "objects",
                  image.objects.filter((object) => object.id !== data.value),
                );
                deleteDialog.current.close();
                dispatchFormData({ type: "clear" });
              },
            }}
          >
            Are you sure you want to delete this object?
          </AlertForm>
        </Dialog>
      </div>
    </div>
  );
}
