# ProjectX - Admin Dashboard

## 🚀 Description
Full-stack user management system with admin controls built with Node.js, Express, MongoDB, and EJS.

## ✨ Features
- User/Admin authentication
- CRUD operations for users
- Session-based auth with Argon2 hashing
- Search functionality
- Responsive EJS templates

## 💻 Tech Stack
- **Frontend**: EJS + Bootstrap
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Security**: Argon2 + express-session

## 🛠️ Installation
```sh
git clone https://github.com/rishnudk/ProjectX.git
cd ProjectX
npm install
echo "PORT=7000\nMONGO_URI=mongodb://localhost:27017/projectx" > .env
npm start
📂 Project Structure
Copy
ProjectX/
├── controllers/    # Business logic
├── models/         # MongoDB schemas
├── routes/         # API endpoints
├── views/          # EJS templates
├── public/         # Static assets
└── server.js       # Entry point
🔗 Endpoints
Type	Route	Description
POST	/admin/login	Admin auth
POST	/admin/adduser	Create user
POST	/admin/user/:id/edit	Update user
DELETE	/admin/user/:id	Remove user
👨‍💻 Author
Rishnu Dk
📧 rishnudev@gmail.com

⭐ Star the repo if you find it useful!

Copy

This version:
1. Combines all essential info in minimal space
2. Uses clean markdown formatting
3. Includes installation commands ready to run
4. Maintains all critical sections
5. Keeps your GitHub links intact