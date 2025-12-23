import clsx from "clsx";
import {useState} from "react";

import {Button} from "@/components/ui/button";

type User = {
  id: string;
  name: string;
  username?: string;
};

export type CreateTokenData = {
  userId: string;
  webhook: string;
  note?: string;
};

type TokenCreateFormProps = {
  users: User[];
  onSubmit: (data: CreateTokenData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
};

export function TokenCreateForm({users, onSubmit, onCancel, isSubmitting}: TokenCreateFormProps) {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [webhookValue, setWebhookValue] = useState("");
  const [noteValue, setNoteValue] = useState("");

  const handleSubmit = async () => {
    await onSubmit({
      userId: selectedUserId,
      webhook: webhookValue,
      note: noteValue || undefined,
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
      <h2 className="text-xl font-semibold">新增 Token</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">使用者</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className={inputClassName}
          >
            <option value="">選擇使用者</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.username || user.id})
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Webhook URL</label>
          <input
            type="text"
            value={webhookValue}
            onChange={(e) => setWebhookValue(e.target.value)}
            className={inputClassName}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">備註</label>
          <input
            type="text"
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            className={inputClassName}
            placeholder="選填"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedUserId || !webhookValue}
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
