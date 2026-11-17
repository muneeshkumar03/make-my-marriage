import { getDatabase } from "@/infrastructure/mongodb/client";
import type { Document, Filter, OptionalUnlessRequiredId, WithId } from "mongodb";

/** Feature repositories use this boundary so domain code never owns connection lifecycle. */
export async function collection<T extends Document>(name:string) { return (await getDatabase()).collection<T>(name); }
export async function findById<T extends Document>(name:string,id:string):Promise<WithId<T>|null>{return collection<T>(name).then(c=>c.findOne({_id:id} as Filter<T>));}
export async function insertRecord<T extends Document>(name:string,record:OptionalUnlessRequiredId<T>){return collection<T>(name).then(c=>c.insertOne(record));}
