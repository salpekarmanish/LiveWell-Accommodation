package com.livewell.auth.controller;

import com.livewell.auth.dto.AuthResponse;
import com.livewell.auth.dto.LoginRequest;
import com.livewell.auth.dto.SignupRequest;
import com.livewell.auth.entity.User;
import com.livewell.auth.service.AuthService;
import com.livewell.auth.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;
    private final JwtService jwtService;
    
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        log.info("Signup request received for email: {}", request.getEmail());
        
        User user = authService.registerUser(request);
        String token = jwtService.generateToken(
                user.getEmail(),
                user.getId().toString(),
                user.getRole().name()
        );
        
        AuthResponse response = new AuthResponse(
                token,
                user.getId().toString(),
                user.getEmail(),
                user.getRole().name(),
                "User registered successfully"
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Login request received for email: {}", request.getEmail());
        
        User user = authService.authenticateUser(request);
        String token = jwtService.generateToken(
                user.getEmail(),
                user.getId().toString(),
                user.getRole().name()
        );
        
        AuthResponse response = new AuthResponse(
                token,
                user.getId().toString(),
                user.getEmail(),
                user.getRole().name()
        );
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(
            @RequestParam String email,
            @RequestParam String otp) {
        authService.verifyEmailOtp(email, otp);
        return ResponseEntity.ok("Email verified successfully");
    }
    
    @PostMapping("/verify-phone")
    public ResponseEntity<String> verifyPhone(
            @RequestParam String phone,
            @RequestParam String otp) {
        authService.verifyPhoneOtp(phone, otp);
        return ResponseEntity.ok("Phone verified successfully");
    }
}
