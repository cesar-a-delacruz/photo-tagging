import AlertForm from "@/components/AlertForm";
import Dialog from "@/components/Dialog";
import DataForm from "@/components/DataForm";
import Box from "@/components/Box";
import useGetData from "@/hooks/useGetData";
import requestHandler from "@/utils/requestHandler";
import { useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { formDataReducer, formDataReseter } from "@/utils/objectHandler";

export default function Objects() {
  const setTitle = useOutletContext();
  setTitle("Objects");
  const imageId = useParams().id;
  const [image, setImage, setObjects] = useGetData(`image/${imageId}`);

  const addDialog = useRef(null);
  const updateDialog = useRef(null);
  const deleteDialog = useRef(null);

  const [formData, setFormData] = useState([
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
            setData={setFormData}
            action={{
              name: "Add",
              handler: async (data) => {
                data = formDataReducer(data);
                data.imageId = image.id;
                setObjects("objects", [...image.objects, data]);
                data.position = JSON.stringify(data.position);
                await requestHandler.post(data, "object");
                addDialog.current.close();
                setFormData((prev) => formDataReseter(prev));
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
            setData={setFormData}
            action={{
              name: "Update",
              handler: async (data) => {
                data = formDataReducer(data);
                data.imageId = image.id;
                setObjects(
                  "objects",
                  image.objects.map((object) =>
                    object.id === data.id ? data : object,
                  ),
                );
                await requestHandler.put(data, "object");
                updateDialog.current.close();
                setFormData((prev) => formDataReseter(prev));
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
                  image.objects.filter((object) => object.id !== data.id),
                );
                deleteDialog.current.close();
                setFormData((prev) => formDataReseter(prev));
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
            <img
              className={"image"}
              src={image.url}
              alt={image.name}
              onClick={(e) => {
                if (!clickPosition.active) return;

                const imgBoundingSides = {
                  left: e.currentTarget.getBoundingClientRect().left,
                  bottom: e.currentTarget.getBoundingClientRect().top,
                };
                const imgSizeRatio = {
                  width:
                    e.currentTarget.naturalWidth / e.currentTarget.clientWidth,
                  height:
                    e.currentTarget.naturalHeight /
                    e.currentTarget.clientHeight,
                };
                const clickedPosition = {
                  x: (e.pageX - imgBoundingSides.left) * imgSizeRatio.width,
                  y: (e.pageY - imgBoundingSides.bottom) * imgSizeRatio.height,
                };
                setFormData((prev) => {
                  for (let i = 0; i < prev.length; i++) {
                    if (prev[i].name === "position")
                      prev[i].value = {
                        x: parseInt(clickedPosition.x),
                        y: parseInt(clickedPosition.y),
                      };
                  }
                  return [...prev];
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
              addDialog.current.show();
            }}
          >
            Add
          </button>
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
                      setFormData((prev) => {
                        for (let i = 0; i < prev.length; i++) {
                          prev[i].value = object[prev[i].name];
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
                          prev[i].value = object[prev[i].name];
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
            ))}
        </div>
      </div>
    </>
  );
}
