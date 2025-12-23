"use client";

import {AlertDialog} from "@base-ui/react/alert-dialog";
import {clsx} from "clsx";
import * as React from "react";

import {Button} from "@/components/ui/button";

export type PromptProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  requiredInput?: string;
  inputPlaceholder?: string;
  isLoading?: boolean;
};

export function Prompt({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "確認",
  cancelText = "取消",
  onConfirm,
  onCancel,
  requiredInput,
  inputPlaceholder,
  isLoading,
}: PromptProps) {
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setInputValue("");
    }
  }, [open]);

  const isConfirmDisabled = requiredInput ? inputValue !== requiredInput : false;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const inputClassName = clsx(
    "flex h-9 w-full rounded-md border border-input bg-transparent",
    "px-3 py-1 text-sm shadow-sm transition-colors",
    "placeholder:text-muted-foreground",
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
  );

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop
          forceRender
          className={clsx(
            "fixed inset-0 z-50 bg-black/80",
            "transition-all duration-200 ease-in-out",
            "data-[starting-style]:opacity-0",
            "data-[ending-style]:opacity-0",
          )}
        />
        <AlertDialog.Popup
          className={clsx(
            "fixed top-[50%] left-[50%] z-50 w-full max-w-lg -translate-1/2",
            "gap-4 border border-border bg-background p-6 shadow-lg",
            "rounded-lg",
            "transition-all duration-200 ease-in-out",
            "data-[starting-style]:translate-y-[-40%] data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:translate-y-[-40%] data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          )}
        >
          <div className="flex flex-col space-y-2 text-center sm:text-left">
            <AlertDialog.Title className="text-lg font-semibold">{title}</AlertDialog.Title>
            {description && (
              <AlertDialog.Description className="text-sm text-muted-foreground">
                {description}
              </AlertDialog.Description>
            )}
          </div>

          {requiredInput !== undefined && (
            <div className="py-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputPlaceholder}
                className={inputClassName}
                autoFocus
              />
            </div>
          )}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2">
            <AlertDialog.Close
              render={<Button variant="outline" onClick={handleCancel}>{cancelText}</Button>}
            />
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={isConfirmDisabled || isLoading}
              isLoading={isLoading}
            >
              {confirmText}
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
