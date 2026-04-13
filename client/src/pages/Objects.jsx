import AlertForm from "@/components/AlertForm";
import Dialog from "@/components/Dialog";
import DataForm from "@/components/DataForm";
import Box from "@/components/Box";
import useData from "@/hooks/useData";
import requestHandler from "@/utils/requestHandler";
import { useRef, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { formDataReducer } from "@/utils/objectHandler";
import DataFormReducer from "@/reducers/DataFormReducer";

export default function Objects() {
  document.title = `${import.meta.env.VITE_TITLE}: Objects`;

  const imageId = useParams().id;
  const [image, setImage, setObjects] = useData(`image/${imageId}`);

  const addDialog = useRef(null);
  const updateDialog = useRef(null);
  const deleteDialog = useRef(null);

  const [formData, dispatchFormData] = useReducer(DataFormReducer, [
    { name: "id", value: "", type: "hidden" },
    { name: "name", label: "Name", value: "", type: "text" },
    {
      name: "position",
      label: "Position",
      value: { x: "", y: "" },
      type: "json",
    },
  ]);

  const [boxPosition, setBoxPosition] = useState(null);
  const [clickPosition, setClickPosition] = useState({
    active: false,
    dialog: null,
  });

  return (
    <>
      <div className="dialogs">
        <Dialog title={"Add Object"} ref={addDialog}>
          <button
            onClick={() => {
              setClickPosition({ active: true, dialog: addDialog });
              addDialog.current.close();
            }}
          >
            Click Position
          </button>
          <DataForm
            data={formData.filter((field) => field.name !== "id")}
            dispatchFormData={dispatchFormData}
            action={{
              name: "Add",
              handler: async (data) => {
                data = formDataReducer(data);
                data.imageId = image.id;
                data.id = undefined;
                data.position = JSON.stringify(data.position);

                const result = await requestHandler.post(data, "object");
                if (!result) return;
                data.id = result.data.id;

                setObjects("objects", [...image.objects, data]);
                addDialog.current.close();
                dispatchFormData({ type: "clear" });
              },
            }}
          />
        </Dialog>
        <Dialog title={"Update Object"} ref={updateDialog}>
          <button
            onClick={() => {
              setClickPosition({ active: true, dialog: updateDialog });
              updateDialog.current.close();
            }}
          >
            Click Position
          </button>
          <DataForm
            data={formData}
            dispatchFormData={dispatchFormData}
            action={{
              name: "Update",
              handler: async (data) => {
                data = formDataReducer(data);
                data.imageId = image.id;
                data.position = JSON.stringify(data.position);
                setObjects(
                  "objects",
                  image.objects.map((object) =>
                    object.id === data.id ? data : object,
                  ),
                );
                await requestHandler.put(data, "object");
                updateDialog.current.close();
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
      <div className="left">
        {image && (
          <>
            <h2>{image.name} objects</h2>
            <div className="options">
              <h3>Options:</h3>
              <button onClick={() => location.assign("/images")}>
                Go back
              </button>
            </div>
            <img
              className={"image"}
              src={image.url}
              alt={image.name}
              onClick={(e) => {
                if (!clickPosition.active) return;

                const imgBoundingSides = {
                  left: e.currentTarget.getBoundingClientRect().left,
                  top: e.currentTarget.getBoundingClientRect().top,
                };
                const imgSizeRatio = {
                  width:
                    e.currentTarget.naturalWidth / e.currentTarget.clientWidth,
                  height:
                    e.currentTarget.naturalHeight /
                    e.currentTarget.clientHeight,
                };
                const clickedPosition = {
                  x: (e.clientX - imgBoundingSides.left) * imgSizeRatio.width,
                  y: (e.clientY - imgBoundingSides.top) * imgSizeRatio.height,
                };

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

                setBoxPosition({ x: e.pageX, y: e.pageY });
                clickPosition.dialog.current.show();
                setClickPosition({ active: false, dialog: null });
              }}
            />
          </>
        )}
      </div>
      {image && boxPosition && (
        <Box position={boxPosition} setPosition={setBoxPosition} />
      )}
      <div className="right">
        <div className="options">
          <button
            onClick={() => {
              dispatchFormData({ type: "clear" });
              addDialog.current.show();
            }}
          >
            Add
          </button>
        </div>
        <div className="objects">
          {image &&
            image.objects.map((object) => (
              <div key={object.id} className="object">
                <h3>{object.name}</h3>
                <div className="options">
                  <button
                    onClick={() => {
                      dispatchFormData({ type: "load", payload: object });
                      updateDialog.current.show();
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      dispatchFormData({ type: "load", payload: object });
                      deleteDialog.current.show();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
