import { Route, Routes } from "react-router-dom";
import CreatePage from "./views/CreatePage/CreatePage";
import Detail from "./views/DetailPage/DetailPage";
import Home from "./views/HomePage/HomePage";
import Landing from "./views/LandingPage/LandingPage";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
