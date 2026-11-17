import { S3Client } from "@aws-sdk/client-s3";
import { isDemoMode } from "@/infrastructure/config";

/** Credentials are read only on the server. Presigned upload operations remain intentionally unwired. */
export function getR2Client(){if(isDemoMode())return null;const accountId=process.env.R2_ACCOUNT_ID;const accessKeyId=process.env.R2_ACCESS_KEY_ID;const secretAccessKey=process.env.R2_SECRET_ACCESS_KEY;if(!accountId||!accessKeyId||!secretAccessKey)throw new Error("R2 credentials are not configured");return new S3Client({region:"auto",endpoint:`https://${accountId}.r2.cloudflarestorage.com`,credentials:{accessKeyId,secretAccessKey}});}
