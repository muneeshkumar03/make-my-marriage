import { getDatabase } from "@/infrastructure/mongodb/client";
import { collections as c } from "@/infrastructure/mongodb/collections";

/** Explicit, idempotent index initialization. Run only against a reviewed database. */
export async function ensureIndexes(){
  const db=await getDatabase();
  await Promise.all([
    db.collection(c.users).createIndex({emailNormalized:1},{unique:true,name:"users_email_normalized_unique"}),
    db.collection(c.sessions).createIndex({tokenHash:1},{unique:true,name:"sessions_token_hash_unique"}),
    db.collection(c.sessions).createIndex({userId:1,expiresAt:1}),
    db.collection(c.authTokens).createIndex({tokenHash:1},{unique:true,name:"auth_tokens_hash_unique"}),
    db.collection(c.authTokens).createIndex({expiresAt:1},{expireAfterSeconds:0}),
    db.collection(c.weddings).createIndex({slug:1},{unique:true,name:"weddings_slug_unique"}),
    db.collection(c.memberships).createIndex({weddingId:1,emailNormalized:1},{unique:true}),
    db.collection(c.events).createIndex({weddingId:1,startAt:1}),
    db.collection(c.households).createIndex({weddingId:1,name:1}),
    db.collection(c.guests).createIndex({weddingId:1,householdId:1}),
    db.collection(c.eventInvitations).createIndex({weddingId:1,eventId:1,householdId:1},{unique:true}),
    db.collection(c.eventInvitations).createIndex({tokenHash:1},{unique:true}),
    db.collection(c.rsvps).createIndex({weddingId:1,eventId:1,householdId:1},{unique:true}),
    db.collection(c.expenses).createIndex({weddingId:1,expenseDate:-1}),
    db.collection(c.albums).createIndex({weddingId:1},{unique:true}),
    db.collection(c.albums).createIndex({tokenHash:1},{unique:true}),
    db.collection(c.photos).createIndex({weddingId:1,albumId:1,status:1,createdAt:-1}),
    db.collection(c.photos).createIndex({originalKey:1},{unique:true}),
    db.collection(c.jobs).createIndex({idempotencyKey:1},{unique:true}),
    db.collection(c.jobs).createIndex({state:1,runAt:1,priority:-1}),
    db.collection(c.jobs).createIndex({state:1,lockedUntil:1}),
    db.collection(c.emailDeliveries).createIndex({deliveryKey:1},{unique:true}),
    db.collection(c.emailDeliveries).createIndex({weddingId:1,status:1,createdAt:-1}),
    db.collection(c.auditEvents).createIndex({weddingId:1,createdAt:-1})
  ]);
}
