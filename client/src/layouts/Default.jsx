import { Outlet } from "react-router-dom";
import "./styles/Default.css";

export default function Default() {
  return (
    <>
      <header>
        <h1 onClick={() => location.assign("/")}>
          Photo Tagging <img src="/icons/tag.svg" alt="" />
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
