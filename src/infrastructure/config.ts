export const isDemoMode = () => process.env.DEMO_MODE !== "false";
export function requiredEnv(name:string):string { const value=process.env[name]; if(!value) throw new Error(`Missing required environment variable: ${name}`); return value; }
