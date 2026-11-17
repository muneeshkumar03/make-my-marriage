import { NextResponse } from "next/server";
import { isDemoMode } from "@/infrastructure/config";
import { checkMongo } from "@/infrastructure/mongodb/client";

export const runtime = "nodejs";

export async function GET() {
  const database = isDemoMode() ? "demo" : await checkMongo();
  const status = database === "connected" || database === "demo" ? "ok" : "degraded";
  return NextResponse.json({ status, service: "wedding-web", mode: isDemoMode() ? "demo" : "live", dependencies: { mongodb: database } }, { status: status === "ok" ? 200 : 503 });
}
