"use client";

import { ImagePlus, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage(e: React.MouseEvent) {
    e.preventDefault();

    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  }
  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-muted-text">Upload image</p>
      <label
        htmlFor="goal-image"
        className="flex aspect-square w-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-white border-3 border-muted border-dashed border-rounded"
      >
        {preview ? (
          <div className="group relative h-full w-full">
            <img
              src={preview}
              alt="Goal preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 "
              onClick={(e) => removeImage(e)}
            >
              <X className="h-8 w-8 text-white" />
            </button>
          </div>
        ) : (
          <span className="flex flex-col items-center gap-2 text-muted-text">
            <ImagePlus className="h-8 w-8" />
            <span className="text-xs">Add a photo</span>
          </span>
        )}
      </label>
      <input
        id="goal-image"
        name="image"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
      />
    </div>
  );
}
