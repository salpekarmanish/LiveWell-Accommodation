package com.livewell.gateway.config;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Gateway Routes Configuration
 * Defines how requests are routed to microservices
 */
@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Auth Service Routes
                .route("auth-service", r -> r.path("/api/auth/**", "/api/users/**")
                        .uri("lb://auth-service"))
                
                // Property Service Routes
                .route("property-service", r -> r.path("/api/properties/**")
                        .uri("lb://property-service"))
                
                // Booking Service Routes
                .route("booking-service", r -> r.path("/api/bookings/**")
                        .uri("lb://booking-service"))
                
                // Communication Service Routes
                .route("communication-service", r -> r.path("/api/conversations/**", "/api/messages/**", "/api/notifications/**")
                        .uri("lb://communication-service"))
                
                // Support Service Routes
                .route("support-service", r -> r.path("/api/complaints/**", "/api/reviews/**")
                        .uri("lb://support-service"))
                
                // Admin Service Routes
                .route("admin-service", r -> r.path("/api/admin/**")
                        .uri("lb://admin-service"))
                
                // Payment Service Routes
                .route("payment-service", r -> r.path("/api/payments/**")
                        .uri("lb://payment-service"))
                
                // File Service Routes
                .route("file-service", r -> r.path("/api/files/**")
                        .uri("lb://file-service"))
                
                .build();
    }
}
