import { Outlet } from "react-router-dom";
import "@/styles/layouts/Default.css";

export default function Default() {
  return (
    <>
      <header>
        <h1>Photo Tagging</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
