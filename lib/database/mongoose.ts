import { MongooseCache } from '@/types/type';
import mongoose from 'mongoose';

declare global {
    var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
    conn: null,
    promise: null,
};

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

const dbConnect = async (): Promise<typeof mongoose> => {
    if (!process.env.MongoDB_URI) {
        throw new Error("Please define the MongoDB_URI environment variable inside .env");
    }
    
    if (cached.conn) {
        return cached.conn;
    }
    
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        cached.promise = mongoose.connect(process.env.MongoDB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    
    return cached.conn;
}

export default dbConnect;