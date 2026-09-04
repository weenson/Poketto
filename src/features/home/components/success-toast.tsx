"use client";

import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SuccessToast({ show }: { show: boolean }) {
  const shown = useRef(false);

  const router = useRouter();
  useEffect(() => {
    if (!show || shown.current) return;
    toast.success("Transaction saved");
    shown.current = true; // Prevent toast from showing twice in dev.
    router.replace("/");
  }, [show, router]);

  return null;
}
