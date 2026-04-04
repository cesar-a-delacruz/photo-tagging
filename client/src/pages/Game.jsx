import Dialog from "@/components/Dialog";
import Timer from "@/components/Timer";
import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import useGetData from "@/hooks/useGetData";
import Menu from "@/components/Menu";
import Box from "@/components/Box";
import GameContext from "@/contexts/GameContext";
import DataForm from "@/components/DataForm";
import AlertForm from "@/components/AlertForm";
import { formDataReducer } from "@/utils/objectHandler";
import requestHandler from "@/utils/requestHandler";

export default function Game() {
  const setTitle = useOutletContext();
  setTitle("Game");
  const [images, setImages] = useGetData("image");
  const [image, setImage] = useState(null);
  const [boxPosition, setBoxPosition] = useState(null);
  const [game, setGame] = useState({
    start: false,
    stop: false,
    objects: {
      current: null,
      found: 0,
    },
  });
  const [formData, setFormData] = useState([
    { name: "id", value: "", type: "hidden" },
    { name: "name", label: "Name", value: "", type: "text" },
    { name: "record", label: "Record", value: "00:00", type: "text" },
  ]);

  const imageDialog = useRef(null);
  const recordDialog = useRef(null);
  const winDialog = useRef(null);

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const user = await requestHandler.get(`user/${parseInt(userId)}`);
      setFormData((prev) => {
        return prev.map((field) => {
          field.value = user[field.name];
          return field;
        });
      });
    })();
  }, []);

  return (
    <GameContext value={game}>
      <div className="top">
        <div className="data">
          <div className="user">
            <p>
              Name: <span>{formData[1].value}</span>
            </p>
            <p>
              Record: <span>{formData[2].value}</span>
            </p>
          </div>
          <Timer
            setRecord={(timeString) => {
              setFormData((prev) =>
                prev.map((field) => {
                  if (field.name === "record") field.value = timeString;
                  return field;
                }),
              );
              winDialog.current.show();
            }}
            stop={game.stop}
            start={game.start}
            record={formData[2].value}
          />
        </div>
        <div className="options">
          <button
            onClick={() => {
              setGame((prev) => ({ ...prev, stop: true, start: false }));
              imageDialog.current.show();
            }}
          >
            Change Image
          </button>
          <button onClick={() => recordDialog.current.show()}>
            Reset Record
          </button>
        </div>
        <div className="dialogs">
          <Dialog title={"Change Image"} ref={imageDialog}>
            <div className="images">
              {images &&
                images.map((image) => (
                  <div className="image">
                    <img src={image.url} alt="" />
                    <h4>{image.name}</h4>
                    <button
                      onClick={async () => {
                        const result = await requestHandler.get(
                          `image/${image.id}`,
                        );
                        setImage(result);
                        setGame((prev) => ({
                          ...prev,
                          start: true,
                          stop: false,
                        }));
                        imageDialog.current.close();
                      }}
                    >
                      Select
                    </button>
                  </div>
                ))}
            </div>
          </Dialog>
          <Dialog title={"Reset Record"} ref={recordDialog}>
            <AlertForm
              data={formData.find((field) => field.name === "id")}
              action={{
                name: "Reset",
                handler: async (data) => {
                  const result = await requestHandler.delete(
                    data.value,
                    "user",
                  );
                  if (!result) return;
                  localStorage.removeItem("userId");

                  setFormData((prev) =>
                    prev.map((field) => {
                      if (field.name === "record") field.value = "00:00";
                      return field;
                    }),
                  );
                  setGame((prev) => {
                    prev.stop = false;
                    prev.start = true;
                    prev.objects.found = 0;
                    return prev;
                  });
                  recordDialog.current.close();
                },
              }}
            >
              Are you sure you want to reset your record?
            </AlertForm>
          </Dialog>
          <Dialog title={"Congratulations!!"} ref={winDialog}>
            <p>Input your name to save your record</p>
            <DataForm
              data={formData.filter((field) => field.name !== "id")}
              setData={setFormData}
              action={{
                name: "Save",
                handler: async (data) => {
                  data = formDataReducer(data);
                  const result = await requestHandler.post(data, "user");
                  if (!result) return;
                  const id = result.data.id;
                  data.id = id;
                  localStorage.setItem("userId", id);

                  setFormData((prev) =>
                    prev.map((field) => {
                      field.value = data[field.name];
                      return field;
                    }),
                  );
                  winDialog.current.close();
                },
              }}
            />
          </Dialog>
        </div>
      </div>
      <div className="bottom">
        {image && (
          <>
            <h3>{image.name}</h3>
            <img
              src={image.url}
              alt={image.name}
              onClick={(e) => {
                if (game.stop || !game.start) return;

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
                const targetBoxCenter = 50;
                image.objects.forEach((object) => {
                  if (
                    clickedPosition.x < object.position.x + targetBoxCenter &&
                    clickedPosition.x > object.position.x - targetBoxCenter &&
                    clickedPosition.y < object.position.y + targetBoxCenter &&
                    clickedPosition.y > object.position.y - targetBoxCenter
                  ) {
                    setGame((prev) => ({
                      ...prev,
                      objects: { current: object, found: prev.objects.found },
                    }));
                  }
                });
                setBoxPosition({ x: e.pageX, y: e.pageY });
              }}
            />
          </>
        )}
        <div className="objects">
          <h3>Objects to find</h3>
          <ol>
            {image &&
              image.objects.map((object) => (
                <li key={object.id}>{object.name}</li>
              ))}
          </ol>
        </div>
        {boxPosition && image && (
          <div className="target">
            <Box position={boxPosition} setPosition={setBoxPosition} />
            <Menu
              position={{ x: boxPosition.x + 50, y: boxPosition.y - 37 }}
              items={image.objects}
              currentItem={game.objects.current}
              setFoundObjects={(amount) => {
                const gameEnd = amount === image.objects.length;
                setGame((prev) => ({
                  ...prev,
                  stop: gameEnd,
                  start: !gameEnd,
                  objects: { current: null, found: amount },
                }));
              }}
            />
          </div>
        )}
      </div>
    </GameContext>
  );
}
