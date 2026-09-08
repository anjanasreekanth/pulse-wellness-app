import { getRandomQuote } from "./randomQuoteGenerator";
function StreakCard({ streakValue = 14, currentDays = 5, weeklyGoal = 7 }) {
  const quote = getRandomQuote();
  return (
    <div className="streak-card">
      <div className="streak-header">
        {/**icon placeholder */}
        <span className="fire"> 🔥</span>
        {/**Streak value  */}
        <div className="streak-number"> {streakValue}</div>
        {/**subtext below streak value */}
        <div className="streak-label"> STREAK DAYS</div>
      </div>
      {/* Progress bar */}
      <div className="progress-section">
        <div className="weekly-header">
          <span> weekly goal Completed </span>
          <span>
            {currentDays} of {weeklyGoal}
          </span>
        </div>
      </div>

      {/**Motivational text */}
      <p className="motivational-text">💡 {quote.quote}</p>
    </div>
  );
}

export default StreakCard;
