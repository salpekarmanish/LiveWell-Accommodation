# LiveWell Microservices - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose installed
- Java 17 or higher
- Maven 3.8+
- 8GB+ RAM recommended

### Port Allocation
| Service | Port | Purpose |
|---------|------|---------|
| **API Gateway** | 8080 | Main entry point for all requests |
| **Eureka Server** | 8761 | Service discovery dashboard |
| **Auth Service** | 8081 | Authentication & user management |
| **Property Service** | 8082 | Property management |
| **Booking Service** | 8083 | Booking operations |
| **Communication Service** | 8084 | Chat & notifications |
| **Support Service** | 8085 | Reviews & complaints |
| **Admin Service** | 8086 | Admin operations |
| **Payment Service** | 8087 | Payment processing |
| **File Service** | 8088 | File uploads |
| **MySQL** | 3306 | Database |
| **RabbitMQ** | 5672 | Message broker |
| **RabbitMQ UI** | 15672 | Management interface |
| **Redis** | 6379 | Cache |

---

## 📦 Microservices Structure

```
microservices/
├── README.md
├── docker-compose.yml
├── scripts/
│   └── init-databases.sql
│
├── eureka-server/              # Service Discovery (Port: 8761)
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── api-gateway/                # API Gateway (Port: 8080)
│   ├── src/
│   │   └── main/
│   │       └── java/com/livewell/gateway/
│   │           ├── ApiGatewayApplication.java
│   │           ├── config/
│   │           │   └── GatewayConfig.java
│   │           └── filter/
│   │               └── JwtAuthenticationFilter.java
│   ├── pom.xml
│   └── Dockerfile
│
├── auth-service/               # Authentication Service (Port: 8081)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/livewell/auth/
│   │       │   ├── AuthServiceApplication.java
│   │       │   ├── controller/
│   │       │   │   ├── AuthController.java
│   │       │   │   └── UserController.java
│   │       │   ├── service/
│   │       │   │   ├── AuthService.java
│   │       │   │   ├── UserService.java
│   │       │   │   └── JwtService.java
│   │       │   ├── repository/
│   │       │   │   └── UserRepository.java
│   │       │   ├── entity/
│   │       │   │   └── User.java
│   │       │   ├── dto/
│   │       │   │   ├── LoginRequest.java
│   │       │   │   ├── SignupRequest.java
│   │       │   │   └── AuthResponse.java
│   │       │   ├── security/
│   │       │   │   └── SecurityConfig.java
│   │       │   └── config/
│   │       │       └── RabbitMQConfig.java
│   │       └── resources/
│   │           ├── application.properties
│   │           └── application-docker.properties
│   ├── pom.xml
│   └── Dockerfile
│
├── property-service/           # Property Service (Port: 8082)
│   ├── src/
│   │   └── main/
│   │       └── java/com/livewell/property/
│   │           ├── PropertyServiceApplication.java
│   │           ├── controller/
│   │           │   └── PropertyController.java
│   │           ├── service/
│   │           │   └── PropertyService.java
│   │           ├── repository/
│   │           │   └── PropertyRepository.java
│   │           ├── entity/
│   │           │   └── Property.java
│   │           └── client/
│   │               ├── AuthServiceClient.java
│   │               └── FileServiceClient.java
│   ├── pom.xml
│   └── Dockerfile
│
├── booking-service/            # Booking Service (Port: 8083)
│   ├── src/
│   │   └── main/
│   │       └── java/com/livewell/booking/
│   │           ├── BookingServiceApplication.java
│   │           ├── controller/
│   │           │   └── BookingController.java
│   │           ├── service/
│   │           │   └── BookingService.java
│   │           ├── repository/
│   │           │   └── BookingRepository.java
│   │           ├── entity/
│   │           │   └── Booking.java
│   │           ├── client/
│   │           │   ├── PropertyServiceClient.java
│   │           │   └── PaymentServiceClient.java
│   │           └── event/
│   │               ├── BookingCreatedEvent.java
│   │               └── BookingCancelledEvent.java
│   ├── pom.xml
│   └── Dockerfile
│
├── communication-service/      # Chat & Notifications (Port: 8084)
│   ├── src/
│   │   └── main/
│   │       └── java/com/livewell/communication/
│   │           ├── CommunicationServiceApplication.java
│   │           ├── controller/
│   │           │   ├── ChatController.java
│   │           │   └── NotificationController.java
│   │           ├── service/
│   │           │   ├── ChatService.java
│   │           │   └── NotificationService.java
│   │           ├── repository/
│   │           │   ├── ConversationRepository.java
│   │           │   ├── MessageRepository.java
│   │           │   └── NotificationRepository.java
│   │           ├── entity/
│   │           │   ├── Conversation.java
│   │           │   ├── Message.java
│   │           │   └── Notification.java
│   │           └── websocket/
│   │               └── WebSocketConfig.java
│   ├── pom.xml
│   └── Dockerfile
│
├── support-service/            # Reviews & Complaints (Port: 8085)
│   ├── src/
│   │   └── main/
│   │       └── java/com/livewell/support/
│   │           ├── SupportServiceApplication.java
│   │           ├── controller/
│   │           │   ├── ReviewController.java
│   │           │   └── ComplaintController.java
│   │           ├── service/
│   │           │   ├── ReviewService.java
│   │           │   └── ComplaintService.java
│   │           ├── repository/
│   │           │   ├── ReviewRepository.java
│   │           │   └── ComplaintRepository.java
│   │           └── entity/
│   │               ├── Review.java
│   │               └── Complaint.java
│   ├── pom.xml
│   └── Dockerfile
│
├── admin-service/              # Admin Operations (Port: 8086)
│   ├── src/
│   │   └── main/
│   │       └── java/com/livewell/admin/
│   │           ├── AdminServiceApplication.java
│   │           ├── controller/
│   │           │   └── AdminController.java
│   │           ├── service/
│   │           │   └── AdminService.java
│   │           └── client/
│   │               ├── AuthServiceClient.java
│   │               ├── PropertyServiceClient.java
│   │               └── BookingServiceClient.java
│   ├── pom.xml
│   └── Dockerfile
│
├── payment-service/            # Payment Processing (Port: 8087)
│   ├── src/
│   │   └── main/
│   │       └── java/com/livewell/payment/
│   │           ├── PaymentServiceApplication.java
│   │           ├── controller/
│   │           │   └── PaymentController.java
│   │           ├── service/
│   │           │   └── PaymentService.java
│   │           └── config/
│   │               └── RazorpayConfig.java
│   ├── pom.xml
│   └── Dockerfile
│
└── file-service/               # File Management (Port: 8088)
    ├── src/
    │   └── main/
    │       └── java/com/livewell/file/
    │           ├── FileServiceApplication.java
    │           ├── controller/
    │           │   └── FileController.java
    │           └── service/
    │               └── FileStorageService.java
    ├── pom.xml
    └── Dockerfile
```

