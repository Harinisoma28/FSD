import React from "react";
import logo from "../images/logo.png";

function Home() {
  const userName = localStorage.getItem("userName");

  return (
    <div className="container">
      <h1>
        <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
        Welcome, {userName}!
      </h1>
      <p>Your digital wallet dashboard.</p>
    </div>
  );
}

export default Home;