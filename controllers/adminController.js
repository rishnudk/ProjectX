import { Admin } from '../models/Admin.js';
import { User } from '../models/User.js';
import argon2 from 'argon2';

/**
 * Admin Dashboard - View all users
 */
export const adminDashboard = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.render('adminDashboard', { title: 'Admin Dashboard', users, error: null });
    } catch (error) {
        console.error(error);
        res.render('adminDashboard', { title: 'Admin Dashboard', users: [], error: 'Error fetching users' });
    }
};

/**
 * Admin Login
 */
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin || !await argon2.verify(admin.password, password)) {
            return res.render('adminLogin', { title: 'Admin Login', error: 'Invalid credentials' });
        }

        req.session.adminId = admin._id;
        req.session.adminName = admin.name;
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.render('adminLogin', { title: 'Admin Login', error: 'An error occurred' });
    }
};

export const getDashboard = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.render('adminDashboard', { title: 'Admin Dashboard', users, error: null });
    } catch (error) {
        console.error(error);
        res.render('adminDashboard', { title: 'Admin Dashboard', users: [], error: 'Error loading dashboard' });
    }
};


/**
 * Admin Logout
 */
export const adminLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.redirect('/admin/dashboard'); // Redirect back if session is not cleared
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.redirect('/admin/login');
    });
};


export const searchUsers = async (req, res) => {
    try {
        const query = req.query.q; // Get search query from request
        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive name search
                { email: { $regex: query, $options: 'i' } } // Case-insensitive email search
            ]
        }).select('-password'); // Exclude password from results

        res.json(users); // Return search results as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching users' });
    }
};



/**
 * Add a new user
 */
export const addUser = async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.render('adminDashboard', { error: 'All fields are required' });
        }

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const users = await User.find().select('-password');
            return res.render('adminDashboard', { users, error: 'Email already registered' });
        }

        // Hash password & save user
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error("Add User Error:", error);
        res.render('adminDashboard', { error: 'Error adding user' });
    }
};


/**
 * Delete a user
 */
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error("Delete Error:", error);
        res.render('adminDashboard', { 
            title: 'Admin Dashboard', 
            users: await User.find(), 
            error: 'Error deleting user' 
        });
    }
};



/**
 * Update User Details
 */
export const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let updateData = { name, email };
        if (password) {
            const hashedPassword = await argon2.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!user) {
            return res.render('adminDashboard', { 
                title: 'Admin Dashboard', 
                users: await User.find(), 
                error: 'User not found' 
            });
        }

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error("Update Error:", error);
        res.render('adminDashboard', { 
            title: 'Admin Dashboard', 
            users: await User.find(), 
            error: 'Error updating user' 
        });
    }
};




/**
 * Get all users (API)
 */
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
