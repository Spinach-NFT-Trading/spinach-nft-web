import {useState} from "react";

import clsx from "clsx";

import {Button} from "@/components/ui/button";


type User = {
  id: string,
  name: string,
  notes?: string,
};

type UserNotesFormProps = {
  user: User,
  onSubmit: (notes: string) => Promise<void>,
  onCancel: () => void,
  isSubmitting: boolean,
};

export function UserNotesForm({user, onSubmit, onCancel, isSubmitting}: UserNotesFormProps) {
  const [notes, setNotes] = useState(user.notes || "");

  const handleSubmit = async () => {
    await onSubmit(notes);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6">
      <h2 className="text-xl font-semibold">編輯備註 - {user.name}</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium">備註</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={clsx(
            "flex h-9 w-full rounded-md border border-input bg-transparent",
            "px-3 py-1 text-sm shadow-sm transition-colors",
            "placeholder:text-muted-foreground",
            `
              focus-visible:ring-1 focus-visible:ring-ring
              focus-visible:outline-none
            `,
            "h-24 resize-none",
          )}
          placeholder="輸入備註"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSubmit} disabled={isSubmitting} isLoading={isSubmitting}>
          儲存
        </Button>
        <Button variant="outline" onClick={onCancel}>
          取消
        </Button>
      </div>
    </div>
  );
}
