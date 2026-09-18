import { useEffect, useState } from "react";
import Button from "../components/Button";
import {
  createProfile,
  deletProfile,
  getProfie,
  updateProfile,
} from "../services/api";
const emptyProfile = {
  dateOfBirth: "",
  heightCm: "",
  weightKg: "",
  activityLevel: "MODERATE",
  primaryGoal: "FITNESS",
  dailyWaterTargetMl: 2500,
  sleepTargetHours: 8,
  preferredUnit: "METRIC",
};

function ProfilePage({ userId }) {
  const [form, setForm] = useState(emptyProfile);
  const [profileExists, setProfileExists] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await getProfie(userId);
        if (savedProfile) {
          setForm({
            dateOfBirth: savedProfile.dateOfBirth,
            heightCm: savedProfile.heightCm,
            weightKg: savedProfile.weightKg,
            activityLevel: savedProfile.activityLevel ?? "MODERATE",
            primaryGoal: savedProfile.primaryGoal ?? "FITNESS",
            dailyWaterTargetMl: savedProfile.dailyWaterTargetMl ?? 2500,
            sleepTargetHours: savedProfile.sleepTargetHours ?? 8,
            preferredUnit: savedProfile.preferredUnit ?? "METRIC",
          });
          setProfileExists(true);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    loadProfile();
  }, [userId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");
    const profile = {
      ...form,
      dateOfBirth: form.dateOfBirth || null,
      heighCm: form.heightCm || null,
      weightKg: form.weightKg || null,
      dailyWaterTargetMl: form.dailyWaterTargetMl,
      sleepTargetHours: form.sleepTargetHours,
    };
    try {
      const savedProfile = profileExists
        ? await updateProfile(userId, profile)
        : await createProfile(userId, profile);

      setForm({
        dateOfBirth: savedProfile.dateOfBirth,
        heightCm: savedProfile.heightCm,
        weightKg: savedProfile.weightKg,
        activityLevel: savedProfile.activityLevel ?? "MODERATE",
        primaryGoal: savedProfile.primaryGoal ?? "FITNESS",
        dailyWaterTargetMl: savedProfile.dailyWaterTargetMl ?? 2500,
        sleepTargetHours: savedProfile.sleepTargetHours ?? 8,
        preferredUnit: savedProfile.preferredUnit ?? "METRIC",
      });
      setProfileExists(true);
      setMessage("Profile Saved");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleDelete = async () => {
    const shouldDelete = window.confirm("Are you sure want to delete profile?");
    if (!shouldDelete) return;

    setMessage("");
    setErrorMessage("");
    try {
      await deletProfile(userId);
      setForm(emptyProfile);
      setProfileExists(false);
      setMessage("Profile Deleted");
    } catch (error) {
      setErrorMessage(error.message);
    }
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
      {message && <p className="profile-alert profile-success">{message} </p>}
      {errorMessage && (
        <p className="profile-alert profile-error">{errorMessage} </p>
      )}

      <form className="profile-form" onSubmit={handleSubmit}>
        <fieldset className="profile-card">
          <h2> Personal Details </h2>
       
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
            value={form.preferredUnit}
            onChange={handleChange}
          >
            <option value="METRIC">Metric</option>
            <option value="IMPERIAL">Imperial</option>
          </select>
        </fieldset>
        <fieldset className="profile-card">
          <h2>Preferences</h2>
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
    
        <div className="profile-actions">
          {profileExists && (
            <Button className="profile-delete" onClick={handleDelete}>
              Delete Profile
            </Button>
          )}
          <Button className="profile-save" type="submit">
            Save Profile
          </Button>
        </div>
      </form>
    </section>
  );
}

export default ProfilePage;
