"use server";

import { redirect } from "next/navigation";
import { isAdmin, setAdminSession, clearAdminSession, verifyAdminPassword } from "@/lib/auth";
import { mutateData } from "@/lib/store";
import { sendCancellationNotice } from "@/lib/mail";
import type { StudioSettings, BusinessHour, Service, ManualBlock } from "@/lib/types";

// Auth Actions
export async function loginAction(password: string) {
  if (verifyAdminPassword(password)) {
    await setAdminSession();
    return { success: true };
  }
  return { success: false, error: "Ungültiges Passwort." };
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

// Settings Action
export async function updateSettingsAction(settings: StudioSettings) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await mutateData((store) => {
    store.settings = {
      ...store.settings,
      ...settings,
    };
  });

  return { success: true };
}

// Business Hours Action
export async function updateHoursAction(hours: BusinessHour[]) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await mutateData((store) => {
    store.hours = hours;
  });

  return { success: true };
}

// Cancel Booking
export async function cancelBookingAction(bookingId: string) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  let cancelledBooking: any = null;
  let adminEmail = "damir-cagla@hotmail.de";

  await mutateData((store) => {
    adminEmail = store.settings.email || adminEmail;
    const match = store.bookings.find((b) => b.id === bookingId);
    if (match) {
      match.status = "cancelled";
      cancelledBooking = match;
    }
  });

  if (cancelledBooking) {
    // Dispatch emails
    sendCancellationNotice(cancelledBooking, adminEmail, "admin").catch((err) => {
      console.error("Async cancel email error:", err);
    });
  }

  return { success: true };
}

// Manual Blocks Actions
export async function createBlockAction(title: string, startsAt: string, endsAt: string) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  const newBlock: ManualBlock = {
    id: Math.random().toString(36).substring(2, 9).toUpperCase(),
    title: title.trim() || "Sperrzeit",
    startsAt,
    endsAt,
    createdAt: new Date().toISOString(),
  };

  await mutateData((store) => {
    store.blocks.push(newBlock);
  });

  return { success: true };
}

export async function deleteBlockAction(blockId: string) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await mutateData((store) => {
    store.blocks = store.blocks.filter((b) => b.id !== blockId);
  });

  return { success: true };
}

// Services Actions
export async function saveServiceAction(service: Service) {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  await mutateData((store) => {
    const idx = store.services.findIndex((s) => s.id === service.id);
    if (idx !== -1) {
      store.services[idx] = {
        ...store.services[idx],
        ...service,
      };
    } else {
      store.services.push(service);
    }
  });

  return { success: true };
}
