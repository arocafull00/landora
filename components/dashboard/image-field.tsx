"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import type { AssetRow } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATIC_OPTIONS = [
  "/toll-story/hero.png",
  "/toll-story/toll7.jpeg",
  "/toll-story/toll6.jpeg",
  "/toll-story/toll5.jpeg",
  "/toll-story/toll4.jpeg",
  "/toll-story/toll3.jpeg",
  "/toll-story/toll2.jpeg",
  "/toll-story/toll1.jpg",
];

export function ImageField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [assets, setAssets] = useState<AssetRow[]>([]);

  useEffect(() => {
    fetch("/api/assets")
      .then((r) => r.json())
      .then((data: AssetRow[]) => {
        if (Array.isArray(data)) setAssets(data);
      })
      .catch(() => null);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/assets", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const row: AssetRow = await res.json();
      setAssets((prev) => [row, ...prev]);
      onChange(row.url);
    } catch {
      /* noop */
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const allOptions = [
    ...assets.map((a) => ({ value: a.url, label: a.name || a.url })),
    ...STATIC_OPTIONS.map((s) => ({ value: s, label: s.replace("/toll-story/", "") })),
  ];

  return (
    <div className="space-y-2">
      <span className="block font-label text-label-md text-on-surface-variant">{label}</span>
      {value && (
        <div className="relative h-28 w-full overflow-hidden rounded-lg border border-outline-variant bg-surface-variant">
          <Image
            alt={label}
            className="object-cover"
            fill
            sizes="400px"
            src={value}
            unoptimized={value.startsWith("/")}
          />
        </div>
      )}
      <div className="flex gap-2">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="min-w-0 flex-1 border-outline-variant bg-surface text-body-md text-on-surface focus:ring-primary">
            <SelectValue placeholder="Selecciona una imagen…" />
          </SelectTrigger>
          <SelectContent className="bg-surface-container-lowest">
            {!allOptions.find((o) => o.value === value) && value && (
              <SelectItem value={value}>{value}</SelectItem>
            )}
            {allOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          className="shrink-0 rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-sm text-on-surface transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          {uploading ? "Subiendo…" : "Subir"}
        </button>
      </div>
      <input
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        type="file"
      />
    </div>
  );
}
