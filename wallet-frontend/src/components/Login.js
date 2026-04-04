import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) return setMessage("Please enter email");

    try {
      const response = await fetch(`http://localhost:8080/auth/login?email=${email}`, { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userId", data.id); // auto store user ID
        setMessage("Login successful ✅");
        navigate("/home");
      } else {
        setMessage("Login failed ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>or</p>
        <Link to="/create" className="link-button">Create Account</Link>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;