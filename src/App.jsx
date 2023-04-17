import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./component/Auth";
import MovieList from "./component/MovieList";

const App = () => {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Auth/> } />
        <Route path="/movielist" element={ <MovieList/>} />
      </Routes>
    </div>
  );
};

export default App;
