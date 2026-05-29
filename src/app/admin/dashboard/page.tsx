import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { readData } from "@/lib/store";
import AdminDashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // 1. Strict Server-Side Security Guard
  const authorized = await isAdmin();
  if (!authorized) {
    redirect("/admin/login");
  }

  // 2. Load all current dataset cleanly on the server
  const storeData = readData();

  return (
    <AdminDashboardClient 
      initialData={storeData} 
    />
  );
}
