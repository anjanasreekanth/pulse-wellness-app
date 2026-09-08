import ActivityLogForm from "../components/ActivityLogForm";
import ActivityTable from "../components/ActivityTable";
import AverageScoreCard from "../components/AverageScoreCard";
import StreakCard from "../components/StreakCard";
function DashboardPage({
  activities,
  weeklyGoal,
  onAddActivity,
  onDeleteActivity,
  message,
}) {
  //1. Create state for integration

  //streak - mock based on number of activities
  const calculateStreak = (activityCount) => {
    if (activityCount < 3) return 3;
    if (activityCount < 10) return 7;
    return 14; // if 10+ then 14 days streak
  };

  return (
    // conditional rendering of add / delete message
    <>
      {message && <p className="activity-message">{message}</p>}
      <div className="dashboard-grid">
        {/** left column */}
        <div className="dashboard-column">
          <ActivityLogForm onAddActivity={onAddActivity} />
        </div>
        {/** right column */}
        <div className="dashboard-column">
          <div className="card-row">
            <AverageScoreCard activities={activities} />

            <StreakCard
              streakValue={calculateStreak(activities.length)}
              currentDays={activities.length}
              weeklyGoal={weeklyGoal}
            />
          </div>

          <ActivityTable
            activities={activities}
            onDeleteActivity={onDeleteActivity}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
