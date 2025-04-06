import express from 'express';
import { redirectIfAuthenticated, requireAuth } from '../middlewares/authMiddleware.js';
import { loginUser, logoutUser, registerUser, userDashboard } from '../controllers/userController.js';

const router = express.Router();

// Prevent logged-in users from accessing login/signup pages
router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('userLogin', { title: 'User Login' });
});
router.get('/register', redirectIfAuthenticated, (req, res) => {
    res.render('userRegister', { title: 'User Register' });
});

// User authentication
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/dashboard', requireAuth, userDashboard);
router.post('/logout', logoutUser);


export default router;
