import mongoose from 'mongoose';

const repoSchema = new mongoose.Schema({
    fullName: { type: String, required: true, unique: true, index: true },
    owner: { type: String, required: true },
    name: { type: String, required: true },
    
    // Basic repo info
    description: String,
    stars: Number,
    forks: Number,
    openIssues: Number,
    language: String,
    createdAt: Date,
    updatedAt: Date,
    
    // Community metrics
    communityHealth: {
        score: Number,
        hasReadme: Boolean,
        hasLicense: Boolean,
        hasContributing: Boolean,
        hasCodeOfConduct: Boolean,
    },
    
    // Activity metrics
    lastCommitDate: Date,
    lastReleaseDate: Date,
    contributorsCount: Number,
    commitsLast30Days: Number,
    closedIssuesLast30Days: Number,
    
    // CI/Dependencies
    hasCI: Boolean,
    dependabotAlerts: Number,
    
    // Computed health score
    healthScore: Number,
    healthBreakdown: {
        community: Number,
        activity: Number,
        quality: Number,
        popularity: Number,
    },
    
    // Caching metadata
    cachedAt: { type: Date, default: Date.now, index: true },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 24*60*60*1000) },
});

// TTL index for automatic cleanup
repoSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.RepoCache || mongoose.model('RepoCache', repoSchema);