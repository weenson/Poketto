"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Mail, Eye, EyeClosed, Loader2 } from "lucide-react";
import Link from "next/link";
import Button from "@/components/button";

export default function LogIn() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const passwordType = visible === false ? "password" : "text";

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setFormError(null);

    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error) {
        setFormError(error.message ?? "Couldn’t log in");
        return;
      }

      if (data) {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="mb-4">
        <div className="text-center">
          <h1 className="text-black text-3xl font-bold">
            Welcome Back <span>👋</span>
          </h1>
          <p className="text-muted-text">
            Enter your credentials and start saving smart.
          </p>
        </div>
      </section>
      <section>
        <form
          className="flex flex-col gap-4 mb-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-3">
            <div className="group relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-text  group-focus-within:text-primary" />
              <input
                type={passwordType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
              <button type="button" onClick={() => setVisible(!visible)}>
                {visible === false ? (
                  <EyeClosed className="absolute right-3 top-2.5 text-muted-text" />
                ) : (
                  <Eye className="absolute right-3 top-2.5 text-muted-text" />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between">
              <Link href="/" className="text-sm underline">
                Forgot your password?
              </Link>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe" className="text-sm">
                  Remember me
                </label>
              </div>
            </div>
            {formError && <p className="text-danger text-sm">{formError}</p>}
            <Button
              variant="black"
              size="sm"
              justify="center"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Log in"}
            </Button>
          </div>
        </form>
        <div className="flex justify-center bg-muted p-2 rounded-lg w-full">
          <Link href="/signup" className="text-sm">
            Don't have an account?{" "}
            <span className="underline">Sign Up free.</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