---

## 🔧 Build & Run

### Option 1: Docker Compose (Recommended for Development)

```bash
# Navigate to microservices directory
cd microservices

# Build all services
mvn clean package -DskipTests

# Start all services with Docker Compose
docker-compose up --build

# Or run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Option 2: Run Individual Services Locally

```bash
# Start infrastructure first
docker-compose up mysql rabbitmq redis eureka-server -d

# Then start services one by one
cd auth-service
mvn spring-boot:run

# In separate terminals
cd property-service
mvn spring-boot:run

cd booking-service
mvn spring-boot:run

# ... and so on
```

---

## 🧪 Testing the Services

### 1. Check Service Discovery
```
Open browser: http://localhost:8761
You should see all registered services
```

### 2. Test User Registration (via API Gateway)
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "role": "USER"
  }'
```

### 3. Test User Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Test Property Creation (requires JWT token)
```bash
curl -X POST http://localhost:8080/api/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Modern PG",
    "type": "PG",
    "city": "Bangalore",
    "cost": 8000,
    "availableRooms": 5
  }'
```

---

## 📊 Monitoring & Management

### Service Health Checks
```bash
# Check all services health
curl http://localhost:8080/actuator/health
curl http://localhost:8081/actuator/health
curl http://localhost:8082/actuator/health
# ... for each service
```

