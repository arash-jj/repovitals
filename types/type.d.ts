type MongooseModule = typeof import("mongoose");

export interface MongooseCache {
    conn: MongooseModule | null;
    promise: Promise<MongooseModule> | null;
}