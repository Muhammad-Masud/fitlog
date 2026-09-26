import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET() {
  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: {
        "content-type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "FitLog API unavailable" },
      { status: 502 },
    );
  }
}
