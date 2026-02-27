import mongoose from 'mongoose';

const savedRepoSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        index: true 
    },
    fullName: { type: String, required: true },
    owner: { type: String, required: true },
    repo: { type: String, required: true },
    lastHealthScore: Number,
    lastChecked: { type: Date, default: Date.now },
    notifications: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

// Unique compound index to prevent duplicate saves
savedRepoSchema.index({ userId: 1, fullName: 1 }, { unique: true });

export default mongoose.models.SavedRepo || mongoose.model('SavedRepo', savedRepoSchema);