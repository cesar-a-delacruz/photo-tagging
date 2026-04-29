import Dialog from "@/components/Dialog";
import Timer from "@/components/Timer";
import { useState, useRef, useEffect, useReducer } from "react";
import useData from "@/hooks/useData";
import Menu from "@/components/Menu";
import Pin from "@/components/Pin";
import GameContext from "@/contexts/GameContext";
import DataForm from "@/components/DataForm";
import AlertForm from "@/components/AlertForm";
import { formDataReducer } from "@/utils/js/objectHandler";
import requestHandler from "@/utils/js/requestHandler";
import DataFormReducer from "@/reducers/DataFormReducer";
import "@/utils/css/pages.css";
import styles from "./styles/Game.module.css";

export default function Game() {
  document.title = `${import.meta.env.VITE_TITLE}: Game`;

  const [images] = useData("image");
  const [gameImage, setGameImage] = useState(null);
  const [score, setScore] = useState({ record: "" });
  const [pinPosition, setPinPosition] = useState(null);
  const [game, setGame] = useState({
    start: false,
    stop: false,
    objects: {
      current: null,
      found: [],
    },
  });

  const [formData, dispatchFormData] = useReducer(DataFormReducer, [
    { name: "id", value: "", type: "hidden" },
    { name: "name", label: "Name", value: "", type: "text" },
  ]);

  const recordDialog = useRef(null);
  const winDialog = useRef(null);
  const deleteDialog = useRef(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    (async () => {
      if (!userId) return;

      const user = await requestHandler.get(`user/${userId}`);
      dispatchFormData({ type: "load", payload: user });
    })();
  }, []);

  return (
    <GameContext value={game}>
      <div className="page game">
        <div className={styles.top}>
          <h2>{gameImage ? gameImage.name : ""} Game</h2>
          {userId && (
            <div className={styles.data}>
              <div className={styles.item}>
                <img
                  src="/icons/user.svg"
                  className="icon"
                  aria-hidden="true"
                />
                <span>Name:</span> {formData[1].value}
              </div>
              {score.record !== "" && score.record !== "00:00" && (
                <div className={styles.item}>
                  <img
                    src="/icons/timer.svg"
                    className="icon"
                    aria-hidden="true"
                  />
                  <span>Record:</span> {score.record}
                </div>
              )}
            </div>
          )}
          {gameImage && (
            <div className="options">
              <h3>Options:</h3>
              {gameImage && (
                <button
                  className="option"
                  onClick={() => {
                    setGame((prev) => ({ ...prev, stop: true, start: false }));
                    setGameImage(null);
                    setScore({ record: "" });
                  }}
                  aria-label="Select another image"
                >
                  <img
                    src="/icons/images.svg"
                    className="icon"
                    aria-hidden="true"
                  />
                  Select another image
                </button>
              )}
              {score.record !== "" && score.record !== "00:00" && userId && (
                <button
                  className="option"
                  onClick={() => {
                    if (score.record === "" || score.record === "00:00") return;
                    recordDialog.current.showModal();
                  }}
                  aria-label="Reset record"
                >
                  <img
                    src="/icons/timer-reset.svg"
                    className="icon"
                    aria-hidden="true"
                  />
                  Reset record
                </button>
              )}
              {userId && (
                <button
                  className="option"
                  onClick={() => {
                    if (!userId) return;
                    deleteDialog.current.showModal();
                  }}
                  aria-label="Delete data"
                >
                  <img
                    src="/icons/user-delete.svg"
                    className="icon"
                    aria-hidden="true"
                  />
                  Delete data
                </button>
              )}
            </div>
          )}
        </div>
        <div className={styles.bottom}>
          {images && !gameImage && (
            <>
              <h3>
                Select an Image or{" "}
                <a href="/images" aria-label="Open images page">
                  edit them
                </a>
              </h3>
              <div className={styles.images}>
                {images.map((image) => (
                  <div className={styles.image} key={image.id}>
                    <img
                      src={image.url}
                      alt={image.name}
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
                        }
                        setScore(scoreVal);
                        setGameImage(imageResult);
                        setGame((prev) => ({
                          ...prev,
                          start: true,
                          stop: false,
                        }));
                      }}
                    />
                    <h4>{image.name}</h4>
                  </div>
                ))}
              </div>
            </>
          )}
          {gameImage && (
            <div className={styles.gameContainer}>
              <div className={styles.left}>
                <img
                  src={gameImage.url}
                  alt={gameImage.name}
                  onClick={(e) => {
                    if (game.stop || !game.start) return;

                    const imgBoundingSides = {
                      left: e.currentTarget.getBoundingClientRect().left,
                      top: e.currentTarget.getBoundingClientRect().top,
                    };
                    const imgSizeRatio = {
                      width:
                        e.currentTarget.naturalWidth /
                        e.currentTarget.clientWidth,
                      height:
                        e.currentTarget.naturalHeight /
                        e.currentTarget.clientHeight,
                    };
                    const clickedPosition = {
                      x:
                        (e.clientX - imgBoundingSides.left) *
                        imgSizeRatio.width,
                      y:
                        (e.clientY - imgBoundingSides.top) *
                        imgSizeRatio.height,
                    };
                    const pinCenter = 37;
                    gameImage.objects.forEach((object) => {
                      if (
                        clickedPosition.x < object.position.x + pinCenter &&
                        clickedPosition.x > object.position.x - pinCenter &&
                        clickedPosition.y < object.position.y + pinCenter &&
                        clickedPosition.y > object.position.y - pinCenter
                      ) {
                        setGame((prev) => ({
                          ...prev,
                          objects: {
                            current: object,
                            found: prev.objects.found,
                          },
                        }));
                      }
                    });
                    setPinPosition({ x: e.pageX, y: e.pageY });
                  }}
                />
              </div>
              <div className={styles.right}>
                <div className={styles.rightContainer}>
                  {(score.record === "00:00" || game.start) && (
                    <Timer
                      setRecord={async (timeString) => {
                        setScore((prev) => ({ ...prev, record: timeString }));

                        if (!userId) {
                          winDialog.current.showModal();
                          return;
                        }
                        const scoreData = {
                          record: timeString,
                          userId: userId,
                          imageId: gameImage.id,
                        };
                        const result = await requestHandler.post(
                          scoreData,
                          "score",
                        );
                        if (result.data)
                          setScore((prev) => ({
                            ...prev,
                            id: result.data.id,
                          }));
                        alert(result.message);
                      }}
                      stop={game.stop}
                      start={game.start}
                      record={score.record}
                    />
                  )}
                  <div className={styles.objects}>
                    <h3>Objects to find</h3>
                    <ol aria-label="Object list">
                      {gameImage.objects.map((object) => (
                        <li
                          key={object.id}
                          aria-label={`${object.name} object`}
                        >
                          {object.name}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
          {pinPosition && gameImage && (
            <div className="target">
              <Pin position={pinPosition} setPosition={setPinPosition} />
              <Menu
                position={{ x: pinPosition.x + 12, y: pinPosition.y }}
                items={gameImage.objects.filter(
                  (object) => !game.objects.found.includes(object.id),
                )}
                currentItem={game.objects.current}
                setFoundObjects={(objectId) => {
                  setPinPosition(null);

                  if (objectId) {
                    const gameFoundObjects =
                      game.objects.found.concat(objectId);
                    const gameEnd =
                      gameFoundObjects.length === gameImage.objects.length;
                    setGame((prev) => ({
                      ...prev,
                      stop: gameEnd,
                      objects: { current: null, found: gameFoundObjects },
                    }));
                  }
                }}
              />
            </div>
          )}
        </div>
        <div className="dialogs">
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
                    prev.objects.found = [];
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
                  dispatchFormData({ type: "clear" });

                  setScore({ record: "" });
                  setGameImage(null);
                  setGame((prev) => {
                    prev.stop = false;
                    prev.start = false;
                    prev.objects.current = null;
                    prev.objects.found = [];
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
              dispatchFormData={dispatchFormData}
              action={{
                name: "Save",
                handler: async (data) => {
                  data = formDataReducer(data);

                  const result = await requestHandler.post(data, "user");
                  if (!result) return;
                  const id = result.data.id;
                  data.id = id;
                  localStorage.setItem("userId", id);

                  dispatchFormData({ type: "load", payload: data });
                  const scoreData = {
                    record: score.record,
                    userId: id,
                    imageId: gameImage.id,
                  };
                  const scoreResult = await requestHandler.post(
                    scoreData,
                    "score",
                  );
                  setScore(scoreResult.data);
                  winDialog.current.close();
                  alert(scoreResult.message);
                },
              }}
            />
          </Dialog>
        </div>
      </div>
    </GameContext>
  );
}
