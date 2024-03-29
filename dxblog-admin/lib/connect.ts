import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
    try {
        if (cached.conn) {
            return cached.conn;
        }
    
        if (!cached.promise) {
            const opts = { bufferCommands: false };
            cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) =>  mongoose);
        }
    
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.log(error);
        throw new Error('An error in database connection');
    }
}

export default dbConnect;
