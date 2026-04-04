import React, { useState } from "react";
import api from "../services/api";
import addIcon from "../images/add.png";

function AddMoney() {
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const userId = localStorage.getItem("userId");
  if (!userId) {
    setMsg("You must login first");
    return;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return setMsg("User not logged in");

    try {
      await api.post(`/wallet/add/${userId}?amount=${amount}`);
      setMsg("Money added successfully!");
      setAmount("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error adding money");
    }
  };

  return (
    <div className="container">
      <h2>
        <img src={addIcon} alt="Add" /> Add Money
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount" value={amount} required onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      {msg && <p className="message">{msg}</p>}
    </div>
  );
}

export default AddMoney;