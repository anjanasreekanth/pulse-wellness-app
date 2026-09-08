const activitySuggestions = [
  {
    time: "short",
    energy: "low",
    activity: "Meditation",
    type: "mindfulness",
    duration: 10,
    inspiration:
      "A calm mind is a strong start. Take ten quiet minutes for yourself.",
  },
  {
    time: "short",
    energy: "medium",
    activity: "Walking",
    type: "Cardio",
    duration: 20,
    inspiration: "A short walk can refresh your body and clear your mind.",
  },
  {
    time: "short",
    energy: "high",
    activity: "Running",
    type: "Cardio",
    duration: 20,
    inspiration:
      "Use your energy and enjoy a quick run. Every step moves you forward.",
  },
  {
    time: "long",
    energy: "low",
    activity: "Walking",
    type: "mindfulness",
    duration: 40,
    inspiration:
      "Keep a comfortable pace. Consistency matters more than speed.",
  },
  {
    time: "long",
    energy: "medium",
    activity: "Walking",
    type: "Cardio",
    duration: 60,
    inspiration: "A longer walk is a simple way to care for your body today.",
  },
  {
    time: "long",
    energy: "high",
    activity: "Running",
    type: "Cardio",
    duration: 60,
    inspiration:
      "You have the time and energy. Challenge yourself and finish strong.",
  },
];
export const getActivitySuggestion = (time, energy) => {
  return activitySuggestions.find(
    (item) => item.time === time && item.energy === energy,
  );
};
