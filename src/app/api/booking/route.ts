import crypto from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/lib/availability";
import { sendBookingConfirmation } from "@/lib/mail";
import { mutateData, readData } from "@/lib/store";
import type { Booking } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, startsAt, customerName, customerPhone, customerEmail, note } = body;

    if (!serviceId || !startsAt || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required fields: serviceId, startsAt, customerName, customerPhone" },
        { status: 400 },
      );
    }

    const data = readData();
    const service = data.services.find((s) => s.id === serviceId && s.active);
    if (!service) {
      return NextResponse.json({ error: "Service not found or inactive" }, { status: 400 });
    }

    // Anti-race condition validation: Fetch current actual slots for that date
    const dateStr = startsAt.slice(0, 10);
    const slots = await getAvailability(dateStr, serviceId);
    const selectedSlot = slots.find((s) => s.startsAt === startsAt);

    if (!selectedSlot || !selectedSlot.available) {
      return NextResponse.json(
        { error: "Der ausgewählte Termin ist leider nicht mehr verfügbar." },
        { status: 400 },
      );
    }

    // Insert the booking atomically
    const newBooking: Booking = {
      id: crypto.randomUUID().slice(0, 8).toUpperCase(),
      serviceId,
      serviceName: service.name,
      startsAt: selectedSlot.startsAt,
      endsAt: selectedSlot.endsAt,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: (customerEmail || "").trim().toLowerCase(),
      note: (note || "").trim(),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    await mutateData((store) => {
      store.bookings.push(newBooking);
    });

    // Send emails asynchronously (in background)
    // Using settings.email as Damir's destination address
    const adminMailAddress = data.settings.email || "damir-cagla@hotmail.de";
    sendBookingConfirmation(newBooking, service, adminMailAddress).catch((err) => {
      console.error("Async confirmation email error:", err);
    });

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
