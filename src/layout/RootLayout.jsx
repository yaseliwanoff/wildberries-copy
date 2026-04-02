import Header from "../components/layout/Header/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>© 2026 My App</footer>
    </>
  )
}

export default RootLayout;
