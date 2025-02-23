import React, { useState, useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulating fetching transactions from API
    setTimeout(() => {
      setTransactions([
        { id: 1, name: "Amazon Purchase", amount: -500, date: "2024-02-22" },
        { id: 2, name: "Salary Credit", amount: 2000, date: "2024-02-20" },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p>Loading transactions...</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.id} className="border-b p-2 flex justify-between">
              <span>{tx.name}</span>
              <span className={tx.amount < 0 ? "text-red-500" : "text-green-500"}>
                {tx.amount}₹
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
