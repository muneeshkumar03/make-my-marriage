export type EventInvitationRecord={_id:string;weddingId:string;eventId:string;householdId:string;tokenHash:string;status:"active"|"revoked"|"expired";createdAt:Date;expiresAt?:Date};
