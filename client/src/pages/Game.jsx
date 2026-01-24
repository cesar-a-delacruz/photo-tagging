import Target from "@/components/Target";
import Dialog from "@/components/Dialog";
import { useState, useRef } from "react";

export default function Game() {
  const [targetProps, setTargetProps] = useState({});
  const imageDialog = useRef(null);
  const recordDialog = useRef(null);

  return (
    <>
      <div className="top">
        <div className="data">
          <div className="user">
            <p>
              Name: <span>Anon</span>
            </p>
            <p>
              Record: <span>00:00:00</span>
            </p>
          </div>
          <div className="time">
            <p>
              Time: <span>00:00:00</span>
            </p>
          </div>
        </div>
        <div className="options">
          <button onClick={(e) => (imageDialog.current.open = true)}>
            Change Image
          </button>
          <button onClick={(e) => (recordDialog.current.open = true)}>
            Reset Record
          </button>
        </div>
      </div>
      <div className="bottom">
        <img
          src="/sample.webp"
          alt=""
          onClick={(e) => {
            setTargetProps({ x: e.pageX, y: e.pageY });
          }}
        />
        <div className="objects">
          <h3>Objects to find</h3>
          <ol>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ol>
        </div>
        {Object.keys(targetProps).length > 0 && (
          <Target props={targetProps} setProps={setTargetProps} />
        )}
      </div>

      <div className="dialogs">
        <Dialog title={"Change Image"} ref={imageDialog}>
          <div className="images">
            <div className="image">
              <p>Image 1</p>
              <button>Select</button>
            </div>
          </div>
        </Dialog>
        <Dialog
          title={"Reset Record"}
          action={{ name: "Reset", handler: () => {} }}
          ref={recordDialog}
        >
          <p>Are you sure you want to reset your record?</p>
        </Dialog>
      </div>
    </>
  );
}
