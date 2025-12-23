"use client";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {useState} from "react";

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

        const { data, error } = await authClient.signUp.email({
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
        const { data, error } = await authClient.signIn.username({
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card text-card-foreground border border-border rounded-lg shadow-xl">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-center">
            {isSignUp ? "建立帳戶" : "歡迎回來"}
          </h1>
          <p className="text-sm text-center text-muted-foreground">
            {isSignUp
              ? "請輸入詳細資料以建立您的管理員帳戶"
              : "請輸入您的登入資訊以存取管理面板"}
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md">
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
              <label className="text-sm font-medium leading-none">
                顯示名稱
              </label>
              <input
                type="text"
                placeholder="王小明"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                autoComplete="name"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              帳號
            </label>
            <input
              type="text"
              placeholder="username123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              密碼
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center w-full h-9 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors rounded-md shadow bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
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
            className="text-sm hover:underline text-muted-foreground"
          >
            {isSignUp ? "已有帳戶？登入" : "沒有帳戶？註冊"}
          </button>
        </div>
      </div>
    </div>
  );
}
