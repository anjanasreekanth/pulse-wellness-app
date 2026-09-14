package com.example.pulse_api.profile;

import com.example.pulse_api.user.User;
import com.example.pulse_api.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.attribute.UserPrincipal;

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

    private UserProfile findProfile(Long userId){
        return userProfileRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"
                ));
    }
    @GetMapping
    public UserProfile getProfile(@PathVariable Long userId){
        return findProfile(userId);
    }



}
