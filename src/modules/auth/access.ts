export type WorkspaceRole="admin"|"manager";
export type Membership={weddingId:string;userId:string;role:WorkspaceRole;status:"active"|"invited"|"revoked"};
export type WorkspaceSession={userId:string;sessionId:string;expiresAt:Date};
/** Route handlers should call this server-side before any wedding-scoped read or write. */
export function requireMembership(session:WorkspaceSession|null,membership:Membership|null,weddingId:string):Membership {
  if(!session||session.expiresAt<=new Date()) throw new Error("UNAUTHENTICATED");
  if(!membership||membership.status!=="active"||membership.weddingId!==weddingId||membership.userId!==session.userId) throw new Error("FORBIDDEN");
  return membership;
}
export function requireAdmin(membership:Membership){if(membership.role!=="admin")throw new Error("FORBIDDEN");}
