"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

function normalizeToE164(raw: string) {
  const digits = (raw || "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (raw.trim().startsWith("+")) return raw.trim();
  return raw;
}

function buildSmsHref(toE164: string, body: string) {
  const encoded = encodeURIComponent(body);
  const isiOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  return isiOS ? `sms:${toE164}&body=${encoded}` : `sms:${toE164}?body=${encoded}`;
}

export default function OrderPage() {
  const toPrimary = useMemo(() => normalizeToE164(site.phonePrimary), []);
  const toSecondary = useMemo(
    () => (site.phoneSecondary ? normalizeToE164(site.phoneSecondary) : ""),
    []
  );
  const minOrderDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const pad = (value: number) => String(value).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Pickup");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [items, setItems] = useState("");
  const [brisketLbs, setBrisketLbs] = useState(0);
  const [porkLbs, setPorkLbs] = useState(0);
  const [ribsRacks, setRibsRacks] = useState(0);
  const [ribsHalves, setRibsHalves] = useState(0);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [notes, setNotes] = useState("");

  const menuSelections = useMemo(() => {
    const selections: string[] = [];
    if (brisketLbs > 0) selections.push(`Brisket: ${brisketLbs} lb`);
    if (porkLbs > 0) selections.push(`Pulled Pork: ${porkLbs} lb`);
    if (ribsRacks > 0 || ribsHalves > 0) {
      const parts: string[] = [];
      if (ribsRacks > 0) parts.push(`${ribsRacks} rack${ribsRacks === 1 ? "" : "s"}`);
      if (ribsHalves > 0) parts.push(`${ribsHalves} half${ribsHalves === 1 ? "" : "s"}`);
      selections.push(`Ribs: ${parts.join(", ")}`);
    }
    return selections;
  }, [brisketLbs, porkLbs, ribsRacks, ribsHalves]);

  const estimatedTotal = useMemo(() => {
    const total =
      brisketLbs * 20 +
      porkLbs * 12 +
      ribsRacks * 22 +
      ribsHalves * 14;
    return total;
  }, [brisketLbs, porkLbs, ribsRacks, ribsHalves]);

  const textBody = useMemo(() => {
    const lines: string[] = [];
    lines.push("NEW ORDER — Diamond J Catering");
    lines.push(`Name: ${name || "(not provided)"}`);
    lines.push(`Customer Phone: ${phone || "(not provided)"}`);
    lines.push(`Type: ${type}`);
    if (date) lines.push(`Date: ${date}`);
    if (time) lines.push(`Time: ${time}`);
    if (type === "Delivery" && deliveryLocation.trim()) {
      lines.push(`Delivery Location: ${deliveryLocation.trim()}`);
    }
    lines.push("—");
    if (menuSelections.length) {
      lines.push(`Menu: ${menuSelections.join(", ")}`);
    }
    if (estimatedTotal > 0) {
      lines.push(`Estimated Total: $${estimatedTotal.toFixed(2)}`);
    }
    lines.push(`Items: ${items || "(not provided)"}`);
    if (notes) {
      lines.push("—");
      lines.push(`Notes: ${notes}`);
    }
    return lines.join("\n");
  }, [
    name,
    phone,
    type,
    date,
    time,
    deliveryLocation,
    items,
    notes,
    menuSelections,
    estimatedTotal,
  ]);

  const hasSchedule = date.trim().length > 0;
  const requestedDate = date ? new Date(`${date}T00:00:00`) : null;
  const isValidDate = requestedDate ? !Number.isNaN(requestedDate.getTime()) : false;
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const canSchedule =
    hasSchedule && isValidDate && requestedDate !== null && requestedDate >= tomorrow;

  const scheduleMessage = !hasSchedule
    ? "Select a date to submit."
    : !isValidDate
    ? "Enter a valid date."
    : requestedDate !== null && requestedDate < tomorrow
    ? "Date must be at least tomorrow to submit."
    : "";
  const canSend =
    name.trim() &&
    phone.trim() &&
    (items.trim() || menuSelections.length > 0) &&
    canSchedule;

  return (
    <>
      <Nav />
      <main className="container py-14">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-black tracking-tight">Online Ordering</h1>
          <p className="mt-2 text-sm text-neutral-600">
            This is our free online ordering — it opens a pre-filled text message.
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            Please place online orders at least one day in advance.
          </p>

          <div className="mt-8 space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name *" className="w-full rounded-xl border px-4 py-3" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone *" className="w-full rounded-xl border px-4 py-3" />
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-xl border px-4 py-3">
              <option>Pickup</option>
              <option>Delivery</option>
            </select>
            {type === "Delivery" ? (
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <label className="text-sm font-semibold">
                  Delivery Location
                  <input
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="Address or town"
                    className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                  />
                </label>
                <p className="mt-2 text-xs text-neutral-600">
                  Delivery may include additional fees based on distance.
                </p>
              </div>
            ) : null}
            <input
              type="date"
              value={date}
              min={minOrderDate}
              onChange={(e) => setDate(e.target.value)}
              onInput={(e) => setDate((e.target as HTMLInputElement).value)}
              className="w-full rounded-xl border px-4 py-3"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onInput={(e) => setTime((e.target as HTMLInputElement).value)}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Optional time"
            />
            {scheduleMessage ? (
              <div className="text-xs text-neutral-600">
                {scheduleMessage}
              </div>
            ) : null}
            <div className="rounded-xl border border-neutral-200 p-4">
              <div className="text-sm font-semibold text-neutral-900">
                Menu selections
              </div>
              <div className="mt-3 grid gap-3">
                <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2">
                  <span className="text-sm font-semibold text-neutral-700">
                    Brisket (lb)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700"
                      onClick={() =>
                        setBrisketLbs((prev) => Math.max(0, prev - 0.5))
                      }
                      aria-label="Decrease brisket"
                    >
                      -
                    </button>
                    <span className="min-w-[3.25rem] text-center text-sm font-semibold text-neutral-900">
                      {brisketLbs.toFixed(1)} lb
                    </span>
                    <button
                      type="button"
                      className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700"
                      onClick={() => setBrisketLbs((prev) => prev + 0.5)}
                      aria-label="Increase brisket"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2">
                  <span className="text-sm font-semibold text-neutral-700">
                    Pulled Pork (lb)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700"
                      onClick={() =>
                        setPorkLbs((prev) => Math.max(0, prev - 0.5))
                      }
                      aria-label="Decrease pulled pork"
                    >
                      -
                    </button>
                    <span className="min-w-[3.25rem] text-center text-sm font-semibold text-neutral-900">
                      {porkLbs.toFixed(1)} lb
                    </span>
                    <button
                      type="button"
                      className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700"
                      onClick={() => setPorkLbs((prev) => prev + 0.5)}
                      aria-label="Increase pulled pork"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid gap-2 rounded-lg border border-neutral-200 px-3 py-2">
                  <span className="text-sm font-semibold text-neutral-700">
                    Ribs
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-500">
                      Racks
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700"
                        onClick={() =>
                          setRibsRacks((prev) => Math.max(0, prev - 1))
                        }
                        aria-label="Decrease rib racks"
                      >
                        -
                      </button>
                      <span className="min-w-[2.5rem] text-center text-sm font-semibold text-neutral-900">
                        {ribsRacks}
                      </span>
                      <button
                        type="button"
                        className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700"
                        onClick={() => setRibsRacks((prev) => prev + 1)}
                        aria-label="Increase rib racks"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-500">
                      Halves
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700"
                        onClick={() =>
                          setRibsHalves((prev) => Math.max(0, prev - 1))
                        }
                        aria-label="Decrease rib halves"
                      >
                        -
                      </button>
                      <span className="min-w-[2.5rem] text-center text-sm font-semibold text-neutral-900">
                        {ribsHalves}
                      </span>
                      <button
                        type="button"
                        className="h-7 w-7 rounded-full border border-neutral-300 text-sm font-semibold text-neutral-700"
                        onClick={() => setRibsHalves((prev) => prev + 1)}
                        aria-label="Increase rib halves"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {estimatedTotal > 0 ? (
                <div className="mt-3 text-sm font-semibold text-neutral-900">
                  Estimated total: ${estimatedTotal.toFixed(2)}
                  <span className="ml-2 text-xs font-normal text-neutral-500">
                    (estimate)
                  </span>
                </div>
              ) : null}
            </div>

            <textarea
              value={items}
              onChange={(e) => setItems(e.target.value)}
              rows={5}
              placeholder="Order details * (optional if you selected menu items above)"
              className="w-full rounded-xl border px-4 py-3"
            />
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Notes" className="w-full rounded-xl border px-4 py-3" />

            <div className="rounded-xl border bg-neutral-50 p-4 text-xs whitespace-pre-wrap">{textBody}</div>

            <div className="flex flex-wrap gap-3">
              <a
                href={canSend ? buildSmsHref(toPrimary, textBody) : undefined}
                className={`btn btn-primary ${!canSend ? "opacity-50 pointer-events-none" : ""}`}
              >
                Text Glen ({site.phonePrimary})
              </a>

              {toSecondary ? (
                <a
                  href={canSend ? buildSmsHref(toSecondary, textBody) : undefined}
                  className={`btn btn-secondary ${!canSend ? "opacity-50 pointer-events-none" : ""}`}
                >
                  Text Mason ({site.phoneSecondary})
                </a>
              ) : null}

              <Link href={`tel:${site.phonePrimary}`} className="btn btn-secondary">
                Call Glen
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
