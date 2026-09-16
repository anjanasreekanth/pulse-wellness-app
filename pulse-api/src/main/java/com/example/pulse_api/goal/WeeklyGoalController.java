package com.example.pulse_api.goal;

import com.example.pulse_api.user.User;
import com.example.pulse_api.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

@RestController
@RequestMapping("/api/v1/users/{userId}/goals")
@CrossOrigin(origins = "http://localhost:5173")

public class WeeklyGoalController {
    private final WeeklyGoalRepository weeklyGoalRepository;
    private final UserRepository userRepository;

    public WeeklyGoalController(WeeklyGoalRepository weeklyGoalRepository,
                                UserRepository userRepository) {
        this.weeklyGoalRepository = weeklyGoalRepository;
        this.userRepository = userRepository;

    }

    //Weekly goal using Monday as the first day of the week
    @GetMapping("/current")
    public WeeklyGoal getCurrentGoal(@PathVariable Long userId) {

        LocalDate currentWeekStart = LocalDate.now()
                .with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));


        return weeklyGoalRepository.findByUserIdAndWeekStart(userId, currentWeekStart)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "weekly goal not found"));
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"
                ));
    }
    //Weekly goal using Monday as the first day of the week

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WeeklyGoal createGoal(@PathVariable Long userId,
                                 @RequestBody WeeklyGoal weeklyGoal) {
        User user = findUser(userId);
        LocalDate currentWeekStart = LocalDate.now()
                .with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        weeklyGoal.setUser(user);
        weeklyGoal.setWeekStart(currentWeekStart);
        return weeklyGoalRepository.save(weeklyGoal);
    }

    private WeeklyGoal findGoal(Long userId, Long goalId) {
        WeeklyGoal weeklyGoal = weeklyGoalRepository.findById(goalId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Weekly Goal not found"
                ));
        if (!weeklyGoal.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Weekly goal not found");
        }
        return weeklyGoal;
    }

    @PutMapping("/{goalId}")
    public WeeklyGoal updateGoal(@PathVariable Long userId,
                                 @PathVariable Long goalId,
                                 @RequestBody WeeklyGoal updatedGoal) {
        WeeklyGoal existingGoal = findGoal(userId, goalId);
        existingGoal.setTargetActivities(updatedGoal.getTargetActivities());
        return weeklyGoalRepository.save(existingGoal);
    }


}
