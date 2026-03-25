# LiveWell Microservices Architecture

## 🏗️ Architecture Overview

This document describes the microservices architecture for the LiveWell Property Management System. The monolithic application has been decomposed into 8 independent microservices.

```
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY (8080)                       │
│                    Spring Cloud Gateway                         │
│              Routes, Load Balancing, Authentication             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
        ┌────────────────────────────────────────────┐
        │    SERVICE DISCOVERY (8761)                │
        │    Eureka Server - Service Registry        │
        └────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                      MICROSERVICES LAYER                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Auth Service    │  │ Property Service│  │ Booking Service │ │
│  │ Port: 8081      │  │ Port: 8082      │  │ Port: 8083      │ │
│  │ DB: livewell_auth│ │ DB: livewell_prop│ │ DB: livewell_book│ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Communication   │  │ Support Service │  │ Admin Service   │ │
│  │ Service         │  │ Port: 8085      │  │ Port: 8086      │ │
│  │ Port: 8084      │  │ DB: livewell_sup │  │ DB: livewell_adm │ │
│  │ DB: livewell_comm│ └─────────────────┘  └─────────────────┘ │
│  └─────────────────┘                                            │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │ Payment Service │  │ File Service    │                      │
│  │ Port: 8087      │  │ Port: 8088      │                      │
│  └─────────────────┘  └─────────────────┘                      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                      MESSAGE BROKER (Optional)                   │
│                    RabbitMQ / Apache Kafka                       │
│               For Async Communication & Events                   │
└──────────────────────────────────────────────────────────────────┘
```

## 📦 Microservices Breakdown

### 1. **Auth Service** (Port: 8081)
**Responsibilities:**
- User authentication & authorization
- User registration & profile management
- JWT token generation & validation
- OTP verification (Email & Phone)
- Password reset

**Database:** `livewell_auth`

**Tables:**
- users
- user_sessions
- otp_verifications

**APIs:**
- POST `/api/auth/signup`
- POST `/api/auth/login`
- POST `/api/auth/verify-email`
- POST `/api/auth/verify-phone`
- GET `/api/users/{userId}`
- PUT `/api/users/{userId}`

**Inter-Service Communication:**
- → Email Service (send verification emails)
- → Notification Service (send notifications)
- → Firebase Service (OTP verification)

---

### 2. **Property Service** (Port: 8082)
**Responsibilities:**
- Property CRUD operations
- Property search & filtering
- Media management (images, videos, 360° views)
- Property availability management
- Rating & review aggregation

**Database:** `livewell_property`

**Tables:**
- properties
- property_media
- property_amenities
- property_features

**APIs:**
- POST `/api/properties`
- GET `/api/properties/{id}`
- GET `/api/properties/search`
- PUT `/api/properties/{id}`
- DELETE `/api/properties/{id}`
- POST `/api/properties/{id}/media`

**Inter-Service Communication:**
- → Auth Service (verify owner)
- → File Service (upload media)
- → Notification Service (notify admin)
- ← Booking Service (update availability)
- ← Review Service (update ratings)

---

### 3. **Booking Service** (Port: 8083)
**Responsibilities:**
- Booking creation & management
- Booking cancellation
- Payment integration
- Booking history
- Availability coordination

**Database:** `livewell_booking`

**Tables:**
- bookings
- payment_history
- booking_payments

**APIs:**
- POST `/api/bookings`
- GET `/api/bookings/{id}`
- GET `/api/bookings/user/{userId}`
- GET `/api/bookings/owner/{ownerId}`
- DELETE `/api/bookings/{id}/cancel`
- POST `/api/bookings/{id}/payment`

**Inter-Service Communication:**
- → Property Service (check availability, update rooms)
- → Payment Service (process payments, refunds)
- → Email Service (send confirmations)
- → Notification Service (notify users & owners)
- → Auth Service (verify users)

---

### 4. **Communication Service** (Port: 8084)
**Responsibilities:**
- Real-time chat between users & owners
- In-app notifications
- WebSocket management
- Message persistence
- Notification delivery

**Database:** `livewell_communication`

**Tables:**
- conversations
- messages
- notifications

