const API_URL = "http://localhost:8080/api/v1";

//ACTIVITIES

export async function getAllActivities(userId) {
  const response = await fetch(`${API_URL}/users/${userId}/activities`);
  if (!response.ok) throw new Error("Could not load activities");
  return response.json();
}

export async function createActivity(userId, activity) {
  const response = await fetch(`${API_URL}/users/${userId}/activities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(activity),
  });
  if (!response.ok) throw new Error("Could not add activity");
  return response.json();
}

export async function updateActivity(userId, activityId, activity) {
  const response = await fetch(
    `${API_URL}/users/${userId}/activities/${activityId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    },
  );
  if (!response.ok) throw new Error("Could not update activity");
  return response.json();
}

export async function deleteActivity(userId, activityId) {
  const response = await fetch(
    `${API_URL}/users/${userId}/activities/${activityId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) throw new Error("Could not delete activity");
}

///Goal

export async function getCurrentGoal(userId) {
  const response = await fetch(`${API_URL}/users/${userId}/goals/current`);
  if (!response.ok) throw new Error("Could not load weekly goal");
  return response.json();
}


export async function createGoal(userId, goal) {
  const response = await fetch(`${API_URL}/users/${userId}/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  if (!response.ok) throw new Error("Could not create weekly goal");
  return response.json();
}

export async function updateGoal(userId, goalId, goal) {
  const response = await fetch(
    `${API_URL}/users/${userId}/goals/${goalId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    },
  );
  if (!response.ok) throw new Error("Could not update weekly goal");
  return response.json();
}

//dashboard
export async function getDashboard(userId) {
  const response = await fetch(`${API_URL}/users/${userId}/dashboard`);
  if (!response.ok) throw new Error("Could not load dashboard");
  return response.json();
}
