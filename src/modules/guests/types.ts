export type HouseholdRecord={_id:string;weddingId:string;name:string;emailNormalized?:string;phone?:string;status:"active"|"inactive"};
export type GuestRecord={_id:string;weddingId:string;householdId:string;name:string;email?:string;phone?:string;status:"active"|"inactive"};
