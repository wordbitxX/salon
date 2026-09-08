"use client";
import { useTransition } from "react";
import { toggleReview } from "../actions";
export default function ApproveToggle({ id, approved }: { id: number; approved: boolean }) { const [p, start] = useTransition(); return <button disabled={p} onClick={() => start(() => toggleReview(id, !approved))} className={`rounded-full px-3 py-1 text-xs font-semibold ${approved ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-600"}`}>{approved ? "Published" : "Hidden"}</button>; }
