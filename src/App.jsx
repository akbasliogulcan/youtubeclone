import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./Pages/Feed";
import Detail from "./Pages/Detail";
import Result from "./Pages/Result";
import Header from "./Components/Header";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/watch" element={<Detail />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
