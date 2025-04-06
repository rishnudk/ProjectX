import express from 'express';
import { redirectIfAdminLoggedIn, requireAdminAuth } from '../middlewares/authMiddleware.js';
import { adminLogin, adminLogout, getDashboard, deleteUser, addUser,  updateUser, searchUsers  } from '../controllers/adminController.js';

const router = express.Router();

// Prevent logged-in admins from accessing the login page
router.get('/login', redirectIfAdminLoggedIn, (req, res) => {
    res.render('adminLogin', { title: 'Admin Login', error: null });
});

// ✅ Add search route
router.get('/search', requireAdminAuth, searchUsers);

// Add user route
router.post('/adduser', requireAdminAuth, addUser);

// Admin authentication
router.post('/login', adminLogin);
router.post('/logout', adminLogout);

// Protect admin dashboard
router.get('/dashboard', requireAdminAuth, getDashboard);

// ✅  DELETE user route
router.post('/user/:id/delete', requireAdminAuth, deleteUser);

// ✅  UPDATE user route
router.post('/user/:id/update', requireAdminAuth, updateUser);

export default router;

