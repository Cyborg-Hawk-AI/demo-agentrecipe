"use client";

import { useState } from "react";

interface DevNoteProps {
  note: string;
  position?: "top" | "bottom";
}

export default function DevNote({ note, position = "top" }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-brand-500/40 bg-brand-500/10 text-[9px] font-bold text-brand-400 transition-colors hover:bg-brand-500/20"
        aria-label="Developer note"
        title="DEV NOTE"
      >
        i
      </button>
      {open && (
        <div
          className={`absolute z-50 w-72 animate-fade-in rounded-lg border border-brand-500/30 bg-surface-700 p-3 text-left shadow-xl ${
            position === "top" ? "bottom-full left-1/2 mb-2 -translate-x-1/2" : "top-full left-1/2 mt-2 -translate-x-1/2"
          }`}
        >
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-brand-400">DEV NOTE</p>
          <p className="text-xs leading-relaxed text-gray-300">{note}</p>
        </div>
      )}
    </span>
  );
}
