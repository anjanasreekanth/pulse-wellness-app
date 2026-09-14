package com.example.pulse_api.activity;

import com.example.pulse_api.user.User;
import com.example.pulse_api.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/{userId}/activities")
@CrossOrigin(origins = "http://localhost:5173")
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
        activityLog.setScore(calculateScore(activityLog));
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
        existingActivity.setScore(calculateScore(existingActivity));

        return activityLogRepository.save(existingActivity);
    }

    @DeleteMapping("/{activityId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteActivity(@PathVariable Long userId,
                               @PathVariable Long activityId) {
        ActivityLog activityLog = findActivity(userId, activityId);
        activityLogRepository.delete(activityLog);
    }

    //replicate score calculation logic from UI
    private int calculateScore(ActivityLog activityLog){
        int durationPoints = 0;
        if(activityLog.getDurationMinutes() != null){
            int duration = Math.clamp(activityLog.getDurationMinutes(), 0, 60);
            durationPoints = (int) Math.round((duration / 60.0) * 4);
        }

        int waterPoints = 0;
        if(activityLog.getWaterMl() != null){
            int water = Math.clamp(activityLog.getWaterMl(), 0, 2000);
           waterPoints = (int) Math.round((water / 2000.0) * 3);
        }

        int sleepPoints = 0;
        if(activityLog.getSleepHours() != null){
            double sleep = activityLog.getSleepHours().doubleValue();
            if(sleep >= 7 && sleep <= 9) {
                sleepPoints = 3;
            }else if(sleep >= 6 && sleep <= 10){
                sleepPoints = 2;
            }else if(sleep > 0){
                sleepPoints = 1;
            }
        }

        return Math.min(durationPoints + waterPoints + sleepPoints , 10);

    }

}


