package com.example.pulse_api.dashboard;

public class DashboardSummary {
    private int totalActivities;
    private double averageScore;
    private int currentStreakDays;
    private int activitiesCompleted;
    private int weeklyGoal;
    private int progressPercent;

    public DashboardSummary(int totalActivities, double averageScore, int currentStreakDays, int activitiesCompleted, int weeklyGoal, int progressPercent) {
        this.totalActivities = totalActivities;
        this.averageScore = averageScore;
        this.currentStreakDays = currentStreakDays;
        this.activitiesCompleted = activitiesCompleted;
        this.weeklyGoal = weeklyGoal;
        this.progressPercent = progressPercent;
    }

    public int getTotalActivities() {
        return totalActivities;
    }

    public void setTotalActivities(int totalActivities) {
        this.totalActivities = totalActivities;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public int getCurrentStreakDays() {
        return currentStreakDays;
    }

    public void setCurrentStreakDays(int currentStreakDays) {
        this.currentStreakDays = currentStreakDays;
    }

    public int getActivitiesCompleted() {
        return activitiesCompleted;
    }

    public void setActivitiesCompleted(int activitiesCompleted) {
        this.activitiesCompleted = activitiesCompleted;
    }

    public int getWeeklyGoal() {
        return weeklyGoal;
    }

    public void setWeeklyGoal(int weeklyGoal) {
        this.weeklyGoal = weeklyGoal;
    }

    public int getProgressPercent() {
        return progressPercent;
    }

    public void setProgressPercent(int progressPercent) {
        this.progressPercent = progressPercent;
    }
}
