import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

// Ensure env vars are loaded
dotenv.config({ path: path.resolve(process.cwd(), '.env') });


// TypeScript Global Declaration for caching
declare global {
  var mongooseCache:
    | {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    }
    | undefined;
}

const cached = global.mongooseCache || { conn: null, promise: null };

export async function connectDB(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;
  const DB_NAME = process.env.MONGODB_DB_NAME || "E-STORE-NEXTJS";

  // console.log("DEBUG: Loaded MONGO URI =>", MONGODB_URI); // DEBUG

  if (!MONGODB_URI || typeof MONGODB_URI !== "string") {
    const errorMessage =
      "❌ MONGODB_URI is missing. " +
      "If you are deploying to Vercel, please add 'MONGODB_URI' to your Project Settings > Environment Variables. " +
      "Locally, ensure you have a .env file with MONGODB_URI defined.";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  // Use cached connection if available
  if (cached.conn) {
    // console.log("✅ Using cached DB connection");
    return cached.conn;
  }

  // Create new connection if not already connecting
  if (!cached.promise) {
    console.log("📡 Connecting to MongoDB...");

    // ✅ Important: No comma here, mongoose.connect returns a Promise<typeof mongoose>
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      bufferCommands: false,
    });
  }

  try {
    // Wait for connection
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected Successfully!");

    // Save globally to prevent multiple connections in dev
    global.mongooseCache = cached;

    return cached.conn;
  } catch (error) {
    // Clear promise so next attempt can retry
    cached.promise = null;
    console.error("❌ MongoDB Connection Failed:", error);
    throw new Error("Database connection failed");
  }
}
