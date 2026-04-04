import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

function Navbar({ userName }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Bank Logo" className="logo" />
      <Link to="/home">Home</Link>
      <Link to="/add">Add Money</Link>
      <Link to="/transfer">Transfer</Link>
      <Link to="/transactions">Transactions</Link>
      <span className="username">{userName}</span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;