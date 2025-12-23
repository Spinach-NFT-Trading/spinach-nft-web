import {redirect} from "next/navigation";

import {getSession} from "@/lib/session";
import {TokenManagementForUser} from "@/app/admin/tokens/[userId]/client";

type Props = {
  params: Promise<{userId: string}>;
};

export default async function AdminUserTokensPage({params}: Props) {
  const session = await getSession();
  const {userId} = await params;

  if (!session || session.user.role !== "admin") {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <TokenManagementForUser userId={userId} />
      </div>
    </main>
  );
}
