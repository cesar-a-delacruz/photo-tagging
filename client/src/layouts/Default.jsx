import { Outlet } from "react-router-dom";
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
