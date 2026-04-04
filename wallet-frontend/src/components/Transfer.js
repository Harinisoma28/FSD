import React, { useState } from "react";
import api from "../services/api";
import transferIcon from "../images/transfer.png";

function Transfer() {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const senderId = localStorage.getItem("userId");
  const userId = localStorage.getItem("userId");
  if (!userId) {
    setMsg("You must login first");
    return;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!senderId) return setMsg("You must login first");

    try {
      const res = await api.post(`/wallet/transfer?senderId=${senderId}&receiverId=${receiverId}&amount=${amount}`);
      setMsg(res.data);
      setReceiverId("");
      setAmount("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error in transfer");
    }
  };

  return (
    <div className="container">
      <h2>
        <img src={transferIcon} alt="Transfer" /> Transfer Money
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Receiver ID" value={receiverId} required onChange={(e) => setReceiverId(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} required onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Transfer</button>
      </form>
      {msg && <p className="message">{msg}</p>}
    </div>
  );
}

export default Transfer;