**APIs:**
- POST `/api/conversations`
- GET `/api/conversations/{userId}`
- GET `/api/messages/{conversationId}`
- POST `/api/messages`
- WS `/ws/chat`
- GET `/api/notifications/{userId}`
- PUT `/api/notifications/{id}/read`

**Inter-Service Communication:**
- → Auth Service (verify users)
- → Property Service (get property details)

---

### 5. **Support Service** (Port: 8085)
**Responsibilities:**
- Complaint management
- Review & rating management
- Complaint status tracking
- Review validation

**Database:** `livewell_support`

**Tables:**
- complaints
- reviews
- complaint_history

**APIs:**
- POST `/api/complaints`
- GET `/api/complaints/user/{userId}`
- GET `/api/complaints/owner/{ownerId}`
- PUT `/api/complaints/{id}/status`
- POST `/api/reviews`
- GET `/api/reviews/property/{propertyId}`

**Inter-Service Communication:**
- → Property Service (verify property ownership, update ratings)
- → Auth Service (verify users)
- → Booking Service (verify user has booked)
- → Email Service (send notifications)
- → Notification Service (notify owners & users)

---

### 6. **Admin Service** (Port: 8086)
**Responsibilities:**
- User verification
- System analytics
- Dashboard statistics
- User management
- System monitoring

**Database:** `livewell_admin` (or shares Auth DB)

**APIs:**
- GET `/api/admin/users`
- PUT `/api/admin/users/{id}/verify`
- GET `/api/admin/statistics`
- GET `/api/admin/analytics/cities`
- GET `/api/admin/analytics/growth`

**Inter-Service Communication:**
- → Auth Service (update user verification)
- → Property Service (get property stats)
- → Booking Service (get booking stats)
- → Email Service (send verification emails)
- → Notification Service (notify users)

---

### 7. **Payment Service** (Port: 8087)
**Responsibilities:**
- Payment processing (Razorpay)
- Order creation
- Payment verification
- Refund processing
- Transaction management

**Database:** None (Stateless - queries Razorpay)

**APIs:**
- POST `/api/payments/orders`
- POST `/api/payments/verify`
- POST `/api/payments/refund`
- GET `/api/payments/{paymentId}`

**Inter-Service Communication:**
- External: Razorpay API
- ← Booking Service (payment requests)

---

### 8. **File Service** (Port: 8088)
**Responsibilities:**
- File upload & storage
- File deletion
- File serving
- File type & size validation
- Media optimization (optional)

**Database:** None (File system or S3)

**Storage:**
- Local: `./uploads`
- Cloud: AWS S3 / Azure Blob (configurable)

**APIs:**
- POST `/api/files/upload`
- DELETE `/api/files/{filePath}`
- GET `/api/files/{filePath}`
- POST `/api/files/upload/multiple`

**Inter-Service Communication:**
- ← Property Service (property media)
- ← Auth Service (profile images, documents)

---

## 🔧 Infrastructure Services

### 9. **API Gateway** (Port: 8080)
**Technology:** Spring Cloud Gateway

**Responsibilities:**
- Route incoming requests to microservices
- Load balancing
- Authentication & authorization (JWT validation)
- Rate limiting
- CORS configuration
- Request/response transformation

**Routes:**
```yaml
/api/auth/** → auth-service
/api/users/** → auth-service
/api/properties/** → property-service
/api/bookings/** → booking-service
/api/conversations/** → communication-service
/api/messages/** → communication-service
/api/notifications/** → communication-service
/api/complaints/** → support-service
/api/reviews/** → support-service
/api/admin/** → admin-service
/api/payments/** → payment-service
/api/files/** → file-service
```

---

### 10. **Service Discovery** (Port: 8761)
**Technology:** Netflix Eureka Server

**Responsibilities:**
- Service registration
- Service discovery
- Health checks
- Load balancing information

**Dashboard:** http://localhost:8761

---

### 11. **Config Server** (Port: 8888) [Optional]
**Technology:** Spring Cloud Config

**Responsibilities:**
- Centralized configuration management
- Environment-specific configs
- Dynamic configuration updates

---

### 12. **Email Service** (Shared Utility)
**Deployment:** Can be part of Communication Service or standalone

