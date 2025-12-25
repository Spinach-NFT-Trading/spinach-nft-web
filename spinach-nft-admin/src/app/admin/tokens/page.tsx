import {redirect} from "next/navigation";

import {TokenManagementAll} from "@/app/admin/tokens/client";
import {getSession} from "@/lib/session";


export default async function AdminTokensPage() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Token 管理</h1>
        <TokenManagementAll/>
      </div>
    </main>
  );
}
