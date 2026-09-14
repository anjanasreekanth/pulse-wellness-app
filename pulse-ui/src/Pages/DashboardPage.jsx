import ActivityLogForm from "../components/ActivityLogForm";
import ActivityTable from "../components/ActivityTable";
import AverageScoreCard from "../components/AverageScoreCard";
import StreakCard from "../components/StreakCard";
function DashboardPage({
  activities,
  //weeklyGoal,
  dashboardSummary,
  onAddActivity,
  onUpdateActivity,
  activityToEdit,
  onEditActivity,
  onCancelEdit,
  onDeleteActivity,
  message,
}) {
  //1. Create state for integration
//console.log("DASHBOARD", dashboardSummary)
  //streak - mock based on number of activities
  // const calculateStreak = (activityCount) => {
  //   if (activityCount < 3) return 3;
  //   if (activityCount < 10) return 7;
  //   return 14; // if 10+ then 14 days streak
  // };

  return (
    // conditional rendering of add / delete message
    <>
      {message && <p className="activity-message">{message}</p>}
      <div className="dashboard-grid">
        {/** left column */}
        <div className="dashboard-column">
          <ActivityLogForm
            key={activityToEdit?.id ?? "new-activity"}
            onAddActivity={onAddActivity}
            onUpdateActivity={onUpdateActivity}
            activityToEdit={activityToEdit}
            onCancelEdit={onCancelEdit}
          />
        </div>
        {/** right column */}
        <div className="dashboard-column">
          <div className="card-row">
            <AverageScoreCard
              averageScore={dashboardSummary.averageScore}
              totalActivities={dashboardSummary.totalActivities}
            />

            <StreakCard
              // streakValue={calculateStreak(activities.length)}
              // currentDays={activities.length}
              // weeklyGoal={weeklyGoal}
              streakValue={dashboardSummary.currentStreakDays}
              currentDays={dashboardSummary.activitiesCompleted}
              weeklyGoal={dashboardSummary.weeklyGoal}
            />
          </div>

          <ActivityTable
            activities={activities}
            onEditActivity={onEditActivity}
            onDeleteActivity={onDeleteActivity}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
