import {useState} from "react";

import clsx from "clsx";

import {TokenFeeInput} from "@/app/admin/tokens/forms/fee";
import {Button} from "@/components/ui/button";
import {TokenFeeConfig} from "@/types/admin";


type User = {
  id: string,
  name: string,
  username?: string,
};

type TokenBatchFeeFormProps = {
  users: User[],
  onSubmit: (userId: string, fee: TokenFeeConfig) => Promise<void>,
  onCancel: () => void,
  isSubmitting: boolean,
};

export function TokenBatchFeeForm({users, onSubmit, onCancel, isSubmitting}: TokenBatchFeeFormProps) {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [feeConfig, setFeeConfig] = useState<TokenFeeConfig>({
    inflow: {rate: 0, flat: 0},
    outflow: {rate: 0, flat: 0},
  });

  const handleSubmit = async () => {
    await onSubmit(selectedUserId, feeConfig);
  };

  const inputClassName = clsx(
    "flex h-9 w-full rounded-md border border-input bg-transparent",
    "px-3 py-1 text-sm shadow-sm transition-colors",
    "placeholder:text-muted-foreground",
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
  );

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">批次更新 Token 手續費</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium">使用者 (將更新該使用者的所有 Token)</label>
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

      <div className="mb-4">
        <TokenFeeInput value={feeConfig} onChange={setFeeConfig}/>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedUserId}
          isLoading={isSubmitting}
        >
          更新所有 Token
        </Button>
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
}
