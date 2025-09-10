import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <section className="overflow-hidden">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
