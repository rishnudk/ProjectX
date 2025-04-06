import mongoose from 'mongoose';
import dotenv from 'dotenv';
import argon2 from 'argon2';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { Admin } from '../models/Admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env from project root
dotenv.config({ path: path.join(__dirname, '../.env') });

const addAdmin = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI not found in environment variables');
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin123';
        const hashedPassword = await argon2.hash(adminPassword);

        const adminUser = new Admin({
            name: 'Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await mongoose.connection.close();
    }
};

addAdmin();