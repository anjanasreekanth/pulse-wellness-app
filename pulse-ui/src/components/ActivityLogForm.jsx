import { useState } from "react";
const emptyForm = {
  activityDate: "",
  activityName: "",
  activityType: "",
  durationMinutes: "",
  waterMl: "",
  sleepHours: "",
};
function ActivityLogForm({
  onAddActivity,
  onUpdateActivity,
  activityToEdit,
  onCancelEdit,
}) {
  const initialForm = activityToEdit
    ? {
        activityDate: activityToEdit.activityDate,
        activityName: activityToEdit.activityName,
        activityType: activityToEdit.activityType,
        durationMinutes: activityToEdit.durationMinutes,
        waterMl: activityToEdit.waterMl,
        sleepHours: activityToEdit.sleepHours,
      }
    : emptyForm;
  //1. useState to manage form data
  // const [formState, setFormState] = useState({
  //   date: "",
  //   activity: "",
  //   activityType: "",
  //   duration: "",
  //   water: 0,
  //   sleep: 0,
  // });
  const [formState, setFormState] = useState(initialForm);
   //use same form for both creating and editing an activity
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activityToEdit) {
        await onUpdateActivity(formState);
      } else {
        await onAddActivity(formState);
      }
      setFormState(emptyForm);
    } catch (error) {
      console.error(error);
    }
  };
  // handle input change event
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
  const handleCancel = () => {
    setFormState(emptyForm);
    onCancelEdit();
  };
  //date validator
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="activity-form-container">
      <h3 className="form-title">
        {activityToEdit ? "Edit Activity Log" : "Activity Log Form"}
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Field 1 -> Date */}
        <div className="form-field full-width">
          <label htmlFor="activityDate"> Date: </label>
          <input
            type="date"
            id="activityDate"
            value={formState.activityDate}
            className="input-field"
            onChange={handleChange}
            required
            max={today}
          />
        </div>
        {/* Field 2 -> Activity */}
        <div className="form-field full-width">
          <label htmlFor="activityName"> Activity: </label>
          <select
            id="activityName"
            className="input-field"
            value={formState.activityName}
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
          <label htmlFor="durationMinutes"> Duration (minutes): </label>
          <input
            type="number"
            id="durationMinutes"
            value={formState.durationMinutes}
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
          <label htmlFor="waterMl"> Water (ml): </label>
          <input
            type="number"
            id="waterMl"
            value={formState.waterMl}
            className="input-field water-input"
            onChange={handleChange}
            min="0"
            step="50"
            required
          />
        </div>
        <div className="form-field full-width sleep-field">
          <label htmlFor="sleepHours"> Sleep: </label>
          <input
            type="number"
            id="sleepHours"
            value={formState.sleepHours}
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
          {activityToEdit ? "UPDATE LOG" : "ADD LOG"}
        </button>

        {activityToEdit && (
          <button
            className="btn cancel-btn"
            onClick={handleCancel}
          >
            CANCEL
          </button>
        )}
      </form>
    </div>
  );
}

export default ActivityLogForm;
