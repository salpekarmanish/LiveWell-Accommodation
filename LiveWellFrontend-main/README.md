# 🏠 Property Management System

## Description  
A full-stack property management platform connecting tenants and property owners with rich features such as 360° virtual tours, secure login, online rent payment, and powerful admin analytics.

---

## 🚀 Modules & Features

### 1. 👤 User Module

- **Registration & Login**: Users can register and securely log in to their accounts.
- **Property Search**: Search based on preferences like location, budget, and amenities.
- **360° Virtual Property Tour**: View immersive images and videos of rooms and layouts.
- **Security Verification**: OTP-based login for secure access to verified properties.
- **Feedback & Review**: Leave reviews and feedback on visited properties. ✅

---

### 2. 🏘️ Owner Module

- **Property Listing**: List properties with photos and videos (360° simulation).
- **Sell/Buy Properties**: View and manage properties for sale or purchase.
- **Tenant Management**: View tenant profiles and manage agreements. ✅
- **Rent Management**: Monitor rent payments and receive email notifications.
- **360° Tour Management**: Upload & manage media to attract more tenants.

---

### 3. 🛠️ Admin Module

- **User & Owner Management**: Manage all registered accounts.
- **Verification**: Approve/verify uploaded documents and assign verification tags.
- **Analytics Dashboard**: Monitor occupancy rates, payment history, and trends.
- **Issue Resolution**: Address complaints and support queries.

---

## 🔑 Key Features

- 🏠 **360° Virtual Property Tours**
- 🔍 **Advanced Search & Filters**
- 🔐 **Enhanced Security & OTP Login**
- 💳 **Auto-Payment System with Gateway Integration**
- 📱 **Responsive Web & Mobile Design**
- 🔔 **Real-time Notifications (SMS & Email)**
- ⭐ **Transparent Review System**
- 📊 **Admin Dashboard & Analytics**

---

## 💻 Tech Stack

- **Frontend**: React.js, Styled Components
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: OTP-based login with Firebase
- **Storage**: Local Disk for media files (images/videos)
- **Notifications**: Twilio / Firebase SMS, Email via Nodemailer
- **Payment Gateway**: Razorpay Integration

---

## 📸 Screenshots
### 👤 UI Interface

<table>
  <tr>
    <td><b>Home Page 1</b><br><img src="https://github.com/user-attachments/assets/9367c578-96c5-4811-a10e-d3df7a3af96a" width="350"/></td>
    <td><b>Home Page 2</b><br><img src="https://github.com/user-attachments/assets/22ecc945-0dae-4bff-b241-9a1b1618414e" width="350"/></td>
    <td><b>Home Page 3</b><br><img src="https://github.com/user-attachments/assets/80abed43-3efc-4e57-8075-eb1e9b7ff915" width="350"/></td>
  </tr>
  <tr>
    <td><b>Our Choice</b><br><img src="https://github.com/user-attachments/assets/23f9d3f4-893f-438c-83f8-f98cc3344fda" width="350"/></td>
    <td><b>Why Us</b><br><img src="https://github.com/user-attachments/assets/9cc7c4b7-49e1-45fb-aba4-3a2c1c96b397" width="350"/></td>
    <td><b>User Chat</b><br><img src="https://github.com/user-attachments/assets/0a39c477-9f53-42d6-8d68-b2ae96e61dad" width="350"/></td>
  </tr>
  <tr>
    <td><b>Search Page</b><br><img src="https://github.com/user-attachments/assets/9899e538-8790-4ef2-9518-1af03ac6272f" width="350"/></td>
    <td><b>Property View 1</b><br><img src="https://github.com/user-attachments/assets/b3511c29-971b-445f-9afc-7bb743800e47" width="350"/></td>
    <td><b>Property View 2</b><br><img src="https://github.com/user-attachments/assets/6f112329-ec7a-4655-8460-773c15a75b37" width="350"/></td>
  </tr>
  <tr>
    <td><b>Property Page 1</b><br><img src="https://github.com/user-attachments/assets/b8f9388b-a636-407d-bdef-25065bd58af7" width="350"/></td>
    <td><b>Property Page 2</b><br><img src="https://github.com/user-attachments/assets/097e51dd-4bbb-4c1a-9cb1-ad5a81120d17" width="350"/></td>
    <td><b>Property Listing</b><br><img src="https://github.com/user-attachments/assets/e034785b-8972-4faf-8701-21372a6edf17" width="350"/></td>
  </tr>
  <tr>
    <td><b>Complaint Page</b><br><img src="https://github.com/user-attachments/assets/b04382e8-0c8e-41a6-898e-3f26bf861626" width="350"/></td>
  </tr>
</table>


### 🛠️ Admin Interface
| Title | Image    |
--- | --- | 
| Analysis Page |<img width="960" alt="SS-1" src="https://github.com/user-attachments/assets/55d43048-405e-44c9-8a18-ab4411bfcd91">|
| Verify User Page |<img width="960" alt="SS-1" src="https://github.com/user-attachments/assets/36c107f4-2fce-46e3-9919-5f5197f161f0">|
| Search User |<img width="960" alt="SS-1" src="https://github.com/user-attachments/assets/309055e9-f114-41b1-983d-1cee3e0ba807">|
| Complaints Page |<img width="960" alt="SS-1" src="https://github.com/user-attachments/assets/b0ff37c6-7106-4a96-a566-34f352bc9bad">|

### 📌 System Architecture
![syArch](https://github.com/user-attachments/assets/493acf8b-d218-4e98-b265-1ad1f3910bcb)


### 🔄 Use Case Diagram
![LiveWellUseCase](https://github.com/user-attachments/assets/9e79064a-e586-4002-a3d8-6e6513e78b7d)

---

## 🎥 Demo Videos

- **User Module**: 

https://github.com/user-attachments/assets/96ccb5a1-cf34-4414-937c-d1d9ccc4aafd


- **Owner Module**: 

https://github.com/user-attachments/assets/6e2098ed-078e-4bc2-9748-7c5e8e97c182


- **Admin Module**: 

https://github.com/user-attachments/assets/a2e1e67b-2ead-407f-bf91-192ff3d56f00



---

## ⚙️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/yourusername/property-management-system.git


# In another terminal, navigate to frontend
cd frontend
npm install
npm run dev
```
