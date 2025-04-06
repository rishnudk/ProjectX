import{ User} from '../models/User.js';
import argon2 from 'argon2';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).render('signup', { error: 'User already exists' });
        }

        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).render('signup', { error: 'Server error' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await argon2.verify(user.password, password))) {
            return res.status(401).render('login', { error: 'Invalid credentials' });
        }

        req.session.user = { id: user._id, name: user.name, email: user.email };
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).render('login', { error: 'Server error' });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy(() => res.redirect('/login'));
};