### RabbitMQ Management
```
URL: http://localhost:15672
Username: admin
Password: admin
```

### Eureka Dashboard
```
URL: http://localhost:8761
```

---

## 🔄 Inter-Service Communication Patterns

### 1. Synchronous (REST with RestTemplate/WebClient)
```java
// In Booking Service calling Property Service
@LoadBalanced
@Bean
public WebClient.Builder webClientBuilder() {
    return WebClient.builder();
}

PropertyResponse property = webClient
    .get()
    .uri("http://property-service/api/properties/{id}", propertyId)
    .retrieve()
    .bodyToMono(PropertyResponse.class)
    .block();
```

### 2. Asynchronous (RabbitMQ Events)
```java
// In Booking Service - Publish Event
rabbitTemplate.convertAndSend(
    "booking-exchange",
    "booking.created",
    new BookingCreatedEvent(booking)
);

// In Email Service - Listen to Event
@RabbitListener(queues = "email-queue")
public void handleBookingCreated(BookingCreatedEvent event) {
    emailService.sendBookingConfirmation(event);
}
```

---

## 📝 Configuration Management

### Shared Configuration (application.properties)
Each service has:
- `application.properties` - Default config
- `application-docker.properties` - Docker environment config
- Environment variables override both

### Example: Auth Service application-docker.properties
```properties
spring.application.name=auth-service
server.port=8081

# Database
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}

# Eureka
eureka.client.service-url.defaultZone=${EUREKA_CLIENT_SERVICEURL_DEFAULTZONE}

# RabbitMQ
spring.rabbitmq.host=${SPRING_RABBITMQ_HOST}
spring.rabbitmq.port=${SPRING_RABBITMQ_PORT}

# JWT
jwt.secret=${JWT_SECRET}
```

---

## 🔐 Security

### JWT Token Flow
```
1. User → POST /api/auth/login → Auth Service
2. Auth Service → Validate credentials → Generate JWT
3. Client → Request with JWT → API Gateway
4. API Gateway → Validate JWT → Add user context headers
5. Target Service → Read user context from headers → Process request
```

### User Context Headers (added by API Gateway)
- `X-User-Id`
- `X-User-Email`
- `X-User-Role`

---

## 🚨 Troubleshooting

### Services not registering with Eureka
```bash
# Check Eureka is running
docker-compose ps eureka-server

# Check service logs
docker-compose logs auth-service

# Verify network connectivity
docker-compose exec auth-service ping eureka-server
```

### Database connection issues
```bash
# Check MySQL is running
docker-compose ps mysql

# Verify databases are created
docker-compose exec mysql mysql -u root -p -e "SHOW DATABASES;"

# Check connection from service
docker-compose logs auth-service | grep -i "database\|mysql"
```

### RabbitMQ connection issues
```bash
# Check RabbitMQ status
docker-compose ps rabbitmq

# View RabbitMQ logs
docker-compose logs rabbitmq

# Access RabbitMQ management UI
http://localhost:15672
```

---

## 📈 Scaling Services

### Scale a specific service
```bash
# Scale property-service to 3 instances
docker-compose up -d --scale property-service=3

# API Gateway will automatically load balance
```

---

## 🎯 Next Steps

1. ✅ Infrastructure services created (Eureka, API Gateway)
2. ⏳ Create all 8 microservices with complete code
3. ⏳ Implement inter-service communication
4. ⏳ Add distributed tracing (Sleuth + Zipkin)
5. ⏳ Add circuit breakers (Resilience4j)
6. ⏳ Set up monitoring (Prometheus + Grafana)
7. ⏳ Create Kubernetes manifests
8. ⏳ Set up CI/CD pipeline

---

## 📚 Additional Resources

- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Netflix Eureka](https://github.com/Netflix/eureka)
- [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)
- [Docker Compose](https://docs.docker.com/compose/)

---

**Version:** 1.0.0  
**Last Updated:** February 12, 2026  
**Architecture:** Microservices with Event-Driven Communication
