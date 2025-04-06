# ProjectX

## Description
ProjectX is a full-stack web application with user and admin authentication. Users can register, log in, and access their dashboard, while admins have control over user management. The project is built using Node.js, Express, MongoDB, and EJS for templating.

## Features
- User authentication (signup, login, logout)
- Admin authentication (admin login, logout)
- User dashboard
- Admin dashboard with user management (add, update, delete, search)
- Password hashing using Argon2
- Session-based authentication
- MongoDB database integration

## Tech Stack
- **Frontend:** EJS, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Express sessions
- **Security:** Argon2 for password hashing

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ProjectX.git
   cd ProjectX
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=7000
   ```

4. Start the MongoDB server (if not running already):
   ```sh
   mongod
   ```

5. Run the application:
   ```sh
   npm start
   ```

6. Open the browser and visit:
   - **User Login:** `http://localhost:7000/user/login`
   - **Admin Login:** `http://localhost:7000/admin/login`

## Project Structure
```
ProjectX/
│-- config/
│   ├── db.js
│-- models/
│   ├── User.js
│   ├── Admin.js
│-- routes/
│   ├── userRoutes.js
│   ├── adminRoutes.js
│-- controllers/
│   ├── userController.js
│   ├── adminController.js
│-- views/
│   ├── userLogin.ejs
│   ├── userSignup.ejs
│   ├── userDashboard.ejs
│   ├── adminLogin.ejs
│   ├── adminDashboard.ejs
│-- public/
│   ├── css/
│   ├── js/
│-- server.js
│-- package.json
│-- .env
│-- README.md
```

## API Endpoints

### User Routes
| Method | Endpoint         | Description          |
|--------|-----------------|----------------------|
| GET    | /user/login     | Render login page   |
| POST   | /user/login     | Handle login        |
| GET    | /user/signup    | Render signup page  |
| POST   | /user/register  | Handle registration |
| GET    | /user/dashboard | User dashboard      |
| GET    | /user/logout    | Logout user         |

### Admin Routes
| Method | Endpoint         | Description            |
|--------|-----------------|------------------------|
| GET    | /admin/login    | Render admin login page |
| POST   | /admin/login    | Handle admin login     |
| GET    | /admin/dashboard| Admin dashboard        |
| POST   | /admin/logout   | Admin logout           |
| POST   | /admin/adduser  | Add new user           |
| GET    | /admin/search   | Search users           |
| POST   | /admin/user/:id/delete | Delete user  |
| POST   | /admin/user/:id/update | Update user  |

## License
This project is licensed under the MIT License.

## Author
Your Name - [GitHub](https://github.com/your-username)

---
Feel free to update the details according to your project!






# Admin Dashboard - User Management System

## 📌 Project Overview
This is an **Admin Dashboard** built with **Node.js, Express, MongoDB, and EJS** for managing users. The system allows admins to:
- **Add** new users
- **Update** user details
- **Delete** users
- **Search** for users
- Secure authentication & authorization for admins

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Session-based authentication (express-session, argon2 for password hashing)
- **Frontend:** EJS templating engine, Bootstrap for UI

## ⚙️ Features
✅ Admin authentication (Login & Logout)  
✅ Secure access control (middleware-based authentication)  
✅ User management (Add, Update, Delete, Search)  
✅ Session handling using `express-session`  
✅ Hashed password storage using `argon2`  
✅ Clean & user-friendly UI using Bootstrap  

---

## 📥 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-repo/admin-dashboard.git
cd admin-dashboard
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Configure environment variables
Create a `.env` file in the root directory and add the following:
```env
PORT=7000
MONGO_URI=mongodb://localhost:27017/admin_dashboard
SESSION_SECRET=your_secret_key
```

### 4️⃣ Start the application
```sh
npm start
```
The server will run at: **http://localhost:7000**

---

## 🔥 API Routes
### **Authentication**
| Method | Route | Description |
|--------|----------------|-------------|
| POST | `/admin/login` | Admin login |
| POST | `/admin/logout` | Admin logout |

### **User Management**
| Method | Route | Description |
|--------|------------------------|-------------|
| POST | `/admin/adduser` | Add a new user |
| POST | `/admin/user/:id/update` | Update user details |
| POST | `/admin/user/:id/delete` | Delete a user |
| GET | `/admin/search` | Search for users |

---

## 🛠️ Project Structure
```
admin-dashboard/
│── controllers/       # Handles business logic (Admin/User controllers)
│── middlewares/       # Authentication & Authorization middleware
│── models/            # Mongoose models (User schema)
│── public/            # Static assets (CSS, JS)
│── routes/            # Express routes for admin
│── views/             # EJS templates (Frontend UI)
│── .env               # Environment variables
│── server.js          # Entry point (Express server)
│── package.json       # Dependencies & scripts
```

---

## 🛑 Troubleshooting
### "Cannot POST /admin/adduser"
✅ Ensure the `addUser` route is correctly defined in `adminRoutes.js`.  
✅ Check if `form action="/admin/adduser" method="POST"` is correct in your EJS template.  
✅ Restart the server after making changes (`CTRL + C` and `npm start`).

### "bcrypt is not defined"
✅ Ensure you are using `argon2` instead of `bcrypt`.  
✅ Replace `bcrypt` with `argon2` where necessary in your `adminController.js`.  
✅ Install `argon2` using `npm install argon2`.

---

## 🎯 Future Improvements
🚀 Implement JWT-based authentication  
🚀 Add pagination for user list  
🚀 Improve UI/UX with React or Vue.js  

---

## 👨‍💻 Author
**Rishnu Dk**  
📧 rishnudev@gmail.com  
📌 GitHub: [your-github-profile](https://github.com/your-github-profile)  

---

### ⭐ If you like this project, give it a star on GitHub! ⭐

