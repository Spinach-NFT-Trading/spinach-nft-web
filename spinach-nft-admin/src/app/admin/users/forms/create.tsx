import {useState} from "react";

import clsx from "clsx";

import {Button} from "@/components/ui/button";


export type CreateUserData = {
  username: string,
  password: string,
  name: string,
  notes: string,
};

type UserCreateFormProps = {
  onSubmit: (data: CreateUserData) => Promise<void>,
  onCancel: () => void,
  isSubmitting: boolean,
};

export function UserCreateForm({onSubmit, onCancel, isSubmitting}: UserCreateFormProps) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const handleSubmit = async () => {
    await onSubmit({
      username: newUsername,
      password: newPassword,
      name: newName,
      notes: newNotes,
    });
  };

  const inputClassName = clsx(
    "flex h-9 w-full rounded-md border border-input bg-transparent",
    "px-3 py-1 text-sm shadow-sm transition-colors",
    "placeholder:text-muted-foreground",
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
  );

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">新增使用者</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">帳號</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className={inputClassName}
            placeholder="username"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">密碼</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClassName}
            placeholder="password"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">顯示名稱</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={inputClassName}
            placeholder="王小明"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">備註</label>
          <input
            type="text"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            className={inputClassName}
            placeholder="選填"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !newUsername || !newPassword || !newName}
          isLoading={isSubmitting}
        >
          建立
        </Button>
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
}
