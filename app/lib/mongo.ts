import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
  throw new Error("Invalid MongoDB URL");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    //@ts-ignore
     cached!.promise = mongoose.connect(MONGODB_URL, {
      dbName: "mydb",
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}



