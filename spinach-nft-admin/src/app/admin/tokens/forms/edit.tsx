import clsx from "clsx";
import {useState} from "react";

import {Button} from "@/components/ui/button";

type Token = {
  token: string;
  webhook: string;
  note?: string;
  accountId: string;
};

export type UpdateTokenData = {
  token: string;
  webhook: string;
  note?: string;
};

type TokenEditFormProps = {
  token: Token;
  onSubmit: (data: UpdateTokenData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
};

export function TokenEditForm({token, onSubmit, onCancel, isSubmitting}: TokenEditFormProps) {
  const [webhookValue, setWebhookValue] = useState(token.webhook);
  const [noteValue, setNoteValue] = useState(token.note || "");

  const handleSubmit = async () => {
    await onSubmit({
      token: token.token,
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
      <h2 className="text-xl font-semibold">編輯 Token</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium">Token</label>
        <code className="block rounded-sm bg-muted p-2 text-sm">{token.token}</code>
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
      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !webhookValue}
          isLoading={isSubmitting}
        >
          儲存
        </Button>
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
}
