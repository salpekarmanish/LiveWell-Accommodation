package com.livewell.auth.dto;

import com.livewell.auth.entity.User;
import lombok.Data;

@Data
public class UserProfileDTO {
    private User user;
    private Object additionalData; // For flats or bookings from other services
}
