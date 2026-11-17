import { Resend } from "resend";
import { isDemoMode } from "@/infrastructure/config";
export function getEmailProvider(){if(isDemoMode())return {mode:"demo" as const};const key=process.env.RESEND_API_KEY;if(!key)throw new Error("RESEND_API_KEY is not configured");return {mode:"live" as const,client:new Resend(key)};}
