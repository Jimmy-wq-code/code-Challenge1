import { useState } from "react";

function DepositForm({ goals, onDeposit }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const depositAmount = parseFloat(amount);

    if (!selectedGoalId || isNaN(depositAmount) || depositAmount <= 0) {
      alert("Please select a goal and enter a valid amount.");
      return;
    }

    onDeposit(parseInt(selectedGoalId), depositAmount);
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Make a Deposit</h3>
      <select
        value={selectedGoalId}
        onChange={(e) => setSelectedGoalId(e.target.value)}
      >
        <option value="">Select Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
