import { useState } from "react";
function ActivityLogForm({ onAddActivity }) {
  //1. useState to manage form data
  const [formState, setFormState] = useState({
    date: "",
    activity: "",
    activityType: "",
    duration: "",
    water: 0,
    sleep: 0,
  });

  // 2. Event Handler:  this is executed when button is clicked
  const handleSubmit = (e) => {
    e.preventDefault(); //stop page refresh
    // 3.   pass back the collected data to parent page
    onAddActivity(formState);
    // clear the form after submission
    setFormState({
      date: "",
      activity: "",
      activityType: "",
      duration: 0,
      water: 0,
      sleep: 0,
    });
  };

  // 4. handle input change event
  const handleChange = (e) => {
    const { id, value, type } = e.target;
    let newValue = value;
    if (type === "number") {
      newValue = value === "" ? 0 : parseFloat(value) || 0;
    }
    setFormState((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };
  //date validator
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="activity-form-container">
      <h3 className="form-title">Activity Log Form</h3>
      <form onSubmit={handleSubmit}>
        {/* Field 1 -> Date */}
        <div className="form-field full-width">
          <label htmlFor="date"> Date: </label>
          <input
            type="date"
            id="date"
            value={formState.date}
            className="input-field"
            onChange={handleChange}
            required
            max={today}
          />
        </div>
        {/* Field 2 -> Activity */}
        <div className="form-field full-width">
          <label htmlFor="activity"> Activity: </label>
          <select
            id="activity"
            className="input-field"
            value={formState.activity}
            onChange={handleChange}
            required
          >
            <option value="">Select An Activity</option>
            <option>Running</option>
            <option>Walking</option>
            <option>Meditation</option>
          </select>
        </div>
        {/* Field 3 -> Activity Type */}
        <div className="form-field full-width">
          <label htmlFor="activityType"> Activity Type: </label>
          <select
            id="activityType"
            className="input-field"
            value={formState.activityType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option>Cardio</option>
            <option>Strength</option>
            <option>mindfulness</option>
          </select>
        </div>
        <div className="form-field full-width duration-field">
          <label htmlFor="duration"> Duration (minutes): </label>
          <input
            type="number"
            id="duration"
            value={formState.duration}
            className="input-field water-input"
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        {/* separator line */}
        <div className="separator"></div>
        {/* Field 5 & Field 6*/}
        <div className="form-field full-width water-sleep-row">
          <label htmlFor="water"> Water (ml): </label>
          <input
            type="number"
            id="water"
            value={formState.water}
            className="input-field water-input"
            onChange={handleChange}
            min="0"
            step="50"
            required
          />
        </div>
        <div className="form-field full-width sleep-field">
          <label htmlFor="sleep"> Sleep: </label>
          <input
            type="number"
            id="sleep"
            value={formState.sleep}
            className="input-field sleep-input"
            onChange={handleChange}
            min="0"
            max="24"
            step=".5"
            required
          />
        </div>
        {/* Button */}
        <button className="btn-submit full-width-button" type="submit">
          ADD LOG
        </button>
      </form>
    </div>
  );
}

export default ActivityLogForm;
