// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Replace Switch with Routes
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskEdit from "./components/TaskEdit";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="/tasks/edit/:id" element={<TaskEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
