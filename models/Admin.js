import mongoose from 'mongoose';

function confirmDelete() {
    return confirm("Are you sure you want to delete this user?");
}


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
}, {
    timestamps: true
});

export const Admin = mongoose.model('Admin', adminSchema);