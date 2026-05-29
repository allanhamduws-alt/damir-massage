import { type NextRequest, NextResponse } from "next/server";
import { mutateData, readData } from "@/lib/store";
import { sendCancellationNotice } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing booking ID" }, { status: 400 });
    }

    const data = readData();
    const bookingIndex = data.bookings.findIndex((b) => b.id === id);

    if (bookingIndex === -1) {
      return NextResponse.json({ error: "Buchung nicht gefunden." }, { status: 404 });
    }

    const booking = data.bookings[bookingIndex];

    if (booking.status === "cancelled") {
      return NextResponse.json({ error: "Diese Buchung wurde bereits storniert." }, { status: 400 });
    }

    // Cancel booking atomically
    await mutateData((store) => {
      const match = store.bookings.find((b) => b.id === id);
      if (match) {
        match.status = "cancelled";
      }
    });

    // Notify customer and admin in the background
    const adminEmail = data.settings.email || "damir-cagla@hotmail.de";
    sendCancellationNotice(booking, adminEmail, "customer").catch((err) => {
      console.error("Async cancellation email error:", err);
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Client booking cancel API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
