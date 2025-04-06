import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nocache from 'nocache';
import session from 'express-session';
import ejsMate from 'ejs-mate';
import { connectDB } from './config/db.js';
import { router as authRoutes } from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; 

import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure ejs-mate
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

// Session Management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

// Define a route for the root URL
app.get('/', (req, res) => {
    // Check if the user is logged in
    if (req.session.userId) {
        return res.redirect('/user/dashboard'); // Redirect to user dashboard
    }

    // Check if the admin is logged in
    if (req.session.adminId) {
        return res.redirect('/admin/dashboard'); // Redirect to admin dashboard
    }

    // If neither user nor admin is logged in, render the login page
    res.render('userLogin', { 
        title: 'Login',
        extraCSS: '/css/styles.css',
        error: null
    }); // Render the userLogin.ejs
});





// Use routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(process.env.PORT || 7000, () => {
    console.log(`Server is running on port ${process.env.PORT || 7000}`);
  });
});
