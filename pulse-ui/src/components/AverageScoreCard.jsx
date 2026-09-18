
function AverageScoreCard({ averageScore, totalActivities }) {
  const max = 10;
  const progressPercentage = (averageScore/max)*100;
  return (
    //conditional rendering
    //if no activities then display a message
    <div className="card">
      <div className="card-header">Average Score</div>
      {totalActivities === 0 ? (
        <p className="placeholder-text">Log activities to see your score!</p>
      ) : (
        <>
          <div className="score-display">
            <span className="score-value">{averageScore}</span>
            <span className="score-max">/ {max}</span>
          </div>
          <div className="progress-section">
            <div className="progress-header">
              <span>Performance</span>
              <span>{Math.round(progressPercentage,2)} %</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.round(progressPercentage,2)}%`,
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default AverageScoreCard;
