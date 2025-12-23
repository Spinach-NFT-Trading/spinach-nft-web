import {redirect} from "next/navigation";

import {getSession} from "@/lib/session";
import {UserManagement} from "@/app/admin/users/client";

export default async function AdminUsersPage() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-foreground">使用者管理</h1>
        <UserManagement/>
      </div>
    </main>
  );
}
