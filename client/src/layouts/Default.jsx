import { Outlet } from "react-router-dom";
import "./styles/layouts.css";
import styles from "./styles/Default.module.css";

export default function Default() {
  return (
    <div className={`layout ${styles.default}`}>
      <header>
        <h1 onClick={() => location.assign("/")}>
          Photo Tagging <img src="/icons/tag.svg" alt="" />
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
