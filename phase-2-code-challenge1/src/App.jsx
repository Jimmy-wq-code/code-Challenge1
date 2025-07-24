import { useEffect, useState } from "react";
import { getGoals, createGoal, updateGoal, deleteGoal } from "./service/goalService";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import GoalForm from "./components/GoalForm";
import TrackGoal from "./components/TrackGoal";
import DepositForm from "./components/DepositForm";
import Overview from "./components/Overview";

function App() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  // Fetch all goals on load
  useEffect(() => {
    getGoals().then(data => setGoals(data));
  }, []);

  // Save (add or update)
  function handleSave(goal) {
    if (editingGoal) {
      updateGoal(goal.id, goal).then(updated => {
        setGoals(goals.map(g => (g.id === updated.id ? updated : g)));
        setEditingGoal(null);
      });
    } else {
      createGoal(goal).then(newGoal => {
        setGoals([...goals, newGoal]);
      });
    }
  }

  function handleDelete(id) {
  if (window.confirm("Are you sure you want to delete this goal?")) {
    deleteGoal(id).then(() => {
      setGoals(goals.filter(g => g.id !== id));
      setEditingGoal(null);
    });
  }
}


  // Handle editing
  function handleEdit(goal) {
    setEditingGoal(goal);
  }

  // Handle deposits (only updates savedAmount)
  function handleDeposit(id, depositAmount) {
    const goal = goals.find(g => g.id === id);
    const updatedGoal = {
      ...goal,
      savedAmount: (goal.savedAmount || 0) + depositAmount,
    };

    updateGoal(id, updatedGoal).then(updated => {
      setGoals(goals.map(g => (g.id === id ? updated : g)));
    });
  }

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>

      <GoalForm
        onSave={handleSave}
        onDelete={handleDelete}
        editingGoal={editingGoal}
      />

      <DepositForm goals={goals} onDeposit={handleDeposit} />

      <Overview goals={goals} />

      <div>
        {goals.map(goal => (
          <TrackGoal 
            key={goal.id}
            goal={goal}  
            onEdit={(goal) => setEditingGoal(goal)}
            onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;