import "server-only";

import crypto from "node:crypto";
import { cookies, headers } from "next/headers";

const cookieName = "damir_admin_session";
const defaultPassword = "damir-admin-2026";

function secret() {
  return process.env.AUTH_SECRET || "local-development-secret-change-in-coolify";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

function timingSafeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || defaultPassword;
  return timingSafeEqual(password, expected);
}

export function createSessionValue() {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 14;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function isValidSession(value?: string) {
  if (!value) return false;
  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) return false;
  return timingSafeEqual(signature, sign(expiresAt));
}

export async function isAdmin() {
  const cookieStore = await cookies();
  return isValidSession(cookieStore.get(cookieName)?.value);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  
  // Detect if protocol is HTTPS (either via reverse proxy header or referer)
  const xForwardedProto = headerStore.get("x-forwarded-proto");
  const referer = headerStore.get("referer") || "";
  const isHttps = xForwardedProto === "https" || referer.startsWith("https://");

  cookieStore.set(cookieName, createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: isHttps,
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
