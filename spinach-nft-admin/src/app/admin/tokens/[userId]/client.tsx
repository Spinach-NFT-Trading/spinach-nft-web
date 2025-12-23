"use client";

import clsx from "clsx";
import Link from "next/link";
import {useCallback, useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {Prompt} from "@/components/ui/prompt";
import {
  createTokenAction,
  deleteTokenAction,
  listTokensForUserAction,
  updateTokenAction,
} from "@/controllers/token/action";

type Token = {
  token: string;
  webhook: string;
};

type FormMode = "none" | "create" | "edit";

type Props = {
  userId: string;
};

export function TokenManagementForUser({userId}: Props) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<FormMode>("none");
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [webhookValue, setWebhookValue] = useState("");

  // Delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [tokenToDelete, setTokenToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadTokens = useCallback(async () => {
    try {
      setLoading(true);
      const result = await listTokensForUserAction(userId);
      setTokens(result);
    } catch (e) {
      setError("載入 Token 失敗");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadTokens();
  }, [loadTokens]);

  const handleCreateToken = async () => {
    if (!webhookValue) {
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      await createTokenAction({
        userId,
        webhook: webhookValue,
      });
      setFormMode("none");
      setWebhookValue("");
      await loadTokens();
    } catch (e) {
      setError("建立 Token 失敗");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateToken = async () => {
    if (!selectedToken) {
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      await updateTokenAction({
        token: selectedToken.token,
        webhook: webhookValue,
      });
      setFormMode("none");
      setSelectedToken(null);
      setWebhookValue("");
      await loadTokens();
    } catch (e) {
      setError("更新 Token 失敗");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteToken = (token: string) => {
    setTokenToDelete(token);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteToken = async () => {
    if (!tokenToDelete) {
      return;
    }
    setIsDeleting(true);
    setError(null);

    try {
      await deleteTokenAction(tokenToDelete);
      setDeleteConfirmOpen(false);
      setTokenToDelete(null);
      await loadTokens();
    } catch (e) {
      setError("刪除 Token 失敗");
      console.error(e);
    } finally {
      setIsDeleting(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const inputClassName = clsx(
    "flex h-9 w-full rounded-md border border-input bg-transparent",
    "px-3 py-1 text-sm shadow-sm transition-colors",
    "placeholder:text-muted-foreground",
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
  );

  if (loading) {
    return <div className="text-muted-foreground">載入中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">使用者 Token 管理</h1>
        <Link href="/admin/users">
          <Button variant="outline">返回使用者管理</Button>
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-900/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={() => setFormMode("create")}>新增 Token</Button>
      </div>

      {/* Create Token Form */}
      {formMode === "create" && (
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">新增 Token</h2>
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
          <div className="flex gap-2">
            <Button
              onClick={handleCreateToken}
              disabled={isSubmitting || !webhookValue}
              isLoading={isSubmitting}
            >
              建立
            </Button>
            <Button variant="outline" onClick={() => setFormMode("none")}>
              取消
            </Button>
          </div>
        </div>
      )}

      {/* Edit Token Form */}
      {formMode === "edit" && selectedToken && (
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">編輯 Token</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium">Token</label>
            <code className="block rounded-sm bg-muted p-2 text-sm">{selectedToken.token}</code>
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
          <div className="flex gap-2">
            <Button
              onClick={handleUpdateToken}
              disabled={isSubmitting || !webhookValue}
              isLoading={isSubmitting}
            >
              儲存
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setFormMode("none");
                setSelectedToken(null);
              }}
            >
              取消
            </Button>
          </div>
        </div>
      )}

      {/* Token List */}
      <div className="rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Token</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Webhook</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">操作</th>
            </tr>
          </thead>
          <tbody>
            {tokens.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  此使用者尚無 Token
                </td>
              </tr>
            ) : (
              tokens.map((token) => (
                <tr key={token.token} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <code className="rounded-sm bg-muted px-2 py-1 text-xs">{token.token}</code>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {token.webhook.length > 50 ? `${token.webhook.slice(0, 50)}...` : token.webhook}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(token.token)}
                        className="text-blue-400 hover:bg-blue-900/20 hover:text-blue-300"
                      >
                        複製
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedToken(token);
                          setWebhookValue(token.webhook);
                          setFormMode("edit");
                        }}
                        className="text-green-400 hover:bg-green-900/20 hover:text-green-300"
                      >
                        編輯
                      </Button>
                      <Button
                        variant="ghostDestructive"
                        size="sm"
                        onClick={() => handleDeleteToken(token.token)}
                      >
                        刪除
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Prompt
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="確認刪除"
        description="確定要刪除此 Token 嗎？此操作無法復原。"
        confirmText="刪除"
        cancelText="取消"
        onConfirm={confirmDeleteToken}
        onCancel={() => setTokenToDelete(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
