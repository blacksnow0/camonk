// src/MainRouter.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Feedback from "./components/FeedBack";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
