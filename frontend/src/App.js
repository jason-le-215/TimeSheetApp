import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Employees from "./components/Employees";
import Projects from "./components/Projects";

function App() {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <Navbar sx={{ padding: 2 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Employees" element={<Employees />} />
        <Route path="Projects" element={<Projects />} />
      </Routes>
    </Container>
  );
}

export default App;
