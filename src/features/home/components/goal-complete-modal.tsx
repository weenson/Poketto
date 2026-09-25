"use client";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import confetti from "canvas-confetti";

export default function GoalCompleteModal({ title }: { title?: string }) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!title || !canvasRef.current) return;
    const fire = confetti.create(canvasRef.current, { resize: true });
    fire({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }, [title]);

  if (!title) return null;

  return (
    <Modal
      open
      confetti={
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      }
      onClose={() => router.replace("/")}
    >
      <p className="text-center text-lg font-semibold">{title} reached!</p>
      <p className="mt-1 text-center text-sm text-muted-text">Goal completed</p>
      <button
        className="mt-4 w-full rounded-2xl bg-primary py-3 text-white"
        onClick={() => router.replace("/")}
      >
        Nice!
      </button>
    </Modal>
  );
}
