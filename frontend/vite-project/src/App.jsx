import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Createlisting from "./pages/Createlisting";
import Listingdetails from "./pages/Listingdetails";
import TripList from "./pages/TripList";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createlisting" element={<Createlisting />} />
        <Route path="/properties/:listingId" element={<Listingdetails/>}/>
        <Route path="/:userId/trips" element={<TripList/>}/>
      </Routes>
    </>
  );
}

export default App;
