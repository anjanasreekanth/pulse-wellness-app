import { useState } from "react";
import Button from "../components/Button";
const emptyProfile = {
  dateOfBirth: "",
  heightCm: "",
  weightCm: "",
  activityLevel: "MODERATE",
  primaryGoal: "FITNESS",
  dailyWaterTargetMl: 2500,
  sleepTargetHours: 8,
  perferredUnit: "METRIC",
};

function ProfilePage() {
  const [form, setForm] = useState(emptyProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="profile-page">
      <div className="profile-heading">
        <div>
          <p className="profile-label">WELLNESS PROFILE</p>
          <h1>Personalize your experience</h1>
          <p> Set targets for your dashboard</p>
        </div>
        <div className="profile-badge">♥</div>
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <fieldset className="profile-card">
          <legend> Personal Details </legend>
          <p className="profile-card-copy">
            These are personal and remains private
          </p>

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
          />

          <div className="profile-two-columns">
            <div>
              <label htmlFor="heightCm">Height (cm) </label>
              <input
                id="heightCm"
                name="heightCm"
                type="number"
                value={form.heightCm}
                onChange={handleChange}
                ß
                placeholder="175"
                min="50"
                max="275"
                step=".1"
              />
            </div>
            <div>
              <label htmlFor="weightKg">Weight (kg) </label>
              <input
                id="weightKg"
                name="weightKg"
                type="number"
                value={form.weightKg}
                onChange={handleChange}
                placeholder="72.5"
                min="20"
                max="500"
                step=".1"
              />
            </div>
          </div>

          <label htmlFor="preferredUnit"> Preferred Unit</label>
          <select
            id="preferredUnit"
            name="preferredUnit"
            value={form.perferredUnit}
            onChange={handleChange}
          >
            <option value="METRIC">Metric</option>
            <option value="IMPERIAL">Imperial</option>
          </select>
        </fieldset>
        <fieldset className="profile-card">
          <legend>Preferences</legend>
          <p className="profile-card-copy" Set your preferences></p>
          <label htmlFor="activityLevel"></label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={form.activityLevel}
            onChange={handleChange}
            required
          >
            <option value="LOW"> Low </option>
            <option value="MODERATE"> Moderate </option>
            <option value="HIGH"> High </option>
          </select>
          <label htmlFor="primaryGoal">Primary Goal</label>
          <select
            id="primaryGoal"
            name="primaryGoal"
            value={form.primaryGoal}
            onChange={handleChange}
            required
          >
            <option value="FITNESS"> Build Fitness </option>
            <option value="SLEEP"> Improve Sleep </option>
            <option value="MINDFULNESS"> Practice Meditation </option>
            <option value="WATER"> Improve Water Intake </option>
          </select>
          <div className="profile-two-columns">
            <div>
              <label htmlFor="dailyWaterTargetMl"> Water target (ml)</label>
              <input
                id="dailyWaterTargetMl"
                name="dailyWaterTargetMl"
                type="number"
                min="500"
                max="6000"
                step="50"
                value={form.dailyWaterTargetMl}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="sleepTargetHours">Sleep target (hours)</label>
              <input
                id="sleepTargetHours"
                name="sleepTargetHours"
                type="number"
                min="1"
                max="14"
                step="0.5"
                value={form.sleepTargetHours}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>
        <div className="profile-privacy">
          <p>
            <strong>Your information is private</strong>
          </p>
        </div>
        <div className="profile-actions">
          <Button className="profile-save" type="submit">
            Save Profile
          </Button>
        </div>
      </form>
    </section>
  );
}

export default ProfilePage;
