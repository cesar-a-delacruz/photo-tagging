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
  const [score, setScore] = useState({ record: "" });
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
  ]);

  const imageDialog = useRef(null);
  const recordDialog = useRef(null);
  const winDialog = useRef(null);
  const deleteDialog = useRef(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    (async () => {
      if (!userId) return;

      const user = await requestHandler.get(`user/${userId}`);
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
          {userId && (
            <div className="user">
              <p>
                Name: <span>{formData[1].value}</span>
              </p>
              <p>
                Record: <span>{score.record}</span>
              </p>
            </div>
          )}
          {(score.record === "00:00" || game.start) && (
            <Timer
              setRecord={async (timeString) => {
                setScore((prev) => ({ ...prev, record: timeString }));

                if (!userId) {
                  winDialog.current.show();
                  return;
                }

                const scoreData = {
                  record: timeString,
                  userId: parseInt(userId),
                  imageId: image.id,
                };
                await requestHandler.post(scoreData, "score");
              }}
              stop={game.stop}
              start={game.start}
              record={score.record}
            />
          )}
        </div>
        {game.start && (
          <div className="options">
            <h3>Options:</h3>
            {image && (
              <button
                onClick={() => {
                  setGame((prev) => ({ ...prev, stop: true, start: false }));
                  imageDialog.current.show();
                }}
              >
                Select Image
              </button>
            )}
            {score.record !== "" && score.record !== "00:00" && (
              <button
                onClick={() => {
                  if (!score || !score.id) return;
                  recordDialog.current.show();
                }}
              >
                Reset Record
              </button>
            )}
            {userId && (
              <button
                onClick={() => {
                  if (!userId) return;
                  deleteDialog.current.show();
                }}
              >
                Delete Data
              </button>
            )}
          </div>
        )}
        <div className="dialogs">
          <Dialog title={"Select Image"} ref={imageDialog}>
            <a href="/images">All Images</a>
            <div className="images">
              {images &&
                images.map((image) => (
                  <div className="image" key={image.id}>
                    <img src={image.url} alt="" />
                    <h4>{image.name}</h4>
                    <button
                      onClick={async () => {
                        const imageResult = await requestHandler.get(
                          `image/${image.id}`,
                        );
                        if (!imageResult.objects.length) {
                          alert("The image doesn't have objects");
                          return;
                        }
                        let scoreVal = { record: "00:00" };

                        if (userId) {
                          const scoreResult = await requestHandler.get(
                            `score/user/${userId}/image/${image.id}`,
                          );
                          if (scoreResult.data) scoreVal = scoreResult.data;
                          console.log(scoreResult.data);
                        }
                        setScore(scoreVal);
                        setImage(imageResult);
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
              data={{ name: "id", value: score.id, type: "hidden" }}
              action={{
                name: "Reset",
                handler: async (data) => {
                  const result = await requestHandler.delete(
                    data.value,
                    "score",
                  );
                  if (!result) return;

                  setScore({ record: "00:00" });
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
          <Dialog title={"Delete Data"} ref={deleteDialog}>
            <AlertForm
              data={formData.find((field) => field.name === "id")}
              action={{
                name: "Delete",
                handler: async (data) => {
                  const result = await requestHandler.delete(
                    data.value,
                    "user",
                  );
                  if (!result) return;

                  localStorage.removeItem("userId");
                  setFormData((prev) =>
                    prev.map((field) => {
                      field.value = "";
                      return field;
                    }),
                  );

                  setScore({ record: "" });
                  setImage(null);
                  setGame((prev) => {
                    prev.stop = false;
                    prev.start = false;
                    prev.objects.current = null;
                    prev.objects.found = 0;
                    return prev;
                  });
                  deleteDialog.current.close();
                },
              }}
            >
              Are you sure you want to delete your data?
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
                  const scoreData = {
                    record: score.record,
                    userId: id,
                    imageId: image.id,
                  };
                  const scoreResult = await requestHandler.post(
                    scoreData,
                    "score",
                  );
                  setScore(scoreResult.data);
                  winDialog.current.close();
                },
              }}
            />
          </Dialog>
        </div>
      </div>
      <div className="bottom">
        {images && !image && (
          <>
            <h2>Select an Image</h2>
            <div className="images">
              {images.map((image) => (
                <div className="image" key={image.id}>
                  <img src={image.url} alt="" />
                  <h4>{image.name}</h4>
                  <button
                    onClick={async () => {
                      const imageResult = await requestHandler.get(
                        `image/${image.id}`,
                      );
                      if (!imageResult.objects.length) {
                        alert("The image doesn't have objects");
                        return;
                      }
                      let scoreVal = { record: "00:00" };

                      if (userId) {
                        const scoreResult = await requestHandler.get(
                          `score/user/${userId}/image/${image.id}`,
                        );
                        if (scoreResult.data) scoreVal = scoreResult.data;
                        console.log(scoreResult.data);
                      }
                      setScore(scoreVal);
                      setImage(imageResult);
                      setGame((prev) => ({
                        ...prev,
                        start: true,
                        stop: false,
                      }));
                    }}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
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
        {image && (
          <div className="objects">
            <h3>Objects to find</h3>
            <ol>
              {image.objects.map((object) => (
                <li key={object.id}>{object.name}</li>
              ))}
            </ol>
          </div>
        )}
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
