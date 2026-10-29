"use client";

import { useTransition } from "react";

/**
 * Owner-only destructive control. The server action re-checks the role, so
 * hiding it here is only a convenience — not the security boundary.
 */
export default function DeleteButton({
  onDelete,
  id,
  confirmText,
  label = "Delete",
  className = "",
}: {
  onDelete: (id: number) => Promise<void>;
  id: number;
  confirmText: string;
  label?: string;
  className?: string;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmText)) start(() => onDelete(id));
      }}
      className={`rounded-md px-2 py-1 text-[11px] font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50 ${className}`}
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
