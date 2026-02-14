import AlertForm from "@/components/AlertForm";
import Dialog from "@/components/Dialog";
import DataForm from "@/components/DataForm";
import useGetData from "@/hooks/useGetData";
import requestHandler from "@/utils/requestHandler";
import { useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function Objects() {
  const setTitle = useOutletContext();
  setTitle("Objects");
  const imageId = useParams().id;
  const [image, setImage] = useGetData(`image/${imageId}`);
  const [selectedObject, setSelectedObject] = useState({});
  const addDialog = useRef(null);
  const updateDialog = useRef(null);
  const deleteDialog = useRef(null);

  const dataFields = [
    { name: "id", value: selectedObject.id, type: "hidden" },
    { name: "name", label: "Name", value: selectedObject.name, type: "text" },
    {
      name: "position",
      label: "Position",
      value: selectedObject.position
        ? { x: selectedObject.position.x, y: selectedObject.position.y }
        : { x: "", y: "" },
      type: "json",
    },
  ];

  return (
    <>
      <div className="dialogs">
        <Dialog title={"Add Object"} ref={addDialog}>
          <DataForm
            fields={dataFields.filter((field) => field.name !== "id")}
            empty={true}
            action={{
              name: "Add",
              handler: async (data) => {
                data.position = JSON.stringify(data.position);
                data.imageId = image.id;
                await requestHandler.post(data, "object");
                setImage({ ...image, objects: [...image.objects, data] });
                addDialog.current.close();
              },
            }}
          />
        </Dialog>
        <Dialog title={"Update Object"} ref={updateDialog}>
          <DataForm
            fields={dataFields}
            action={{
              name: "Update",
              handler: async (data) => {
                data.position = JSON.stringify(data.position);
                data.imageId = image.id;
                await requestHandler.put(data, "object");
                setImage({
                  ...image,
                  objects: image.objects.map((object) =>
                    object.id === data.id ? data : object,
                  ),
                });
                updateDialog.current.close();
              },
            }}
          />
        </Dialog>
        <Dialog title={"Delete Object"} ref={deleteDialog}>
          <AlertForm
            field={dataFields.find((field) => field.name === "id")}
            action={{
              name: "Delete",
              handler: async (data) => {
                await requestHandler.delete(data.id, "object");
                setImage({
                  ...image,
                  objects: image.objects.filter(
                    (object) => object.id !== data.id,
                  ),
                });
                deleteDialog.current.close();
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
            <h2>{image.name}</h2>
            <img className={"image"} src={image.url} alt={image.name} />
          </>
        )}
      </div>
      <div className="right">
        <div className="options">
          <button onClick={() => (addDialog.current.open = true)}>Add</button>
          <a href={"/images"}>Go Back</a>
        </div>
        <div className="objects">
          {image &&
            image.objects.map((object) => (
              <div key={object.id} className="object">
                <h3>{object.name}</h3>
                <div className="options">
                  <button
                    onClick={() => {
                      setSelectedObject(object);
                      updateDialog.current.open = true;
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setSelectedObject(object);
                      deleteDialog.current.open = true;
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
