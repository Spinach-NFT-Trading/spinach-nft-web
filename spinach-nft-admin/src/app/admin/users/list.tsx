import clsx from "clsx";
import Link from "next/link";

import {Button} from "@/components/ui/button";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  username?: string;
  notes?: string;
};

type UserListProps = {
  users: User[];
  onSetRole: (userId: string, role: string) => void;
  onChangePassword: (user: User) => void;
  onEditNotes: (user: User) => void;
  onDelete: (userId: string) => void;
};

export function UserList({
  users,
  onSetRole,
  onChangePassword,
  onEditNotes,
  onDelete,
}: UserListProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">帳號</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">名稱</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">角色</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">備註</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30">
              <td className="px-4 py-3 text-sm">{user.username || user.email}</td>
              <td className="px-4 py-3 text-sm">{user.name}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={clsx(
                    "rounded-full px-2 py-1 text-xs",
                    user.role === "admin"
                      ? "bg-blue-900/30 text-blue-400"
                      : "bg-gray-800 text-gray-400",
                  )}
                >
                  {user.role === "admin" ? "管理員" : "使用者"}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">{user.notes || "-"}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  {user.role !== "admin" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSetRole(user.id, "admin")}
                      className="text-blue-400 hover:bg-blue-900/20 hover:text-blue-300"
                    >
                      設為管理
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onChangePassword(user)}
                    className="text-blue-400 hover:bg-blue-900/20 hover:text-blue-300"
                  >
                    改密碼
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditNotes(user)}
                    className="text-green-400 hover:bg-green-900/20 hover:text-green-300"
                  >
                    備註
                  </Button>
                  <Link href={`/admin/tokens/${user.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:bg-purple-900/20 hover:text-purple-300"
                    >
                      Token
                    </Button>
                  </Link>
                  {user.role !== "admin" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(user.id)}
                      className="text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    >
                      刪除
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
