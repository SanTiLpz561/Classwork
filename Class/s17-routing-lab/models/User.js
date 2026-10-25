import mongoose from "mongoose";

const USR_ROLES = ['User', 'Admin', 'Superuser'];

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true, trim: true },
        name: { type: String, trim: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true },
        role: { type: String, default: 'User' },
    },
    { timestamps: true, _strict: true }
);

export const User = mongoose.model('User', UserSchema);