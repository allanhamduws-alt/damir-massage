import { type NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/lib/availability";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const serviceId = searchParams.get("serviceId");

    if (!date || !serviceId) {
      return NextResponse.json(
        { error: "Missing query parameters 'date' and 'serviceId'" },
        { status: 400 },
      );
    }

    // Format check (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Expected YYYY-MM-DD." },
        { status: 400 },
      );
    }

    const slots = await getAvailability(date, serviceId);
    return NextResponse.json(slots);
  } catch (err) {
    console.error("Availability API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
