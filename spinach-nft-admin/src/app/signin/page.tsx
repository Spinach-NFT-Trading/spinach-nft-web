"use client";
import clsx from "clsx";
import {useRouter} from "next/navigation";
import {useState} from "react";

import {authClient} from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Auto-generate a placeholder email from username
        // Better Auth requires email, but user doesn't need to know/enter it
        const generatedEmail = `${username}@admin.local`;

        const {data, error} = await authClient.signUp.email({
          email: generatedEmail,
          password,
          name,
          username,
        });

        if (error) {
          setError(error.message || "註冊失敗，請再試一次");
        } else if (data) {
          // Registration successful, redirect to home
          router.push("/");
        }
      } else {
        // Sign In with username
        const {data, error} = await authClient.signIn.username({
          username,
          password,
        });

        if (error) {
          setError(error.message || "登入失敗，請檢查您的帳號或密碼");
        } else if (data) {
          // Login successful, redirect to home
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 text-card-foreground shadow-xl">
        <div className="flex flex-col space-y-1">
          <h1 className="text-center text-3xl font-semibold tracking-tight">
            {isSignUp ? "建立帳戶" : "歡迎回來"}
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "請輸入詳細資料以建立您的管理員帳戶" : "請輸入您的登入資訊以存取管理面板"}
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
          {isSignUp && (
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
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
          </div>

          <button type="submit" disabled={isLoading} className={clsx(
            "inline-flex h-9 w-full items-center justify-center rounded-md",
            "bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
            "shadow-sm transition-colors",
            "hover:bg-primary/90",
            "focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
            "disabled:pointer-events-none disabled:opacity-50",
          )}>
            {isLoading ? "處理中..." : isSignUp ? "註冊" : "登入"}
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-sm text-muted-foreground hover:underline"
          >
            {isSignUp ? "已有帳戶？登入" : "沒有帳戶？註冊"}
          </button>
        </div>
      </div>
    </div>
  );
}
