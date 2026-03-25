package com.livewell.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {
    
    private Long id;
    private Long ownerId;
    private String ownerEmail;
    private String ownerName;
    private String title;
    private Double rentPerMonth;
    private Double securityDeposit;
    private Double maintenanceCharges;
    private Boolean isAvailable;
}
