import { collection } from "@/infrastructure/mongodb/repository";
import { collections } from "@/infrastructure/mongodb/collections";
import type { JobRecord } from "./types";

export async function enqueueJob(job:JobRecord){return (await collection<JobRecord>(collections.jobs)).updateOne({idempotencyKey:job.idempotencyKey},{$setOnInsert:job},{upsert:true});}
/** Atomically takes a due job or reclaims an expired lease. A production handler must add retry backoff. */
export async function claimNextJob(workerId:string,leaseMs=60_000){const now=new Date();return (await collection<JobRecord>(collections.jobs)).findOneAndUpdate({$or:[{state:"queued",runAt:{$lte:now}},{state:"running",lockedUntil:{$lt:now}}]},{$set:{state:"running",lockedBy:workerId,lockedUntil:new Date(now.getTime()+leaseMs),updatedAt:now},$inc:{attempts:1}}, {sort:{priority:-1,runAt:1},returnDocument:"after"});}
