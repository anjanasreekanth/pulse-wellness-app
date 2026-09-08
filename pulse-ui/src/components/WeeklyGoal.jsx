import Button from "./Button";

function WeeklyGoal({ activitiesCompleted, weeklyGoal, onGoalChange }) {
  //Limit progress to 100% when completed activities exceed the goal
  const progress = Math.min((activitiesCompleted / weeklyGoal) * 100, 100);

  const decreaseGoal = () => {
    if (weeklyGoal > 1) onGoalChange(weeklyGoal - 1);
  };

  const increaseGoal = () => {
    if (weeklyGoal < 14) onGoalChange(weeklyGoal + 1);
  };
  return (
    <section className="plan-card goal-section">
      <div className="goal-message">
        <h2> Goal Status</h2>
        <p>
          {activitiesCompleted >= weeklyGoal //displaying goal status and a message
            ? "Great Job! You reached your goal!"
            : "You are making great progress!"}
        </p>
      </div>
      {/* progress percentage and progress bar */}
      <div className="goal-progress">
        <h3>Progress to weekly Goal</h3>
        <p>
          {Math.round(progress)}% | {activitiesCompleted} / {weeklyGoal}{" "}
          completed
        </p>
      </div>
      <div className="goal-setter">
        <h3> Set your goal for this week</h3>
        <div className="goal-controls">
          <Button onClick={decreaseGoal}> - </Button>
          <strong>{weeklyGoal}</strong>
          <Button onClick={increaseGoal}> + </Button>
        </div>
        <small>activities</small>
      </div>
    </section>
  );
}

export default WeeklyGoal;
