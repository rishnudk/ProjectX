import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';


export const router = express.Router();

router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', registerUser);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', loginUser);

router.get('/logout', logoutUser);

export default router;
