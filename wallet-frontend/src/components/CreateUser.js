import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/wallet/create", { name, email });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("userId", res.data.id);
      setMsg("Account created ✅");
      navigate("/home");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} required onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Create</button>
      </form>
      {msg && <p className="message">{msg}</p>}
    </div>
  );
}

export default CreateUser;