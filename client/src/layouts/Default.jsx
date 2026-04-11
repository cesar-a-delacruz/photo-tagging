import { Outlet } from "react-router-dom";
import "@/styles/layouts/Default.css";

export default function Default() {
  return (
    <>
      <header>
        <h1 onClick={() => location.assign("/")}>Photo Tagging</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
