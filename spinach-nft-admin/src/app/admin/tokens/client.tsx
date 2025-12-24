"use client";

import Link from "next/link";
import {useEffect, useState} from "react";

import {Button} from "@/components/ui/button";
import {
  batchUpdateTokenFeesAction,
  createTokenAction,
  deleteTokenAction,
  listAllTokensAction,
  updateTokenAction,
} from "@/controllers/token/action";
import {listUsersAction} from "@/controllers/user/action";
import {CreateTokenData, TokenCreateForm} from "@/app/admin/tokens/forms/create";
import {TokenEditForm, UpdateTokenData} from "@/app/admin/tokens/forms/edit";
import {TokenBatchFeeForm} from "@/app/admin/tokens/forms/batch";
import {TokenList} from "@/app/admin/tokens/list";
import {Token, TokenFeeConfig} from "@/types/admin";


type User = {
  id: string;
  name: string;
  username?: string;
};

type FormMode = "none" | "create" | "edit" | "batch";

export const TokenManagementAll = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<FormMode>("none");
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tokenResult, userResult] = await Promise.all([
        listAllTokensAction(),
        listUsersAction(),
      ]);
      setTokens(tokenResult);
      if (userResult && "users" in userResult) {
        setUsers(userResult.users as User[]);
      }
    } catch (e) {
      setError("載入資料失敗");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateToken = async (data: CreateTokenData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createTokenAction({
        userId: data.userId,
        webhook: data.webhook,
        note: data.note,
        fee: data.fee,
      });
      setFormMode("none");
      await loadData();
    } catch (e) {
      setError("建立 Token 失敗");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateToken = async (data: UpdateTokenData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await updateTokenAction({
        token: data.token,
        webhook: data.webhook,
        note: data.note,
        fee: data.fee,
      });
      setFormMode("none");
      setSelectedToken(null);
      await loadData();
    } catch (e) {
      setError("更新 Token 失敗");
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteToken = async (token: string) => {
    if (!confirm("確定要刪除此 Token 嗎？")) {
      return;
    }
    setError(null);

    try {
      await deleteTokenAction(token);
      await loadData();
    } catch (e) {
      setError("刪除 Token 失敗");
      console.error(e);
    }
  };

  const handleBatchUpdate = async (userId: string, fee: TokenFeeConfig) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await batchUpdateTokenFeesAction(userId, fee);
      setFormMode("none");
      await loadData();
    } catch (e) {
      setError("批次更新 Token 失敗");
      console.error(e);
    } finally {
      setIsSubmitting(false);
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
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={() => setFormMode("create")}>新增 Token</Button>
        <Button onClick={() => setFormMode("batch")} variant="outline">
          批次更新手續費
        </Button>
        <Link href="/admin/reports">
          <Button variant="outline">交易報表</Button>
        </Link>
        <Link href="/admin/users">
          <Button variant="outline">返回使用者管理</Button>
        </Link>
      </div>

      {/* Create Token Form */}
      {formMode === "create" && (
        <TokenCreateForm
          users={users}
          onSubmit={handleCreateToken}
          onCancel={() => setFormMode("none")}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Batch Update Form */}
      {formMode === "batch" && (
        <TokenBatchFeeForm
          users={users}
          onSubmit={handleBatchUpdate}
          onCancel={() => setFormMode("none")}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Edit Token Form */}
      {formMode === "edit" && selectedToken && (
        <TokenEditForm
          key={selectedToken.token}
          token={selectedToken}
          onSubmit={handleUpdateToken}
          onCancel={() => {
            setFormMode("none");
            setSelectedToken(null);
          }}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Token List */}
      <TokenList
        tokens={tokens}
        users={users}
        onDelete={handleDeleteToken}
        onEdit={(token) => {
          setSelectedToken(token);
          setFormMode("edit");
        }}
      />
    </div>
  );
}
