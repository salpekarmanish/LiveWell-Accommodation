<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00d4ff,100:0066cc&height=200&section=header&text=LiveWell%20Accommodation&fontSize=42&fontColor=ffffff&fontAlignY=38&desc=Find.%20Manage.%20Rent.%20Simplified.&descAlignY=58&descSize=20" width="100%"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Coming%20Soon-00d4ff?style=for-the-badge)](https://github.com/salpekarmanish/LiveWell-Accommodation)
[![GitHub Stars](https://img.shields.io/github/stars/salpekarmanish/LiveWell-Accommodation?style=for-the-badge&logo=github&color=0066cc&logoColor=white)](https://github.com/salpekarmanish/LiveWell-Accommodation/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/salpekarmanish/LiveWell-Accommodation?style=for-the-badge&logo=github&color=0066cc&logoColor=white)](https://github.com/salpekarmanish/LiveWell-Accommodation/network)
[![License](https://img.shields.io/badge/License-MIT-00d4ff?style=for-the-badge)](LICENSE)

</div>

---

## 🏠 About the Project

> **LiveWell Accommodation** is a full-stack web application built on a **Microservices Architecture** using **Java & Spring Boot**. It simplifies the process of finding, managing, and renting properties — connecting **tenants**, **property owners**, and **administrators** on a single platform.

Each core feature runs as an independent microservice, communicating through a centralized **API Gateway** for scalability and maintainability.

---

## ✨ Features

<div align="center">

| Role | Features |
|------|----------|
| 🧑‍💼 **Admin** | Manage users, approve listings, monitor activity |
| 🏡 **Property Owner** | Add, edit & remove property listings |
| 🔍 **Tenant** | Browse, search, filter & book accommodations |
| 🔐 **Auth System** | Secure JWT login with role-based access control |
| 📱 **Responsive UI** | Fully mobile-friendly across all devices |
| 📸 **Image Upload** | Upload and showcase property photos |
| 📩 **Booking Requests** | Tenants can send and track rental inquiries |
| 📊 **Dashboard** | Role-specific dashboards for each user type |

</div>

---

## 🛠️ Tech Stack

### 🎨 Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### ⚙️ Backend
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![Spring Cloud Gateway](https://img.shields.io/badge/API%20Gateway-Spring%20Cloud-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Microservices](https://img.shields.io/badge/Architecture-Microservices-FF6B6B?style=for-the-badge&logo=apachekafka&logoColor=white)

### 🗄️ Database
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### 🔧 Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)

---

## 🏗️ Microservices Architecture
```
                        ┌─────────────────────┐
                        │     React Frontend   │
                        └──────────┬──────────┘
                                   │
                        ┌──────────▼──────────┐
                        │    API Gateway       │
                        │  (Spring Cloud GW)   │
                        └──┬──────┬──────┬────┘
                           │      │      │
              ┌────────────▼┐  ┌──▼───┐ ┌▼──────────────┐
              │Auth Service │  │Prop. │ │Booking Service │
              │(JWT + Roles)│  │Svc   │ │                │
              └────────────┘  └──────┘ └────────────────┘
                           │      │      │
                    ┌──────▼──────▼──────▼──────┐
                    │     MySQL / MongoDB         │
                    └───────────────────────────┘
```

---

## 🗂️ Project Structure
```
LiveWell-Accommodation/
│
├── 📂 api-gateway/                  # Spring Cloud API Gateway
│   └── src/main/resources/
│       └── application.yml          # Route configurations
│
├── 📂 auth-service/                 # Authentication Microservice
│   ├── controller/
│   ├── service/
│   ├── model/
│   └── security/                    # JWT config & filters
│
├── 📂 property-service/             # Property Listing Microservice
│   ├── controller/
│   ├── service/
│   └── model/
│
├── 📂 booking-service/              # Booking Microservice
│   ├── controller/
│   ├── service/
│   └── model/
│
├── 📂 user-service/                 # User Management Microservice
│   ├── controller/
│   ├── service/
│   └── model/
│
├── 📂 client/                       # React Frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
│
└── 📄 README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven 3.8+
- Node.js v18+
- MySQL / MongoDB running locally

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/salpekarmanish/LiveWell-Accommodation.git

# 2. Navigate into the project
cd LiveWell-Accommodation
```

### Run Each Microservice
```bash
# Start API Gateway (port 8080)
cd api-gateway
mvn spring-boot:run

# Start Auth Service (port 8081)
cd auth-service
mvn spring-boot:run

# Start Property Service (port 8082)
cd property-service
mvn spring-boot:run

# Start Booking Service (port 8083)
cd booking-service
mvn spring-boot:run

# Start Frontend
cd client
npm install
npm start
```

### Environment Variables

In each service's `application.yml` or `.env`:
```yaml
server:
  port: 8081

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/livewell
    username: root
    password: your_password

jwt:
  secret: your_jwt_secret_key
  expiration: 86400000
```

---

## 🔗 API Gateway Routes

All requests go through `http://localhost:8080`

| Method | Gateway Route | Forwarded To | Description |
|--------|--------------|-------------|-------------|
| POST | `/api/auth/register` | auth-service | Register new user |
| POST | `/api/auth/login` | auth-service | Login & get JWT token |
| GET | `/api/properties` | property-service | Get all listings |
| POST | `/api/properties` | property-service | Add new property |
| PUT | `/api/properties/{id}` | property-service | Update a listing |
| DELETE | `/api/properties/{id}` | property-service | Delete a listing |
| POST | `/api/bookings` | booking-service | Submit booking request |
| GET | `/api/bookings/{userId}` | booking-service | Get user bookings |
| GET | `/api/users` | user-service | Get all users (admin) |

---

## 🤝 Contributing
```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m "Add some AmazingFeature"

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## 👨‍💻 Author

<div align="center">

**Manish Salpekar**
*Java Backend Developer | Spring Boot | Microservices*

[![Email](https://img.shields.io/badge/📧%20Email-manishsalpekar3%40gmail.com-00d4ff?style=for-the-badge&logo=gmail&logoColor=white)](mailto:manishsalpekar3@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ManishSalpekar-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/manishsalpekar)
[![GitHub](https://img.shields.io/badge/GitHub-salpekarmanish-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/salpekarmanish)

</div>

---

<div align="center">

> 💬 *"Every great product starts with solving a real problem. LiveWell is my step toward that."*

⭐ If you found this project useful, please consider giving it a **star**!

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0066cc,100:00d4ff&height=100&section=footer" width="100%"/>

</div>
