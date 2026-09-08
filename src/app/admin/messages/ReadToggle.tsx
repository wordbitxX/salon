"use client";
import { useTransition } from "react";
import { markMessageRead } from "../actions";
export default function ReadToggle({ id, read }: { id: number; read: boolean }) { const [p, start] = useTransition(); return <button disabled={p} onClick={() => start(() => markMessageRead(id, !read))} className="btn-outline !px-3 !py-1.5 text-xs">{read ? "Mark unread" : "Mark read"}</button>; }
