import React from "react";

import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import EntryList from "./components/entryList";
import Create from "./components/create";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<EntryList />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;