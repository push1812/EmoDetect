import "./index.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Detect from "./pages/Detect";
import RootLayout from "./_root/RootLayout";

function App() {
  return (
    <>
      <main>
        <div>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/detect" element={<Detect />} />
            </Route>
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
