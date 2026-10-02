"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import Button from "@/components/button";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logOut() {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: () => {
          setLoading(false);
        },
      },
    });
  }

  return (
    <Button
      variant="muted"
      size="md"
      justify="center"
      onClick={logOut}
      disabled={loading}
      type="button"
    >
      <LogOut className="mr-2 h-5 w-5 text-danger" />
      <span className="text-sm font-medium text-danger">
        {loading ? "Logging out..." : "Log out"}
      </span>
    </Button>
  );
}
