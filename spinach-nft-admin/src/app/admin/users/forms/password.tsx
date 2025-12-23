import clsx from "clsx";
import {useState} from "react";

import {Button} from "@/components/ui/button";

type User = {
  id: string;
  name: string;
};

type UserPasswordFormProps = {
  user: User;
  onSubmit: (password: string) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
};

export function UserPasswordForm({user, onSubmit, onCancel, isSubmitting}: UserPasswordFormProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await onSubmit(password);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">修改密碼 - {user.name}</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium">新密碼</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={clsx(
            "flex h-9 w-full rounded-md border border-input bg-transparent",
            "px-3 py-1 text-sm shadow-sm transition-colors",
            "placeholder:text-muted-foreground",
            "focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
          )}
          placeholder="輸入新密碼"
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !password}
          isLoading={isSubmitting}
        >
          更新密碼
        </Button>
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
}
