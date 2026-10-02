"use client";

import { useState } from "react";
import { User } from "lucide-react";
import Button from "@/components/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ManageAccountForm({
  initialName,
}: {
  initialName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { error: updateError } = await authClient.updateUser({
        name: name.trim(),
      });
      if (updateError) {
        setError(updateError.message ?? "Couldn’t update profile");
        return;
      }
      router.push("/profile");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-muted-text"
        >
          Name
        </label>
        <div className="group relative">
          <User className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-text group-focus-within:text-primary" />
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            className="w-full rounded-2xl border border-muted-text p-3 pl-12 text-sm font-medium outline-primary focus:border-primary"
          />
        </div>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        size="md"
        justify="center"
        disabled={loading}
      >
        <span className="text-sm font-medium">
          {loading ? "Saving..." : "Save changes"}
        </span>
      </Button>
    </form>
  );
}
