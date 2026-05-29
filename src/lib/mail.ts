import nodemailer from "nodemailer";
import { formatDateTime } from "./dates";
import type { Booking, Service } from "./types";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

const FROM_HEADER = process.env.SMTP_FROM || '"Damir & Cagla\'s Massage-Praxis" <damir-cagla@hotmail.de>';

export async function sendBookingConfirmation(booking: Booking, service: Service, adminEmail: string) {
  const transporter = createTransporter();
  const dateTimeStr = formatDateTime(booking.startsAt);
  const priceStr = `${service.priceEuro} €`;
  const durationStr = `${service.durationMinutes} Min.`;

  // HTML Template for customer
  const customerHtml = `
    <div style="font-family: sans-serif; background-color: #12110F; color: #F4F1EA; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid rgba(197, 168, 128, 0.2);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: serif; color: #C5A880; margin: 0; font-size: 28px; letter-spacing: 1px;">Damir & Cagla's</h1>
        <p style="color: #A8A398; font-size: 14px; text-transform: uppercase; margin: 5px 0 0 0; letter-spacing: 2px;">Massage-Praxis</p>
      </div>
      
      <div style="background-color: rgba(26, 24, 22, 0.8); padding: 30px; border-radius: 6px; border: 1px solid rgba(197, 168, 128, 0.1);">
        <h2 style="color: #C5A880; font-family: serif; font-size: 20px; margin-top: 0;">Hallo ${booking.customerName},</h2>
        <p style="line-height: 1.6; color: #F4F1EA; font-size: 16px;">Vielen Dank für Ihre Buchung! Ihr Termin ist verbindlich bei uns reserviert. Hier sind Ihre Details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; width: 30%; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Behandlung</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-weight: bold; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${booking.serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Datum & Uhrzeit</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-weight: bold; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${dateTimeStr} Uhr</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Dauer</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${durationStr}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Preis</td>
            <td style="padding: 10px 0; color: #C5A880; font-weight: bold; font-size: 16px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${priceStr}</td>
          </tr>
        </table>
        
        <p style="font-size: 14px; color: #A8A398; line-height: 1.6;">
          <strong>Hinweis zur Bezahlung:</strong> Die Bezahlung erfolgt vor Ort direkt in der Praxis (Bar oder EC-Zahlung).
        </p>
        
        <p style="font-size: 14px; color: #A8A398; line-height: 1.6; margin-top: 20px;">
          Sollten Sie Ihren Termin nicht wahrnehmen können, sagen Sie bitte mindestens 24 Stunden vorher ab. Sie können Ihren Termin über den folgenden Link stornieren:
        </p>
        
        <div style="text-align: center; margin-top: 25px; margin-bottom: 15px;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/cancel?id=${booking.id}" style="background-color: #7A2E2E; color: #F4F1EA; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block; border: 1px solid rgba(255, 255, 255, 0.1);">Termin stornieren</a>
        </div>
      </div>
      
      <div style="margin-top: 30px; text-align: center; color: #A8A398; font-size: 13px; line-height: 1.5;">
        <p><strong>Praxis-Adresse:</strong> Gerhart-Hauptmann-Straße 16, 30826 Garbsen</p>
        <p>Telefon / WhatsApp: 0157 34368 721</p>
      </div>
    </div>
  `;

  // HTML Template for Damir/Admin
  const adminHtml = `
    <div style="font-family: sans-serif; background-color: #12110F; color: #F4F1EA; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid rgba(197, 168, 128, 0.2);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: serif; color: #C5A880; margin: 0; font-size: 24px; letter-spacing: 1px;">Neue Buchung eingegangen!</h1>
      </div>
      
      <div style="background-color: rgba(26, 24, 22, 0.8); padding: 30px; border-radius: 6px; border: 1px solid rgba(197, 168, 128, 0.1);">
        <p style="line-height: 1.6; color: #F4F1EA; font-size: 16px;">Hallo Damir, eine neue Buchung wurde über das Online-System vorgenommen:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; width: 35%; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Kunde</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-weight: bold; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${booking.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Telefon</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);"><a href="tel:${booking.customerPhone}" style="color: #C5A880; text-decoration: none;">${booking.customerPhone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">E-Mail</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${booking.customerEmail || 'Nicht angegeben'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Behandlung</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-weight: bold; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${booking.serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Datum & Uhrzeit</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-weight: bold; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${dateTimeStr} Uhr</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Notiz</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-size: 14px; font-style: italic; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${booking.note || 'Keine'}</td>
          </tr>
        </table>
        
        <div style="text-align: center; margin-top: 25px; margin-bottom: 15px;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin" style="background-color: #C5A880; color: #12110F; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Admin Dashboard öffnen</a>
        </div>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log("=== MOCK EMAIL (SMTP not configured) ===");
    console.log(`To Customer (${booking.customerEmail}): Booking Confirmed! Date: ${dateTimeStr}, Service: ${booking.serviceName}`);
    console.log(`To Admin (${adminEmail}): New Booking! Customer: ${booking.customerName}, Phone: ${booking.customerPhone}, Time: ${dateTimeStr}`);
    console.log("=========================================");
    return;
  }

  try {
    // Send customer email if they provided one
    if (booking.customerEmail) {
      await transporter.sendMail({
        from: FROM_HEADER,
        to: booking.customerEmail,
        subject: `Terminbestätigung: ${booking.serviceName} bei Damir & Cagla`,
        html: customerHtml,
      });
    }

    // Send admin notification
    await transporter.sendMail({
      from: FROM_HEADER,
      to: adminEmail,
      subject: `NEUE BUCHUNG: ${booking.customerName} - ${dateTimeStr}`,
      html: adminHtml,
    });
  } catch (err) {
    console.error("Failed to send booking emails:", err);
  }
}

export async function sendCancellationNotice(booking: Booking, adminEmail: string, initiator: "admin" | "customer") {
  const transporter = createTransporter();
  const dateTimeStr = formatDateTime(booking.startsAt);

  const customerSubject = "Terminstornierung | Damir & Cagla's Massagepraxis";
  const customerHtml = `
    <div style="font-family: sans-serif; background-color: #12110F; color: #F4F1EA; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid rgba(197, 168, 128, 0.2);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: serif; color: #C5A880; margin: 0; font-size: 28px;">Termin storniert</h1>
      </div>
      
      <div style="background-color: rgba(26, 24, 22, 0.8); padding: 30px; border-radius: 6px; border: 1px solid rgba(197, 168, 128, 0.1);">
        <h2 style="color: #C5A880; font-family: serif; font-size: 20px; margin-top: 0;">Hallo ${booking.customerName},</h2>
        <p style="line-height: 1.6; color: #F4F1EA; font-size: 16px;">
          Ihr Termin für die **${booking.serviceName}** am **${dateTimeStr} Uhr** wurde ${initiator === "admin" ? "durch den Administrator" : "erfolgreich"} storniert.
        </p>
        <p style="line-height: 1.6; color: #A8A398; font-size: 14px;">
          Wir würden uns freuen, Sie bald wieder begrüßen zu dürfen. Sie können jederzeit einen neuen Termin über unsere Webseite vereinbaren.
        </p>
        
        <div style="text-align: center; margin-top: 25px; margin-bottom: 15px;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking" style="background-color: #C5A880; color: #12110F; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">Neuen Termin buchen</a>
        </div>
      </div>
    </div>
  `;

  const adminSubject = `TERMIN STORNIERT: ${booking.customerName} - ${dateTimeStr}`;
  const adminHtml = `
    <div style="font-family: sans-serif; background-color: #12110F; color: #F4F1EA; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid rgba(197, 168, 128, 0.2);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-family: serif; color: #7A2E2E; margin: 0; font-size: 24px;">Ein Termin wurde storniert!</h1>
      </div>
      
      <div style="background-color: rgba(26, 24, 22, 0.8); padding: 30px; border-radius: 6px; border: 1px solid rgba(197, 168, 128, 0.1);">
        <p style="line-height: 1.6; color: #F4F1EA; font-size: 16px;">
          Der folgende Termin wurde durch den ${initiator === "admin" ? "Administrator" : "Kunden"} storniert:
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; width: 35%; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Kunde</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-weight: bold; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${booking.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Behandlung</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${booking.serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #A8A398; font-size: 14px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">Datum & Uhrzeit</td>
            <td style="padding: 10px 0; color: #F4F1EA; font-weight: bold; font-size: 15px; border-bottom: 1px solid rgba(197, 168, 128, 0.1);">${dateTimeStr} Uhr</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log("=== MOCK EMAIL (SMTP not configured) ===");
    console.log(`To Customer (${booking.customerEmail}): Booking CANCELLED! Date: ${dateTimeStr}, Service: ${booking.serviceName}`);
    console.log(`To Admin (${adminEmail}): Booking CANCELLED! Customer: ${booking.customerName}, Time: ${dateTimeStr}`);
    console.log("=========================================");
    return;
  }

  try {
    if (booking.customerEmail) {
      await transporter.sendMail({
        from: FROM_HEADER,
        to: booking.customerEmail,
        subject: customerSubject,
        html: customerHtml,
      });
    }

    await transporter.sendMail({
      from: FROM_HEADER,
      to: adminEmail,
      subject: adminSubject,
      html: adminHtml,
    });
  } catch (err) {
    console.error("Failed to send cancellation emails:", err);
  }
}
