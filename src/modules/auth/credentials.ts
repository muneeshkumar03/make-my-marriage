import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash } from "node:crypto";
const KEY_LENGTH = 64;
function derive(password:string,salt:Buffer){return new Promise<Buffer>((resolve,reject)=>{scryptCallback(password,salt,KEY_LENGTH,{N:16384,r:8,p:1},(error,key)=>error?reject(error):resolve(key as Buffer));});}
export async function derivePassword(password:string,salt=randomBytes(16).toString("base64")) {
  const hash=await derive(password,Buffer.from(salt,"base64"));
  return {scheme:"scrypt",salt,hash:hash.toString("base64"),parameters:{N:16384,r:8,p:1,keyLength:KEY_LENGTH},updatedAt:new Date()};
}
export async function verifyPassword(password:string,credential:{salt:string;hash:string}) {
  const candidate=await derive(password,Buffer.from(credential.salt,"base64"));
  const expected=Buffer.from(credential.hash,"base64");
  return expected.length===candidate.length && timingSafeEqual(expected,candidate);
}
export function createOpaqueToken(bytes=32){return randomBytes(bytes).toString("base64url");}
export function hashToken(token:string){return createHash("sha256").update(token).digest("hex");}