**Responsibilities:**
- Send transactional emails
- Email templates
- Async email delivery
- Email queue management

---

## 🗄️ Database Strategy

### Option 1: Database per Service (Recommended)
```
livewell_auth          (Auth Service)
livewell_property      (Property Service)
livewell_booking       (Booking Service)
livewell_communication (Communication Service)
livewell_support       (Support Service)
livewell_admin         (Admin Service)
```

### Option 2: Shared Database with Schema Separation
```
livewell (single database)
  ├── auth_schema
  ├── property_schema
  ├── booking_schema
  ├── communication_schema
  ├── support_schema
  └── admin_schema
```

---

## 🔄 Inter-Service Communication

### 1. **Synchronous (REST/HTTP)**
- Using RestTemplate or WebClient
- Service-to-service direct calls
- Use for immediate responses

**Example:**
```java
// In Booking Service
PropertyResponse property = webClient
    .get()
    .uri("http://property-service/api/properties/{id}", propertyId)
    .retrieve()
    .bodyToMono(PropertyResponse.class)
    .block();
```

### 2. **Asynchronous (Message Queue)** [Recommended]
- RabbitMQ or Apache Kafka
- Event-driven architecture
- Use for notifications, emails, logs

**Events:**
- `UserRegisteredEvent`
- `BookingCreatedEvent`
- `BookingCancelledEvent`
- `ReviewSubmittedEvent`
- `ComplaintRaisedEvent`
- `PropertyCreatedEvent`

**Example:**
```java
// In Booking Service
rabbitTemplate.convertAndSend(
    "booking-exchange",
    "booking.created",
    new BookingCreatedEvent(booking)
);

// In Email Service
@RabbitListener(queues = "email-queue")
public void handleBookingCreated(BookingCreatedEvent event) {
    emailService.sendBookingConfirmation(event);
}
```

### 3. **Service Discovery (Eureka)**
```java
@LoadBalanced
@Bean
public WebClient.Builder webClientBuilder() {
    return WebClient.builder();
}

// Use service name instead of hardcoded URL
webClient.get()
    .uri("http://property-service/api/properties/{id}")
    .retrieve()
    .bodyToMono(PropertyResponse.class);
```

---

## 🔐 Security Architecture

### JWT Token Flow
```
1. User → Auth Service → Login → JWT Token
2. User → API Gateway → Validate JWT → Route to Microservice
3. Microservice → Extract user info from JWT → Process request
```

### Token Structure
```json
{
  "sub": "user@example.com",
  "userId": "12345",
  "role": "OWNER",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### Inter-Service Authentication
- **Option 1:** Share JWT secret across services
- **Option 2:** Use service-to-service tokens
- **Option 3:** API Gateway validates, passes user context in headers

---

## 📊 Data Consistency Patterns

### 1. **Saga Pattern** (for distributed transactions)
**Example: Booking Creation**
```
1. Booking Service → Create booking (PENDING)
2. → Payment Service → Process payment
3. → Property Service → Reduce availability
4. → Email Service → Send confirmation
5. Booking Service → Update status (CONFIRMED)

If any step fails:
- Compensating transactions (refund, restore availability)
```

### 2. **Event Sourcing** (optional)
Store all changes as events, rebuild state from events

### 3. **CQRS** (Command Query Responsibility Segregation)
Separate read and write models

---

## 🚀 Deployment Strategy

### Docker Compose (Development)
```yaml
version: '3.8'
services:
  eureka-server:
    build: ./eureka-server
    ports:
      - "8761:8761"
  
  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - eureka-server
  
  auth-service:
    build: ./auth-service
    ports:
      - "8081:8081"
    environment:
      - DB_URL=jdbc:mysql://mysql:3306/livewell_auth
  
  property-service:
    build: ./property-service
    ports:
      - "8082:8082"
  
  # ... other services
