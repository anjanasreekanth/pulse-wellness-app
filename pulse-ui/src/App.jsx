import "./App.css";
import Layout from "./components/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import AboutPage from "./Pages/AboutPage";
import MyPlanPage from "./Pages/MyPlanPage";
import LoginPage from "./Pages/LoginPage";
import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import {
  createActivity,
  createGoal,
  deleteActivity,
  getAllActivities,
  getCurrentGoal,
  getDashboard,
  updateActivity,
  updateGoal,
  getUsers,
  createUser,
} from "./services/api";

const emptyDashboard = {
  totalActivities: 0,
  averageScore: 0,
  currentStreakDays: 0,
  activitiesCompleted: 0,
  weeklyGoal: 0,
  progressPercent: 0,
};

function App() {
  const [activities, setActivities] = useState([]);
  const [weeklyGoal, setWeeklyGoal] = useState(4);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [activityToEdit, setActivityToEdit] = useState(null);
  const [dashboardSummary, setDashboardSummary] = useState(emptyDashboard);
  const [currentUser, setCurrentUser] = useState(null);
  //Load selected user activities, dashboard summary and current weekly goal
  useEffect(() => {
    if (!message) return;

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }, [message]);
  useEffect(() => {
    if (!isLoggedIn || !currentUser) return;
 
    const loadDashboardData = async () => {
      try {
        const [savedActivities, summary, savedGoal] = await Promise.all([
          getAllActivities(currentUser.id),
          getDashboard(currentUser.id),
          getCurrentGoal(currentUser.id).catch(() => null),
        ]);
        setActivities(savedActivities);
        setDashboardSummary(summary);
        setWeeklyGoal(savedGoal);
      } catch (error) {
        setMessage(error.message);
      }
    };
    loadDashboardData();
    //loadActivities();
  }, [isLoggedIn, currentUser]);
  
  const handleAddActivity = async (newActivity) => {
    try {
      const savedActivity = await createActivity(currentUser.id, newActivity);
      const summary = await getDashboard(currentUser.id);
      setActivities((previous) => [...previous, savedActivity]);
      setDashboardSummary(summary);
      setMessage("Activity added successfully");
    } catch (error) {
      setMessage(error.message);
      throw error;
    }
  };
 

  const handleDeleteActivity = async (idToDelete) => {
    try {
      await deleteActivity(currentUser.id, idToDelete);
      const summary = await getDashboard(currentUser.id);
      setActivities((previous) =>
        previous.filter((activity) => activity.id !== idToDelete),
      );
      setDashboardSummary(summary);
      if (activityToEdit?.id === idToDelete) setActivityToEdit(null);
      setMessage("Activity deleted successfully");
    } catch (error) {
      setMessage(error.message);
    }
  };
  //login
  //First saved user or creates one for an empty DB
  const login = async (name) => {
    const users = await getUsers();
    let user = users[0];
    if (!user) {
      user = await createUser({
        name,
        email: "demo@pulse.com",
        role: "USER",
      });
    }
    setCurrentUser(user);
    setIsLoggedIn(true);
    setUserName(user.name);
  };

  //update activity

  const handleUpdateActivity = async (updatedActivity) => {
    try {
      const savedActivity = await updateActivity(
        currentUser.id,
        activityToEdit.id,
        updatedActivity,
      );
      const summary = await getDashboard(currentUser.id);

      setActivities((previous) =>
        previous.map((activity) =>
          activity.id === savedActivity.id ? savedActivity : activity,
        ),
      );
      setDashboardSummary(summary);
 
      setActivityToEdit(null);
      setMessage("Activity updated successfully");
    } catch (error) {
      setMessage(error.message);
      throw error;
    }
  };
  //update existing weekly goal or create new when a new week begins
  const handleGoalChange = async (targetActivities) => {
    try {
      let savedGoal;
      if (weeklyGoal) {
        savedGoal = await updateGoal(currentUser.id, weeklyGoal.id, {
          targetActivities,
        });
      } else {
        savedGoal = await createGoal(currentUser.id, {
          targetActivities,
        });
      }
      const summary = await getDashboard(currentUser.id);
      setWeeklyGoal(savedGoal);
      setDashboardSummary(summary);
      setMessage("Weekly goal updated");
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage onLogin={login} />} />
      </Routes>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout userName={userName} />}>
          <Route index element={<HomePage />} />
          <Route
            path="dashboard"
            element={
              <DashboardPage
                dashboardSummary={dashboardSummary}
                activities={activities}
                weeklyGoal={weeklyGoal}
                onAddActivity={handleAddActivity}
                onUpdateActivity={handleUpdateActivity}
                activityToEdit={activityToEdit}
                onEditActivity={setActivityToEdit}
                onCancelEdit={() => setActivityToEdit(null)}
                onDeleteActivity={handleDeleteActivity}
                message={message}
              />
            }
          />
          <Route path="about" element={<AboutPage />} />
          <Route path="profile" element={<ProfilePage userId={currentUser.id} />} />

          <Route
            path="my-plan"
            element={
              <MyPlanPage
                //activities={activities}
                activitiesCompleted={dashboardSummary.activitiesCompleted}
                goal={weeklyGoal?.targetActivities ?? 4}
                //onGoalChange={setWeeklyGoal}
                onGoalChange={handleGoalChange}
                onAddActivity={handleAddActivity}
              />
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage onLogin={login} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
export default App;
