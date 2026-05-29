import { NextResponse } from "next/server";
import { readData } from "@/lib/store";

export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data.services);
  } catch (err) {
    console.error("GET services API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
