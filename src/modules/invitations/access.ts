import { createOpaqueToken, hashToken } from "@/modules/auth/credentials";
import type { EventInvitationRecord } from "@/modules/invitations/types";

export function createInvitationSecret(){const token=createOpaqueToken();return {token,tokenHash:hashToken(token)};}
export type GuestScope={invitationId:string;weddingId:string;householdId:string;eventIds:string[];expiresAt:Date};
/** Guest sessions must be resolved server-side and checked against the active invitation on every request. */
export function requireInvitedEvent(scope:GuestScope|null,invitation:EventInvitationRecord|null,eventId:string){
  if(!scope||scope.expiresAt<=new Date()||!invitation||invitation.status!=="active")throw new Error("INVITATION_UNAVAILABLE");
  if(scope.invitationId!==invitation._id||scope.weddingId!==invitation.weddingId||scope.householdId!==invitation.householdId||!scope.eventIds.includes(eventId)||invitation.eventId!==eventId)throw new Error("INVITATION_SCOPE_MISMATCH");
  if(invitation.expiresAt&&invitation.expiresAt<=new Date())throw new Error("INVITATION_UNAVAILABLE");
  return {weddingId:scope.weddingId,householdId:scope.householdId,eventId};
}
