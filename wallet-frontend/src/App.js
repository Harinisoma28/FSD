import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import AddMoney from "./components/AddMoney";
import CreateUser from "./components/CreateUser";
import Transfer from "./components/Transfer";
import Transactions from "./components/Transactions";
import Navbar from "./components/Navbar";

function App() {
  const isLoggedIn = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  return (
    <Router>
      {isLoggedIn && <Navbar userName={userName} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/add" element={<AddMoney />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;