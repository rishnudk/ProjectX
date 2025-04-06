// Middleware to protect user routes
export const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirect if user is not logged in
    }
    next();
};

// Middleware to protect admin routes
export const requireAdminAuth = (req, res, next) => {
    if (req.session.adminId) {
        return next(); // Allow access if admin is logged in
    }
    if (req.session.userId) {
        return res.redirect('/user/dashboard'); // Redirect normal users
    }
    return res.redirect('/admin/login'); // Redirect if not logged in as admin
};



// Middleware to prevent logged-in users from accessing login and signup pages
export const redirectIfUserLoggedIn = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/user/dashboard'); 
    }
    next();
};

// Middleware to prevent logged-in admins from accessing the admin login page
export const redirectIfAdminLoggedIn = (req, res, next) => {
    // Prevent both admin and regular users from accessing the admin login page
    if (req.session.adminId) {
        return res.redirect('/admin/dashboard');
    }
    if (req.session.userId) { 
        return res.redirect('/user/dashboard'); // Redirect normal users
    }
    next();
};

export const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/user/dashboard'); 
    }
    if (req.session.adminId) {
        return res.redirect('/admin/dashboard');
    }
    next();
};

