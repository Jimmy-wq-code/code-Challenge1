import "./TrackGoal.css";

function TrackGoal({ goal, onEdit, onDelete }) {
  const { id, name, category, targetAmount, savedAmount = 0, deadline } = goal;

  const remaining = targetAmount - savedAmount;
  const progress = Math.min((savedAmount / targetAmount) * 100, 100);
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysLeft = Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const isComplete = savedAmount >= targetAmount;

  return (
    <div className="goal-card">
      <h3>{name}</h3>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Deadline:</strong> {deadline}</p>
      <p><strong>Saved:</strong> KES {savedAmount}</p>
      <p><strong>Target:</strong> KES {targetAmount}</p>
      <p><strong>Remaining:</strong> KES {remaining}</p>

      <div className="goal-progress-container">
        <div
          className={`goal-progress-bar ${progress >= 100 ? "complete" : ""}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p><em>{progress.toFixed(1)}% complete</em></p>

      {isComplete ? (
        <p className="goal-complete">✅ Goal Complete!</p>
      ) : daysLeft < 0 ? (
        <p className="goal-overdue">⚠️ Overdue by {Math.abs(daysLeft)} days</p>
      ) : (
        <p>⏳ {daysLeft} days left</p>
      )}

      <div className="goal-buttons">
        <button onClick={() => onEdit(goal)}>Edit</button>
       <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TrackGoal;
