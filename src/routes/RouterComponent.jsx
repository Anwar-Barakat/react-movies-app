import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Movies from "../pages/Movies";
import Search from "../pages/Search";
import TV from "../pages/TV";
import Contact from "../pages/Contact";
import Detail from "../pages/Detail";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/search" element={<Search />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/details/:movieId/:mediaType" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
