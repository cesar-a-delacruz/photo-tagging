import Target from "@/components/Target";
import { useState } from "react";

export default function Game() {
  const [targetProps, setTargetProps] = useState({});
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
          <button>Change Image</button>
          <button>Reset Record</button>
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
        <dialog className="change-image">
          <h2>Change Image</h2>
          <div className="images">
            <div className="image">
              <p>Image 1</p>
              <button>Select</button>
            </div>
          </div>
          <button>Cancel</button>
        </dialog>
        <dialog className="reset-record">
          <h2>Reset Record</h2>
          <p>Are you sure you want to reset your record?</p>
          <div className="options">
            <button>Yes</button>
            <button>No</button>
          </div>
        </dialog>
      </div>
    </>
  );
}
