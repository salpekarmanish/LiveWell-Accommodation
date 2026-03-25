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

> **LiveWell Accommodation** is a full-stack web application designed to simplify the process of finding, managing, and renting properties. It connects **tenants**, **property owners**, and **administrators** on a single platform — making property management more efficient and user-friendly.

Whether you're a tenant searching for your next home, a landlord listing your property, or an admin overseeing the platform — LiveWell has you covered.

---

## ✨ Features

<div align="center">

| Role | Features |
|------|----------|
| 🧑‍💼 **Admin** | Manage users, approve listings, monitor activity |
| 🏡 **Property Owner** | Add, edit & remove property listings |
| 🔍 **Tenant** | Browse, search, filter & book accommodations |
| 🔐 **Auth System** | Secure login & registration with role-based access |
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
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![REST API](https://img.shields.io/badge/REST%20API-FF6B6B?style=for-the-badge&logo=fastapi&logoColor=white)

### 🗄️ Database
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### 🔧 Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

---

## 🗂️ Project Structure

```
LiveWell-Accommodation/
├── client/                  # Frontend (React)
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page-level components
│       ├── context/         # Auth & global state
│       └── App.js
├── server/                  # Backend (Node + Express)
│   ├── controllers/         # Route handlers
│   ├── models/              # DB models/schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Auth middleware
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB or MySQL running locally

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/salpekarmanish/LiveWell-Accommodation.git

# 2. Navigate into the project
cd LiveWell-Accommodation

# 3. Install server dependencies
cd server
npm install

# 4. Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running the App

```bash
# Start the backend server
cd server
npm start

# In a new terminal, start the frontend
cd client
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 📸 Screenshots

> _Screenshots coming soon — stay tuned!_

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get token |
| GET | `/api/properties` | Get all listings |
| POST | `/api/properties` | Add new property (owner) |
| PUT | `/api/properties/:id` | Update a listing |
| DELETE | `/api/properties/:id` | Delete a listing |
| POST | `/api/bookings` | Submit a booking request |
| GET | `/api/bookings/:userId` | Get user's bookings |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

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

<img src="https://avatars.githubusercontent.com/manish4567890" width="80" style="border-radius:50%;"/>

**Manish Salpekar**
*IT Software Developer | Fresher*

[![Email](https://img.shields.io/badge/📧%20Email-manishsalpekar3%40gmail.com-00d4ff?style=for-the-badge&logo=gmail&logoColor=white)](mailto:manishsalpekar3@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ManishSalpekar-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/manishsalpekar)
[![GitHub](https://img.shields.io/badge/GitHub-manish4567890-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/manish4567890)

</div>

---

<div align="center">

> 💬 *"Every great product starts with solving a real problem. LiveWell is my step toward that."*

⭐ If you found this project useful, please consider giving it a **star**!

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0066cc,100:00d4ff&height=100&section=footer" width="100%"/>

</div>
