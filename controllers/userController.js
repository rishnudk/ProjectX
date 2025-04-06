import { User } from '../models/User.js';
import argon2 from 'argon2';

// 🔹 Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('userSignup', { 
                title: 'Sign Up', 
                error: 'Email is already registered', 
                success: null 
            });
        }

        // Hash password
        const hashedPassword = await argon2.hash(password);

        // Save new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Redirect to login with success message
        res.render('userSignup', { 
            title: 'Sign Up', 
            success: 'Account created successfully! Please log in.', 
            error: null 
        });

    } catch (error) {
        console.error(error);
        res.render('userSignup', { 
            title: 'Sign Up', 
            error: 'Something went wrong. Please try again.', 
            success: null 
        });
    }
};

export const userDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).select('-password'); // Exclude password

        if (!user) {
            return res.redirect('/login'); // Redirect if user is not found
        }

        res.render('userDashboard', { 
            title: 'User Dashboard', 
            user // Pass user data to the view
        });
    } catch (error) {
        console.error(error);
        res.render('userDashboard', { 
            title: 'User Dashboard', 
            user: null, 
            error: 'Error fetching user data' 
        });
    }
};


// 🔐 Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.render('userLogin', { 
                title: 'Login', 
                error: 'Invalid email or password', 
                success: null 
            });
        }

        // Verify password
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.render('userLogin', { 
                title: 'Login', 
                error: 'Invalid email or password', 
                success: null 
            });
        }

        // Store user session
        req.session.userId = user._id;  
        req.session.userName = user.name;  

        // Redirect to dashboard
        res.redirect('/user/dashboard');  
    } catch (error) {
        console.error(error);
        res.render('userLogin', { 
            title: 'Login', 
            error: 'Something went wrong. Please try again.', 
            success: null 
        });
    }
};

// 🚪 Logout User
export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.redirect('/user/dashboard'); // Stay on dashboard if error occurs
        }
        res.clearCookie('connect.sid', { path: '/' }); // Clear session cookie
        res.render('userLogin', { title: 'Login', error: null, success: 'You have logged out successfully.' });
    });
};
