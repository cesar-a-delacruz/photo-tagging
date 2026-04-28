import { Outlet } from "react-router-dom";
import "@/utils/css/layouts.css";
import styles from "./styles/Default.module.css";

export default function Default() {
  return (
    <div className={`layout ${styles.default}`}>
      <header>
        <h1 onClick={() => location.assign("/")}>
          {import.meta.env.VITE_TITLE} <img src="/icons/tag.svg" />
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
