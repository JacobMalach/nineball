import React from 'react';

import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import EntryList from "./components/entryList";
import { Create } from "./components/create";
import { View } from "./components/viewEntry";
import { Search } from "./components/search";

const App = () => {

  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<EntryList tags="null"/>} />
        <Route exact path="/search/:tags" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;