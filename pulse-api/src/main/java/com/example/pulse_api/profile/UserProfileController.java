package com.example.pulse_api.profile;

import com.example.pulse_api.user.User;
import com.example.pulse_api.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

@RestController
@RequestMapping("/api/v1/users/{userId}/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class UserProfileController {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    public UserProfileController(UserProfileRepository userProfileRepository, UserRepository userRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
    }

    private UserProfile findProfile(Long userId) {
        return userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"
                ));
    }

    @GetMapping
    public UserProfile getProfile(@PathVariable Long userId) {
        return findProfile(userId);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"
                ));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)

    public UserProfile createProfile(@PathVariable Long userId,
                                     @RequestBody UserProfile userProfile) {
        User user = findUser(userId);
        if (userProfileRepository.findByUserId(userId).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Profile exists"
            );
        }

        userProfile.setUser(user);
        return userProfileRepository.save(userProfile);
    }

    @PutMapping
    public UserProfile updateProfile(@PathVariable Long userId,
                                     @RequestBody UserProfile updatedProfile) {
        UserProfile existingProfile = findProfile(userId);
        existingProfile.setDateOfBirth(updatedProfile.getDateOfBirth());
        existingProfile.setHeightCm(updatedProfile.getHeightCm());
        existingProfile.setWeightKg(updatedProfile.getWeightKg());
        existingProfile.setPrimaryGoal(updatedProfile.getPrimaryGoal());
        existingProfile.setDailyWaterTargetMl(updatedProfile.getDailyWaterTargetMl());
        existingProfile.setSleepTargetHours(updatedProfile.getSleepTargetHours());
        existingProfile.setPreferredUnit(updatedProfile.getPreferredUnit());
        existingProfile.setActivityLevel(updatedProfile.getActivityLevel());
        existingProfile.setUpdatedAt(Instant.now());

        return userProfileRepository.save(existingProfile);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProfile(@PathVariable Long userId){
        UserProfile userProfile = findProfile(userId);
        userProfileRepository.delete(userProfile);
    }
}
