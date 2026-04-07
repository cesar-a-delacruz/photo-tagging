import { Outlet } from "react-router-dom";
import usePageTitle from "@/hooks/usePageTitle";
import "@/styles/layouts/Default.css";

export default function Default() {
  const { title, setTitle } = usePageTitle();

  return (
    <>
      <header>
        <h1 onClick={() => location.assign("/")}>
          Photo Tagging: <span>{title}</span>
        </h1>
      </header>
      <main>
        <Outlet context={setTitle} />
      </main>
    </>
  );
}
