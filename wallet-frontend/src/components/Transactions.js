import React, { useEffect, useState } from "react";
import api from "../services/api";
import transactionsIcon from "../images/transactions.png";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    api.get(`/wallet/transactions/user/${userId}`)
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div className="container">
      <h2>
        <img src={transactionsIcon} alt="Transactions" /> Your Transactions
      </h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.type}</td>
              <td>{tx.amount}</td>
              <td>{new Date(tx.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;