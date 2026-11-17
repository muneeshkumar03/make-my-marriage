import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE || "wedding_platform";
let clientPromise: Promise<MongoClient> | undefined;

export async function getDatabase(): Promise<Db> {
  if (!uri) throw new Error("MongoDB is not configured. Set MONGODB_URI to enable persistence.");
  if (!clientPromise) clientPromise = new MongoClient(uri).connect();
  return (await clientPromise).db(databaseName);
}

export async function checkMongo(): Promise<"connected"|"unavailable"> {
  try { await (await getDatabase()).command({ ping: 1 }); return "connected"; }
  catch { return "unavailable"; }
}
