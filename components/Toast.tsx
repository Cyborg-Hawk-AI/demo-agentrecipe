"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
}

interface ToastContextValue {
  showToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const icons = { success: "✓", info: "ℹ", warning: "⚠" };
  const colors = {
    success: "border-brand-500/40 bg-brand-500/10 text-brand-300",
    info: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    warning: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-slide-up flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-xl ${colors[toast.type]}`}
          >
            <span className="text-base">{icons[toast.type]}</span>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
