"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeClosed, Lock, Mail, User, Loader2 } from "lucide-react";
import Link from "next/link";
import Button from "@/components/button";

export default function SignUp() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordType = passwordVisible ? "text" : "password";
  const confirmType = confirmVisible ? "text" : "password";
  const passwordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  const passwordTooShort = password.length > 0 && password.length < 8;

  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (password !== confirmPassword) return;
    if (passwordTooShort) return;
    setFormError(null);
    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setFormError(error.message ?? "Couldn’t create account");
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
            Create Account <span>✨</span>
          </h1>
          <p className="text-muted-text">
            Sign up and start tracking your money today.
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
              <User className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
            </div>
            <div className="group relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
            </div>
            <div className="group relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
              <input
                type={passwordType}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
                className="w-full border border-muted-text rounded-lg p-3 pl-12 pr-12 font-medium text-sm outline-primary focus:border-primary focus:text-black"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? (
                  <Eye className="text-muted-text" />
                ) : (
                  <EyeClosed className="text-muted-text" />
                )}
              </button>
            </div>
            {passwordTooShort && (
              <p className="text-danger text-sm">
                Password must be at least 8 characters
              </p>
            )}
            <div className="group relative">
              <Lock
                className={`pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text ${passwordMismatch ? "group-focus-within:text-danger" : "group-focus-within:text-primary"}`}
              />
              <input
                type={confirmType}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                autoComplete="new-password"
                className={`w-full border rounded-lg p-3 pl-12 pr-12 font-medium text-sm focus:text-black ${passwordMismatch ? "border-danger outline-danger focus:border-danger" : "border-muted-text outline-primary focus:border-primary"}`}
              />
              <button
                type="button"
                onClick={() => setConfirmVisible(!confirmVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label={confirmVisible ? "Hide password" : "Show password"}
              >
                {confirmVisible ? (
                  <Eye className="text-muted-text" />
                ) : (
                  <EyeClosed className="text-muted-text" />
                )}
              </button>
            </div>
            {passwordMismatch && (
              <p className="text-danger text-sm">Passwords do not match</p>
            )}
          </div>
          {formError && <p className="text-danger text-sm">{formError}</p>}
          <Button
            variant="black"
            size="sm"
            justify="center"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign up"}
          </Button>
        </form>
        <div className="flex justify-center bg-muted p-2 rounded-lg w-full">
          <Link href="/login" className="text-sm">
            Already have an account? <span className="underline">Log in.</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
