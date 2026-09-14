package com.example.pulse_api.dashboard;

import com.example.pulse_api.activity.ActivityLog;
import com.example.pulse_api.activity.ActivityLogRepository;
import com.example.pulse_api.goal.WeeklyGoal;
import com.example.pulse_api.goal.WeeklyGoalRepository;
import com.example.pulse_api.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users/{userId}/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {
    private final UserRepository userRepository;
    private final ActivityLogRepository activityLogRepository;
    private final WeeklyGoalRepository weeklyGoalRepository;

    public DashboardController(UserRepository userRepository, ActivityLogRepository activityLogRepository, WeeklyGoalRepository weeklyGoalRepository) {
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
        this.weeklyGoalRepository = weeklyGoalRepository;
    }

    //return average activity score rounded to 1 decimal place
    private double calculateAverageScore(List<ActivityLog> activities) {
        if (activities.isEmpty()) {

            return 0;
        }

        int totalScore = 0;
        for (ActivityLog activity : activities) {
            if (activity.getScore() != null) {
                totalScore += activity.getScore();
            }
        }

        double average = (double) totalScore / activities.size();
        return Math.round(average * 10.0) / 10.0;
    }

    //count activities from Monday to Sunday for the selected week
    private int countWeeklyActivities(List<ActivityLog> activities, LocalDate weekStart) {
        LocalDate weekEnd = weekStart.plusDays(6);
        int count = 0;
        for (ActivityLog activity : activities) {
            LocalDate date = activity.getActivityDate();
            if (date != null && !date.isBefore(weekStart) && !date.isAfter(weekEnd)) {
                count++;
            }
        }

        return count;
    }

    //Count unique activity date , starting with today or yesterday
    private int calculateStreak(List<ActivityLog> activities) {
        List<LocalDate> activityDates = new ArrayList<>();
        //Multiple activities on the same day treated as 1 streak day
        for (ActivityLog activity : activities) {
            LocalDate date = activity.getActivityDate();
            if (date != null && !activityDates.contains(date)) {
                activityDates.add(date);
            }
        }

        if (activityDates.isEmpty()) {
            return 0;
        }

        activityDates.sort(Collections.reverseOrder());

        LocalDate latestDate = activityDates.getFirst();

        if (latestDate.isBefore(LocalDate.now().minusDays(1))) {
            return 0;
        }

        int streak = 0;
        LocalDate expectedDate = activityDates.getFirst();
        for (LocalDate activityDate : activityDates) {
            if (!activityDate.equals(expectedDate)) {
                break;
            }
            streak++;
            expectedDate = expectedDate.minusDays(1);
        }
        return streak;


    }

    @GetMapping
    public DashboardSummary getDashboard(@PathVariable Long userId,
                                         @RequestParam(required = false) LocalDate weekStart) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        }

        if (weekStart == null) {
            weekStart = LocalDate.now()
                    .with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        }

        List<ActivityLog> activities = activityLogRepository.findByUserId(userId);
        int totalActivities = activities.size();
        double averageScore = calculateAverageScore(activities);
        int currentStreakDays = calculateStreak(activities);
        int activitiesCompleted = countWeeklyActivities(activities, weekStart);

        int weeklyGoal = weeklyGoalRepository.findByUserIdAndWeekStart(userId, weekStart)
                .map(WeeklyGoal::getTargetActivities)
                .orElse(0);

        int progressPercent = 0;
        if (weeklyGoal > 0) {
            progressPercent = Math.min((activitiesCompleted * 100) / weeklyGoal, 100);


        }

        return new DashboardSummary(totalActivities, averageScore, currentStreakDays,
                activitiesCompleted, weeklyGoal, progressPercent);

    }
}
