"use client";

import Link from "next/link";
import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {
  changePasswordAction,
  createUserAction,
  deleteUserAction,
  listUsersAction,
  setUserRoleAction,
  updateUserNotesAction,
} from "@/controllers/user/action";
import {CreateUserData, UserCreateForm} from "@/app/admin/users/forms/create";
import {UserNotesForm} from "@/app/admin/users/forms/notes";
import {UserPasswordForm} from "@/app/admin/users/forms/password";
import {UserList} from "@/app/admin/users/list";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  username?: string;
  notes?: string;
};

type FormMode = "none" | "create" | "password" | "notes";

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<FormMode>("none");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const result = await listUsersAction();
      if (result && "users" in result) {
        setUsers(result.users as User[]);
      }
    } catch (e) {
      setError("載入使用者失敗");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (data: CreateUserData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createUserAction({
        username: data.username,
        password: data.password,
        name: data.name,
        notes: data.notes || undefined,
      });
      setFormMode("none");
      await loadUsers();
    } catch (e) {
      setError("建立使用者失敗");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (newPassword: string) => {
    if (!selectedUser) {
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      await changePasswordAction({
        userId: selectedUser.id,
        newPassword: newPassword,
      });
      setFormMode("none");
      setSelectedUser(null);
    } catch (e) {
      setError("修改密碼失敗");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateNotes = async (notes: string) => {
    if (!selectedUser) {
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      await updateUserNotesAction({
        userId: selectedUser.id,
        notes: notes,
      });
      setFormMode("none");
      setSelectedUser(null);
      await loadUsers();
    } catch (e) {
      setError("更新備註失敗");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("確定要刪除此使用者嗎？此操作無法復原。")) {
      return;
    }
    setError(null);

    try {
      await deleteUserAction(userId);
      await loadUsers();
    } catch (e) {
      setError("刪除使用者失敗");
      console.error(e);
    }
  };

  const handleSetRole = async (userId: string, role: string) => {
    if (!confirm(`確定要將此使用者設為 ${role === "admin" ? "管理員" : "一般使用者"} 嗎？`)) {
      return;
    }
    setError(null);

    try {
      await setUserRoleAction(userId, role);
      await loadUsers();
    } catch (e) {
      setError("設定角色失敗");
      console.error(e);
    }
  };

  if (loading) {
    return <div className="text-muted-foreground">載入中...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={() => setFormMode("create")}>新增使用者</Button>
        <Link href="/admin/tokens">
          <Button variant="outline">Token 管理</Button>
        </Link>
      </div>

      {/* Create User Form */}
      {formMode === "create" && (
        <UserCreateForm
          onSubmit={handleCreateUser}
          onCancel={() => setFormMode("none")}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Change Password Form */}
      {formMode === "password" && selectedUser && (
        <UserPasswordForm
          user={selectedUser}
          onSubmit={handleChangePassword}
          onCancel={() => {
            setFormMode("none");
            setSelectedUser(null);
          }}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Edit Notes Form */}
      {formMode === "notes" && selectedUser && (
        <UserNotesForm
          key={selectedUser.id}
          user={selectedUser}
          onSubmit={handleUpdateNotes}
          onCancel={() => {
            setFormMode("none");
            setSelectedUser(null);
          }}
          isSubmitting={isSubmitting}
        />
      )}

      {/* User List */}
      <UserList
        users={users}
        onSetRole={handleSetRole}
        onChangePassword={(user) => {
          setSelectedUser(user);
          setFormMode("password");
        }}
        onEditNotes={(user) => {
          setSelectedUser(user);
          setFormMode("notes");
        }}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}
