import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/user/dashboard'); // Redirect users if logged in
    }
    if (req.session.adminId) {
        return res.redirect('/admin/dashboard'); // Redirect admins if logged in
    }
    res.render('home', { title: 'Welcome' }); // Show homepage if not logged in
});

export default router;
