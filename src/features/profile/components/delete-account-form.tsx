"use client";

import { useState } from "react";
import { Eye, EyeClosed, Lock } from "lucide-react";
import Button from "@/components/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DeleteAccountForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { error: deleteError } = await authClient.deleteUser({
        password,
      });
      if (deleteError) {
        setError(deleteError.message ?? "Couldn’t delete account");
        return;
      }
      router.push("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
      <p className="text-sm text-muted-text">
        This permanently deletes your account, goals, and transactions. Enter
        your password to confirm.
      </p>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-muted-text"
        >
          Password
        </label>
        <div className="group relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
          <input
            id="password"
            type={visible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-muted-text p-3 pl-12 pr-12 text-sm font-medium outline-primary focus:border-primary"
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <Eye className="text-muted-text" />
            ) : (
              <EyeClosed className="text-muted-text" />
            )}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button
        type="submit"
        variant="muted"
        size="md"
        justify="center"
        disabled={loading}
      >
        <span className="text-sm font-medium text-danger">
          {loading ? "Deleting..." : "Delete account"}
        </span>
      </Button>
    </form>
  );
}
