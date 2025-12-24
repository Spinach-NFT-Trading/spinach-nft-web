import {redirect} from "next/navigation";

import {getSession} from "@/lib/session";
import {ReportsTabs} from "@/app/admin/reports/reports-tabs";

export default async function AdminReportsPage() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-foreground">交易報表</h1>
        <ReportsTabs />
      </div>
    </main>
  );
}
