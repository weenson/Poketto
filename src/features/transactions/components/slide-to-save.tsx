"use client";
import React, { useState, useRef } from "react";
import { ChevronsRight, Loader2 } from "lucide-react";

type SlideToSaveProps = {
  onSave: () => void;
  disabled?: boolean;
  label:
    | "Slide to save"
    | "Add amount"
    | "Add category"
    | "Add amount & category"
    | "Exceeded goal balance"
    | "Saving...";
  loading?: boolean;
};

export default function SlideToSave({
  onSave,
  disabled,
  label,
  loading,
}: SlideToSaveProps) {
  const THUMB_SIZE = 64;
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const [dragging, setDragging] = useState(false);

  function getMaxOffset() {
    const trackWidth = trackRef.current?.getBoundingClientRect().width ?? 0;
    return trackWidth - THUMB_SIZE - 8;
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (disabled || loading) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startOffset.current = offset;
    setDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (disabled || loading) return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

    const delta = e.clientX - startX.current;
    const next = startOffset.current + delta;
    const max = getMaxOffset();

    setOffset(Math.min(Math.max(next, 0), max));
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (disabled || loading) return;
    const max = getMaxOffset();
    if (offset >= max) {
      onSave();
    } else {
      setOffset(0);
    }
    setDragging(false);
  }

  return (
    <div ref={trackRef} className="relative bg-muted rounded-2xl h-18 w-full">
      <span className="absolute inset-0 flex items-center justify-center text-muted-text text-sm">
        {label}
      </span>
      {!disabled && (
        <div
          className="absolute top-1 left-1 h-16 rounded-2xl bg-black/50"
          style={{ width: offset + THUMB_SIZE }}
        />
      )}
      <div
        className={`absolute ${disabled ? "bg-muted" : "bg-black"} top-1 left-1 h-16 w-16 rounded-2xl text-white flex justify-center items-center touch-none ${dragging ? "" : "transition-transform duration-200 ease-out"}`}
        style={{ transform: `translateX(${offset}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          !disabled && <ChevronsRight />
        )}
      </div>
    </div>
  );
}
