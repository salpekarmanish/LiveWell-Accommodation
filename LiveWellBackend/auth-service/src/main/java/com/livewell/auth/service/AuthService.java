package com.livewell.auth.service;

import com.livewell.auth.dto.LoginRequest;
import com.livewell.auth.dto.SignupRequest;
import com.livewell.auth.entity.Role;
import com.livewell.auth.entity.User;
import com.livewell.auth.exception.BadRequestException;
import com.livewell.auth.exception.ResourceNotFoundException;
import com.livewell.auth.exception.UnauthorizedException;
import com.livewell.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    
    @Transactional
    public User registerUser(SignupRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new BadRequestException("Phone number already registered");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setGender(request.getGender());
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setPincode(request.getPincode());
        user.setRole(request.getRole() != null ? Role.valueOf(request.getRole().toUpperCase()) : Role.USER);
        user.setEmailVerified(false);
        user.setNumberVerified(false);
        user.setVerified(false);
        
        User savedUser = userRepository.save(user);
        log.info("User registered successfully with ID: {}", savedUser.getId());
        return savedUser;
    }
    
    public User authenticateUser(LoginRequest request) {
        log.info("Authenticating user: {}", request.getEmail());
        
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }
        
        log.info("User authenticated successfully: {}", user.getEmail());
        return user;
    }
    
    @Transactional
    public void verifyEmailOtp(String email, String otp) {
        log.info("Verifying email OTP for: {}", email);
        
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        user.setEmailVerified(true);
        userRepository.save(user);
        log.info("Email verified successfully for: {}", email);
    }
    
    @Transactional
    public void verifyPhoneOtp(String phone, String otp) {
        log.info("Verifying phone OTP for: {}", phone);
        
        User user = userRepository.findByPhone(phone)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        user.setNumberVerified(true);
        userRepository.save(user);
        log.info("Phone verified successfully for: {}", phone);
    }
    
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    
    @Transactional
    public User updateUser(Long userId, User updatedData) {
        User user = getUserById(userId);
        
        if (updatedData.getFirstName() != null) user.setFirstName(updatedData.getFirstName());
        if (updatedData.getLastName() != null) user.setLastName(updatedData.getLastName());
        if (updatedData.getGender() != null) user.setGender(updatedData.getGender());
        if (updatedData.getAddress() != null) user.setAddress(updatedData.getAddress());
        if (updatedData.getCity() != null) user.setCity(updatedData.getCity());
        if (updatedData.getState() != null) user.setState(updatedData.getState());
        if (updatedData.getPincode() != null) user.setPincode(updatedData.getPincode());
        if (updatedData.getProfileImage() != null) user.setProfileImage(updatedData.getProfileImage());
        
        return userRepository.save(user);
    }
}
