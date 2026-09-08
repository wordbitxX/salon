"use client";
import { useTransition, useState } from "react";
import { setAppointmentStatus, rescheduleAppointment } from "../actions";
export default function StatusButtons({ id, status, compact = false, date, time }: { id: number; status: string; compact?: boolean; date?: string; time?: string }) {
  const [pending, start] = useTransition(); const [open, setOpen] = useState(false);
  const b = "rounded-md px-2 py-1 text-[11px] font-semibold transition disabled:opacity-50";
  return (
    <div className="flex flex-wrap items-center gap-1">
      {status === "pending" && <button disabled={pending} onClick={() => start(() => setAppointmentStatus(id, "confirmed"))} className={`${b} bg-sky-50 text-sky-700 hover:bg-sky-100`}>Confirm</button>}
      {(status === "confirmed" || status === "pending") && <button disabled={pending} onClick={() => start(() => setAppointmentStatus(id, "completed"))} className={`${b} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}>Complete</button>}
      {status !== "cancelled" && status !== "completed" && <button disabled={pending} onClick={() => start(() => setAppointmentStatus(id, "cancelled"))} className={`${b} bg-red-50 text-red-700 hover:bg-red-100`}>Cancel</button>}
      {status === "cancelled" && <button disabled={pending} onClick={() => start(() => setAppointmentStatus(id, "pending"))} className={`${b} bg-cream text-ink hover:bg-sand`}>Restore</button>}
      {!compact && status !== "completed" && status !== "cancelled" && (<>
        <button onClick={() => setOpen(!open)} className={`${b} bg-cream text-ink hover:bg-sand`}>Reschedule</button>
        {open && <form action={(fd) => start(async () => { await rescheduleAppointment(fd); setOpen(false); })} className="flex w-full flex-wrap items-center gap-1 pt-1"><input type="hidden" name="id" value={id} /><input type="date" name="date" defaultValue={date} required className="input !w-auto !px-2 !py-1 text-xs" aria-label="New date" /><input type="time" name="time" defaultValue={time} required step={1800} className="input !w-auto !px-2 !py-1 text-xs" aria-label="New time" /><button className={`${b} bg-ink text-ivory`}>Save</button></form>}
      </>)}
    </div>
  );
}
