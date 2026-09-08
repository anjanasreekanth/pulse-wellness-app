const resources = [
  {
    activity: "Walking",
    type: "Video",
    title: "Walking for Better Health",
    description: "watch tips for making walking your part",
    link: "https://www.youtube.com/results?search_query=NHS+walking+for+health",
  },
  {
    activity: "Walking",
    type: "Guide",
    title: "Walking for Health",
    description: "Read beginner advice about the benefits of regular walking.",
    link: "https://www.nhs.uk/live-well/exercise/walking-for-health/",
  },
  {
    activity: "Walking",
    type: "Tips",
    title: "Start a Walking Routine",
    description: "Learn how to start slowly and build a regular routine.",
    link: "https://www.cdc.gov/healthy-weight-growth/physical-activity/getting-started.html",
  },
  //running
  {
    activity: "Running",
    type: "Video",
    title: "Running for Beginners",
    description: "Find beginner videos about pace, warm-ups, and safe running.",
    link: "https://www.youtube.com/results?search_query=NHS+couch+to+5k+beginner",
  },
  {
    activity: "Running",
    type: "Plan",
    title: "Couch to 5k",
    description: "Follow a simple nine-week running plan for beginners.",
    link: "https://www.nhs.uk/live-well/exercise/get-running-with-couch-to-5k/",
  },

  {
    activity: "Running",
    type: "Guide",
    title: "Activity Basics",
    description: "Review useful guidance for building an active lifestyle.",
    link: "https://www.cdc.gov/physical-activity/php/about/index.html",
  },
  //meditation
  {
    activity: "Meditation",
    type: "Audio",
    title: "Guided Meditations",
    description: "Choose a short guided mindfulness practice from UCLA.",
    link: "https://www.uclahealth.org/programs/marc/free-guided-meditations/guided-meditations",
  },
  {
    activity: "Meditation",
    type: "Video",
    title: "10-Minute Meditation",
    description: "Find a short guided meditation for a calm daily reset.",
    link: "https://www.youtube.com/results?search_query=UCLA+Mindful+10+minute+meditation",
  },
  {
    activity: "Meditation",
    type: "Guide",
    title: "Mindful Basics",
    description: "Learn what minfulness is and how to begin practicing.",
    link: "https://www.nhs.uk/mental-health/self-help/tips-and-support/mindfulness/",
  },
];

export const getInspirationResources = (activity) => {
  return resources.filter((resource) => resource.activity === activity);
};
