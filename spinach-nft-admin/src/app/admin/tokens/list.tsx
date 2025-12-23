import {useState} from "react";

import {Button} from "@/components/ui/button";

type Token = {
  token: string;
  webhook: string;
  note?: string;
  accountId: string;
};

type User = {
  id: string;
  name: string;
  username?: string;
};

type TokenListProps = {
  tokens: Token[];
  users: User[];
  onDelete: (token: string) => void;
  onEdit: (token: Token) => void;
};

export function TokenList({tokens, users, onDelete, onEdit}: TokenListProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const getUserName = (accountId: string) => {
    const user = users.find((u) => u.id === accountId);
    return user?.name || user?.username || accountId;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToken(text);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">使用者</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Token</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Webhook</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">備註</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">操作</th>
          </tr>
        </thead>
        <tbody>
          {tokens.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                尚無 Token
              </td>
            </tr>
          ) : (
            tokens.map((token) => (
              <tr key={token.token} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 text-sm">{getUserName(token.accountId)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => copyToClipboard(token.token)}
                    className="group relative cursor-pointer rounded-sm bg-muted px-2 py-1 font-mono text-xs transition-colors hover:bg-muted-foreground/20"
                    title="點擊複製"
                  >
                    {token.token.slice(0, 8)}...
                    {copiedToken === token.token && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-sm bg-black px-2 py-1 text-xs text-white">
                        已複製!
                      </span>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {token.webhook.length > 40 ? `${token.webhook.slice(0, 40)}...` : token.webhook}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{token.note || "-"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(token)}
                      className="text-green-400 hover:bg-green-900/20 hover:text-green-300"
                    >
                      編輯
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(token.token)}
                      className="text-red-400 hover:bg-red-900/20 hover:text-red-300"
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
  );
}
