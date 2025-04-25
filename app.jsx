import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./UserList";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: 16, background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}