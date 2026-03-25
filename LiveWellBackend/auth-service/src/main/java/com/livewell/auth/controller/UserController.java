package com.livewell.auth.controller;

import com.livewell.auth.dto.UserProfileDTO;
import com.livewell.auth.entity.User;
import com.livewell.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class UserController {
    
    private final AuthService authService;
    
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long userId,
            @RequestHeader(value = "X-User-Id", required = false) String requestUserId) {
        log.info("Get user request for userId: {}", userId);
        User user = authService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
    
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long userId,
            @RequestBody User updatedData,
            @RequestHeader(value = "X-User-Id") String requestUserId) {
        log.info("Update user request for userId: {}", userId);
        User user = authService.updateUser(userId, updatedData);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/profile/{userId}")
    public ResponseEntity<UserProfileDTO> getUserProfile(
            @PathVariable Long userId) {
        log.info("Get user profile request for userId: {}", userId);
        User user = authService.getUserById(userId);
        UserProfileDTO profile = new UserProfileDTO();
        profile.setUser(user);
        return ResponseEntity.ok(profile);
    }
}
