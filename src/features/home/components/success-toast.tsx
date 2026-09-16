"use client";

import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type SuccessToastProps = {
  show: boolean;
  link: string;
  title: string;
};

export default function SuccessToast({ show, link, title }: SuccessToastProps) {
  const shown = useRef(false);

  const router = useRouter();
  useEffect(() => {
    if (!show || shown.current) return;
    toast.success(title);
    shown.current = true; // Prevent toast from showing twice in dev.
    router.replace(link);
  }, [show, router]);

  return null;
}
