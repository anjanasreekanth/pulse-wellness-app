import { useState } from "react";
import ActivitySuggestion from "../components/ActivitySuggestion";
import DailyInspiration from "../components/DailyInspiration";
import WeeklyGoal from "../components/WeeklyGoal";
import { getActivitySuggestion } from "../components/activitySuggestionGenerator";

function MyPlanPage({ activities, goal, onGoalChange, onAddActivity }) {
  const [suggestion, setSuggestion] = useState(null);
  const findSuggestion = (time, energy) => {
    setSuggestion(getActivitySuggestion(time, energy));
  };

  const addSuggestedActivity = () => {
    if (!suggestion) return;

    onAddActivity({
      activityDate: new Date().toISOString().split("T")[0],
      activityName: suggestion.activity,
      durationMinutes: suggestion.duration,
      activityType: suggestion.type,
      waterMl: 0,
      sleepHours: 0,
    });
  };
  return (
    <section className="plan-page">
      <div className="plan-heading">
        <p className="plan-label">MY PLAN</p>
        <h1>Build your weekly wellness plan</h1>
      </div>
      <WeeklyGoal
        activitiesCompleted={activities.length}
        weeklyGoal={goal}
        onGoalChange={onGoalChange}
      />
      <div className="plan-bottom-grid">
        <ActivitySuggestion
          suggestion={suggestion}
          onFindSuggestion={findSuggestion}
          onAddActivity={addSuggestedActivity}
        />
        <DailyInspiration suggestion={suggestion} />
      </div>
    </section>
  );
}

export default MyPlanPage;
