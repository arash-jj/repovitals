import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: String,
    githubId: { type: String, unique: true, sparse: true },
    githubAccessToken: { type: String, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);