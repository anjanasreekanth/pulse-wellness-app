package com.example.pulse_api.activity;

import com.example.pulse_api.user.User;
import com.example.pulse_api.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/{userId}/activities")

public class ActivityLogController {
    private final ActivityLogRepository activityLogRepository;
    private final UserRepository userRepository;


    public ActivityLogController(ActivityLogRepository activityLogRepository,
                                 UserRepository userRepository) {
        this.activityLogRepository = activityLogRepository;
        this.userRepository = userRepository;
    }

    private void checkUserExists(Long userId) {
        if (!userRepository.existsById(userId)) {

            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found");
        }
    }

    @GetMapping
    public List<ActivityLog> getAllActivities(@PathVariable Long userId) {
        checkUserExists(userId);
        return activityLogRepository.findByUserId(userId);
    }

    private ActivityLog findActivity(Long userId, Long activityId) {
        ActivityLog activityLog = activityLogRepository.findById(activityId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Activity not found"));
        if (!activityLog.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Activity Not found");
        }
        return activityLog;

    }

    @GetMapping("/{activityId}")
    public ActivityLog getActivityById(@PathVariable Long userId, @PathVariable Long activityId) {
        return findActivity(userId, activityId);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"
                ));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ActivityLog createActivity(@PathVariable Long userId, @RequestBody ActivityLog activityLog) {
        User user = findUser(userId);
        activityLog.setUser(user);
        return activityLogRepository.save(activityLog);
    }

    @PutMapping("/{activityId}")
    public ActivityLog updateActivity(@PathVariable Long userId,
                                      @PathVariable Long activityId,
                                      @RequestBody ActivityLog updatedActivity) {
        ActivityLog existingActivity = findActivity(userId, activityId);
        existingActivity.setActivityDate(updatedActivity.getActivityDate());
        existingActivity.setActivityName(updatedActivity.getActivityName());
        existingActivity.setActivityDate(updatedActivity.getActivityDate());
        existingActivity.setDurationMinutes(updatedActivity.getDurationMinutes());
        existingActivity.setWaterMl(updatedActivity.getWaterMl());
        existingActivity.setSleepHours(updatedActivity.getSleepHours());
        existingActivity.setScore(updatedActivity.getScore());

        return activityLogRepository.save(existingActivity);
    }

    @DeleteMapping("/{activityId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteActivity(@PathVariable Long userId,
                               @PathVariable Long activityId) {
        ActivityLog activityLog = findActivity(userId, activityId);
        activityLogRepository.delete(activityLog);
    }

}


