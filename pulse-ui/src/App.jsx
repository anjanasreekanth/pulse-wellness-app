import "./App.css";
import Layout from "./components/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import AboutPage from "./Pages/AboutPage";
import MyPlanPage from "./Pages/MyPlanPage";
import LoginPage from "./Pages/LoginPage";
import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import {
  createActivity,
  deleteActivity,
  getAllActivities,
  getDashboard,
  updateActivity,
} from "./services/api";
const USER_ID = 1;
const emptyDashboard = {
  totalActivities: 0,
  averageScore: 0,
  currentStreakDays: 0,
  activitiesCompleted: 0,
  weeklyGoal: 0,
  progressPercent: 0,
};
function App() {
  // const [activities, setActivities] = useState([
  //   {
  //     id: 1,
  //     date: "2026-06-20",
  //     activity: "Running",
  //     duration: "60 mts",
  //     activityType: "cardio",
  //     score: 8,
  //     water: 2500,
  //     sleep: 7,
  //   },
  //   {
  //     id: 2,
  //     date: "2026-06-21",
  //     activity: "Walking",
  //     activityType: "cardio",
  //     duration: "30 mts",
  //     score: 7,
  //     water: 1800,
  //     sleep: 8,
  //   },
  //   {
  //     id: 3,
  //     date: "2026-06-22",
  //     activity: "Meditation",
  //     duration: "30 mts",
  //     activityType: "mindfulness",

  //     score: 7,
  //     water: 2000,
  //     sleep: 7,
  //   },
  // ]);
  const [activities, setActivities] = useState([]);
  const [weeklyGoal, setWeeklyGoal] = useState(4);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [activityToEdit, setActivityToEdit] = useState(null);
  const [dashboardSummary, setDashboardSummary] = useState(emptyDashboard);
  //auto clear message after 2.5 seconds
  useEffect(() => {
    if (!message) return;

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }, [message]);
  useEffect(() => {
    if (!isLoggedIn) return;

    const loadDashboardData = async () => {
      try {
        const [savedActivities, summary] = await Promise.all([
          getAllActivities(USER_ID),
          getDashboard(USER_ID),
        ]);
        setActivities(savedActivities);
        setDashboardSummary(summary);
      } catch (error) {
        setMessage(error.message);
      }
    };
    loadDashboardData();
    //loadActivities();
  }, [isLoggedIn]);
  // useEffect(() => {
  //   if (!isLoggedIn) return;

  //   const loadActivities = async () => {
  //     try {
  //       const savedActivities = await getAllActivities(USER_ID);
  //       setActivities(savedActivities);
  //     } catch (error) {
  //       setMessage(error.message);
  //     }
  //   };
  //   loadActivities();
  // }, [isLoggedIn]);
  // 2. event handler to manage add acitivity
  // const handleAddActivity = (newActivity) => {
  //   // add new activity with id
  //   const newActivityData = {
  //     ...newActivity,
  //     id: Date.now(), // generating dynamic id
  //     score: Math.floor(Math.random() * 6) + 5, // mock score generateor(5 to 10)
  //   };

  //   // update the state
  //   setActivities((prev) => [...prev, newActivityData]);
  //   setMessage("Activity added successfully");

  //   //alert("Activity Log Added!");
  // };

  const handleAddActivity = async (newActivity) => {
    try {
      const savedActivity = await createActivity(USER_ID, newActivity);
      const summary = await getDashboard(USER_ID);
      setActivities((previous) => [...previous, savedActivity]);
      setDashboardSummary(summary);
      setMessage("Activity added successfully");
    } catch (error) {
      setMessage(error.message);
      throw error;
    }
  };

  //3. delete activity handler
  // const handleDeleteActivity = (idToDelete) => {
  //   // filter activity that is not maching the id
  //   const updatedActivities = activities.filter(
  //     (activity) => activity.id !== idToDelete,
  //   );
  //   setActivities(updatedActivities);
  //   s

  const handleDeleteActivity = async (idToDelete) => {
    try {
      await deleteActivity(USER_ID, idToDelete);
      const summary = await getDashboard(USER_ID);
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

  const login = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  //update activity

  const handleUpdateActivity = async (updatedActivity) => {
    try {
      const savedActivity = await updateActivity(
        USER_ID,
        activityToEdit.id,
        updatedActivity,
      );
      const summary = await getDashboard(USER_ID);

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
          <Route
            path="my-plan"
            element={
              <MyPlanPage
                activities={activities}
                goal={weeklyGoal}
                onGoalChange={setWeeklyGoal}
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
