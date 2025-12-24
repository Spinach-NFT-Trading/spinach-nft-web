"use client";

import clsx from "clsx";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
 
import {Button} from "@/components/ui/button";

import {checkHasUsersAction} from "@/controllers/user/action";
import {authClient} from "@/lib/auth-client";

type PageState = "loading" | "firstSetup" | "login";

const SignIn = () => {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("loading");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if any users exist
    checkHasUsersAction()
      .then((hasUsers) => {
        setPageState(hasUsers ? "login" : "firstSetup");
      })
      .catch(() => {
        // Default to login on error
        setPageState("login");
      });
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (pageState === "firstSetup") {
        // First user setup - create admin account
        const generatedEmail = `${username}@admin.local`;

        const {data, error} = await authClient.signUp.email({
          email: generatedEmail,
          password,
          name,
          username,
        });

        if (error) {
          setError(error.message || "建立管理員帳號失敗，請再試一次");
        } else if (data) {
          // Set the first user as admin
          // This is handled by the API route after signup
          router.push("/");
        }
      } else {
        // Normal login
        const {data, error} = await authClient.signIn.username({
          username,
          password,
        });

        if (error) {
          setError(error.message || "登入失敗，請檢查您的帳號或密碼");
        } else if (data) {
          router.push("/");
        }
      }
    } catch (e) {
      setError("發生未知錯誤，請稍後再試");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClassName = clsx(
    "flex h-9 w-full rounded-md border border-input bg-transparent",
    "px-3 py-1 text-sm shadow-sm transition-colors",
    "placeholder:text-muted-foreground",
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
  );

  if (pageState === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="text-muted-foreground">載入中...</div>
      </div>
    );
  }

  const isFirstSetup = pageState === "firstSetup";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 text-card-foreground shadow-xl">
        <div className="flex flex-col space-y-1">
          <h1 className="text-center text-3xl font-semibold tracking-tight">
            {isFirstSetup ? "建立管理員帳戶" : "歡迎回來"}
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            {isFirstSetup
              ? "請輸入詳細資料以建立第一位管理員帳戶"
              : "請輸入您的登入資訊以存取管理面板"}
          </p>
        </div>

        {error && (
          <div className="rounded-md border border-red-800 bg-red-900/20 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          {isFirstSetup && (
            <div className="space-y-2">
              <label className="text-sm leading-none font-medium">顯示名稱</label>
              <input
                type="text"
                placeholder="王小明"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClassName}
                autoComplete="name"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm leading-none font-medium">帳號</label>
            <input
              type="text"
              placeholder="username123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={inputClassName}
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm leading-none font-medium">密碼</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClassName}
              autoComplete={isFirstSetup ? "new-password" : "current-password"}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            <Button className="w-full" isLoading={isLoading}>
              {isLoading ? "處理中..." : isFirstSetup ? "建立管理員帳戶" : "登入"}
            </Button>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
