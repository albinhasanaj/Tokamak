// lib/connectToDB.ts
import mongoose from "mongoose";

// env.local file
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDB = async (): Promise<typeof mongoose> => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {

        cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
};