```

### Kubernetes (Production)
- Each microservice as a Deployment
- Service discovery via Kubernetes Services
- Ingress for API Gateway
- ConfigMaps for configuration
- Secrets for credentials
- Horizontal Pod Autoscaling

---

## 📈 Monitoring & Observability

### 1. **Distributed Tracing**
- **Sleuth + Zipkin** for request tracing
- Track requests across multiple services

### 2. **Centralized Logging**
- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Splunk** or **Loki**

### 3. **Metrics & Monitoring**
- **Prometheus** for metrics collection
- **Grafana** for visualization
- **Spring Boot Actuator** for health checks

### 4. **Circuit Breaker**
- **Resilience4j** or **Hystrix**
- Prevent cascading failures

---

## 🔄 CI/CD Pipeline

```
Code Push → GitHub
    ↓
GitHub Actions / Jenkins
    ↓
Build (Maven) → Unit Tests → Integration Tests
    ↓
Build Docker Images
    ↓
Push to Docker Registry
    ↓
Deploy to Kubernetes/ECS
    ↓
Health Checks
    ↓
Production
```

---

## 📦 Technology Stack

| Component | Technology |
|-----------|------------|
| **Language** | Java 17 |
| **Framework** | Spring Boot 3.2.x |
| **Database** | MySQL 8.0 |
| **Service Discovery** | Netflix Eureka |
| **API Gateway** | Spring Cloud Gateway |
| **Message Broker** | RabbitMQ / Kafka |
| **Caching** | Redis |
| **Container** | Docker |
| **Orchestration** | Kubernetes |
| **Monitoring** | Prometheus + Grafana |
| **Tracing** | Sleuth + Zipkin |
| **Logging** | ELK Stack |
| **CI/CD** | GitHub Actions / Jenkins |

---

## 🎯 Migration Strategy (Monolith to Microservices)

### Phase 1: Preparation
1. Identify service boundaries
2. Define APIs between services
3. Set up infrastructure (Eureka, Gateway)

### Phase 2: Strangler Pattern
1. Keep monolith running
2. Route new features to microservices
3. Gradually migrate existing features

### Phase 3: Data Migration
1. Split database
2. Implement data synchronization
3. Update service calls

### Phase 4: Complete Migration
1. Decommission monolith
2. All traffic through microservices
3. Optimize and scale

---

## 📝 Best Practices

✅ **Independent Deployment** - Each service can be deployed independently
✅ **Database per Service** - No shared databases
✅ **API Contracts** - Use OpenAPI/Swagger for documentation
✅ **Versioning** - API versioning (v1, v2)
✅ **Health Checks** - Implement actuator endpoints
✅ **Graceful Degradation** - Circuit breakers for fault tolerance
✅ **Idempotency** - Handle duplicate requests
✅ **Backward Compatibility** - Don't break existing APIs
✅ **Security** - JWT authentication, service-to-service auth
✅ **Monitoring** - Comprehensive logging and metrics

---

## 🔗 Service Dependencies Matrix

| Service | Depends On |
|---------|------------|
| **Auth Service** | Email Service, Firebase Service |
| **Property Service** | Auth Service, File Service, Notification Service |
| **Booking Service** | Auth Service, Property Service, Payment Service, Email Service, Notification Service |
| **Communication Service** | Auth Service, Property Service |
| **Support Service** | Auth Service, Property Service, Booking Service, Email Service, Notification Service |
| **Admin Service** | Auth Service, Property Service, Booking Service, Email Service, Notification Service |
| **Payment Service** | None (External: Razorpay) |
| **File Service** | None |

---

## 📚 Next Steps

1. **Set up infrastructure services** (Eureka, Gateway)
2. **Create Docker images** for each microservice
3. **Set up databases** for each service
4. **Implement inter-service communication** (REST + Message Queue)
5. **Add distributed tracing** (Sleuth + Zipkin)
6. **Implement circuit breakers** (Resilience4j)
7. **Set up monitoring** (Prometheus + Grafana)
8. **Create Kubernetes manifests** for deployment
9. **Set up CI/CD pipeline**
10. **Write comprehensive tests** (Unit, Integration, E2E)

---

**Total Microservices: 8 Core Services + 3 Infrastructure Services**
**Architecture Pattern: Microservices with Event-Driven Communication**
**Deployment: Docker + Kubernetes**
**Communication: REST (sync) + RabbitMQ (async)**

---

Created on: February 12, 2026
Version: 1.0.0
Architecture Type: Microservices
