import { getInspirationResources } from "./inspirationGenerator";
function DailyInspiration({ suggestion }) {
  const resources = suggestion
    ? getInspirationResources(suggestion.activity)
    : [];

  return (
    <section className="plan-card inspiration-section">
      <h2>Daily Inspiration</h2>
      {suggestion ? (
        <>
          <div className="inspiration-content">
            <div className="inspiration-icon">*</div>
            <p className="inspiration-activity">
              Today's Activity: {suggestion.activity}
            </p>
            <blockquote>{suggestion.inspiration}</blockquote>
            <p>
              {suggestion.duration} minutes - {suggestion.type}
            </p>
          </div>
          <div className="resource-list">
            {resources.map((resource) => (
              <article className="resource-card" key={resource.title}>
                <span className="resource-type">{resource.type}</span>
                <h3> {resource.title} </h3>
                <p> {resource.description}</p>
                <a href={resource.link} target="_blank">
                  View Resources
                </a>
              </article>
            ))}
          </div>
        </>
      ) : (
        <p className="empty">
          Choose your time and energy level for suggestion
        </p>
      )}
    </section>
  );
}

export default DailyInspiration;
