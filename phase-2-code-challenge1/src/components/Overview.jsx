import "./Overview.css";

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + (g.savedAmount || 0), 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
  const today = new Date();

  return (
    <div className="overview">
      <h2>Goals Overview</h2>
      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Completed Goals:</strong> {completedGoals}</p>
      <p><strong>Total Saved:</strong> KES {totalSaved}</p>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${overallProgress}%` }}
        ></div>
      </div>
      <p><em>{overallProgress.toFixed(1)}% overall progress</em></p>

      <h3>Goal Deadlines</h3>
      <ul className="goal-deadlines">
        {goals.map(goal => {
          const deadline = new Date(goal.deadline);
          const daysLeft = Math.floor((deadline - today) / (1000 * 60 * 60 * 24));
          const isComplete = goal.savedAmount >= goal.targetAmount;

          let status = "";
          if (!isComplete) {
            if (daysLeft < 0) {
              status = "Overdue";
            } else if (daysLeft <= 30) {
              status = `Only ${daysLeft} days left`;
            }
          } else {
            status = "Completed";
          }

          return (
            <li key={goal.id}>
              {goal.name} – {status}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
