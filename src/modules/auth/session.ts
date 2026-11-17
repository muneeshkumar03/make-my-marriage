/** Session records store token hashes only. Cookie issuance and persistence are intentionally not wired yet. */
export type SessionRecord={userId:string;tokenHash:string;createdAt:Date;expiresAt:Date;lastSeenAt:Date;revokedAt:Date|null};
