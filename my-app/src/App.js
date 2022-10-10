import './App.css';
import React from "react";
import { Routes, Route, Link, useRoutes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Lyrics from "./Components/lyrics";
import Homepage from "./Components/homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/findartist' element={<Lyrics />} />
      </Routes>
    </div >
  );
}

export default App;
