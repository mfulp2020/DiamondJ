"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
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
  const isiOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return isiOS ? `sms:${toE164}&body=${encoded}` : `sms:${toE164}?body=${encoded}`;
}

export default function ContactPage() {
  // Glen first (479), Mason second (417)
  const toGlen = useMemo(() => normalizeToE164(site.phonePrimary), []);
  const toMason = useMemo(
    () => (site.phoneSecondary ? normalizeToE164(site.phoneSecondary) : ""),
    []
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [eventTypeOther, setEventTypeOther] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");
  const [serviceStyle, setServiceStyle] = useState("Not sure");
  const [drinksNeeded, setDrinksNeeded] = useState("Not sure");
  const [utensilsNeeded, setUtensilsNeeded] = useState("Not sure");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [message, setMessage] = useState("");

  const body = useMemo(() => {
    const lines: string[] = [];
    const eventLabel =
      eventType === "Other" && eventTypeOther.trim()
        ? `Other — ${eventTypeOther.trim()}`
        : eventType;
    lines.push("QUOTE REQUEST — Diamond J Catering");
    lines.push(`Name: ${name || "(not provided)"}`);
    lines.push(`Phone: ${phone || "(not provided)"}`);
    if (email) lines.push(`Email: ${email}`);
    lines.push(`Event: ${eventLabel}`);
    if (eventDate) lines.push(`Date: ${eventDate}`);
    if (guests) lines.push(`Guests: ${guests}`);
    if (location) lines.push(`Location: ${location}`);
    if (serviceStyle) lines.push(`Service Style: ${serviceStyle}`);
    if (drinksNeeded) lines.push(`Drinks Needed: ${drinksNeeded}`);
    if (utensilsNeeded) lines.push(`Plates & Utensils: ${utensilsNeeded}`);
    if (dietaryNotes) lines.push(`Dietary Notes: ${dietaryNotes}`);
    if (message) {
      lines.push("—");
      lines.push(`Details: ${message}`);
    }
    return lines.join("\n");
  }, [
    name,
    phone,
    email,
    eventType,
    eventTypeOther,
    eventDate,
    guests,
    location,
    serviceStyle,
    drinksNeeded,
    utensilsNeeded,
    dietaryNotes,
    message,
  ]);

  const canSend = name.trim().length > 0 && phone.trim().length > 0 && message.trim().length > 0;

  const smsGlen = buildSmsHref(toGlen, body);
  const smsMason = toMason ? buildSmsHref(toMason, body) : "";

  const mailtoSubject = encodeURIComponent("Diamond J Catering — Quote Request");
  const mailtoBody = encodeURIComponent(body);
  const mailtoHref = `mailto:${site.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <>
      <Nav />

      <main>
        <Section
          title="Request a Catering Quote"
          subtitle="Fill this out and tap the big button — it opens a pre‑filled text. You can also email if you prefer."
        >
          <div className="mx-auto max-w-2xl">
            <div className="card p-6 md:p-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-extrabold">Quote Form</div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Quotes: text or email is fine. Orders: please text/call.
                  </p>
                </div>
                <Link
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                  href="/#contact"
                >
                  Back
                </Link>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-semibold">
                    Name *
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                      required
                    />
                  </label>

                  <label className="text-sm font-semibold">
                    Phone *
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-semibold">
                    Email (optional)
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                      placeholder={site.email}
                    />
                  </label>

                  <label className="text-sm font-semibold">
                    Event Type
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                    >
                      <option>Wedding</option>
                      <option>Corporate Lunch</option>
                      <option>Birthday / Party</option>
                      <option>Fundraiser</option>
                      <option>Team / Sports</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>

                {eventType === "Other" ? (
                  <label className="text-sm font-semibold">
                    Event Type (Other)
                    <input
                      value={eventTypeOther}
                      onChange={(e) => setEventTypeOther(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                      placeholder="Tell us about the event"
                    />
                  </label>
                ) : null}

                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="text-sm font-semibold">
                    Date
                    <input
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      type="date"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold">
                    Guests
                    <input
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      placeholder="e.g. 75"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                      inputMode="numeric"
                    />
                  </label>

                  <label className="text-sm font-semibold">
                    Location / Town
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Aurora, MO"
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-semibold">
                    Service Style
                    <select
                      value={serviceStyle}
                      onChange={(e) => setServiceStyle(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                    >
                      <option>Not sure</option>
                      <option>Drop-off</option>
                      <option>Buffet</option>
                    </select>
                  </label>

                  <label className="text-sm font-semibold">
                    Drinks Needed?
                    <select
                      value={drinksNeeded}
                      onChange={(e) => setDrinksNeeded(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                    >
                      <option>Not sure</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </label>
                </div>

                <label className="text-sm font-semibold">
                  Plates & Utensils Needed?
                  <select
                    value={utensilsNeeded}
                    onChange={(e) => setUtensilsNeeded(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                  >
                    <option>Not sure</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>

                <label className="text-sm font-semibold">
                  Dietary Notes (optional)
                  <input
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                    placeholder="Allergies, vegetarian needs, gluten-free, etc."
                  />
                </label>

                <label className="text-sm font-semibold">
                  What are you looking for? *
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    placeholder="Menu/package ideas, must‑haves, allergies, service style, budget range, etc."
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                  />
                </label>

                {/* PRIMARY ACTION */}
                <a
                  className={`mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm shadow-orange-500/20 transition ${
                    canSend ? "bg-orange-500 hover:bg-orange-400" : "bg-orange-500/40 cursor-not-allowed"
                  }`}
                  href={canSend ? smsGlen : undefined}
                  aria-disabled={!canSend}
                  onClick={(e) => {
                    if (!canSend) e.preventDefault();
                  }}
                >
                  Text Quote Request (Glen)
                </a>

                {/* SECONDARY ACTIONS */}
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {toMason ? (
                    <a
                      className={`btn btn-secondary ${!canSend ? "opacity-50 pointer-events-none" : ""}`}
                      href={canSend ? smsMason : undefined}
                      aria-disabled={!canSend}
                      onClick={(e) => {
                        if (!canSend) e.preventDefault();
                      }}
                    >
                      Text Mason
                    </a>
                  ) : null}

                  <a className={`btn btn-secondary ${!canSend ? "opacity-50 pointer-events-none" : ""}`} href={canSend ? mailtoHref : undefined}>
                    Email Quote
                  </a>

                  <a className="btn btn-secondary" href={`tel:${site.phonePrimary}`}>
                    Call
                  </a>

                  <a className="text-sm font-semibold text-neutral-600 hover:text-neutral-900" href={site.facebookUrl} target="_blank" rel="noreferrer">
                    Message on Facebook
                  </a>
                </div>

                {!canSend ? (
                  <p className="text-xs text-neutral-500">
                    Fill in <span className="font-extrabold">Name</span>, <span className="font-extrabold">Phone</span>, and the message to enable sending.
                  </p>
                ) : null}

                <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm">
                  <div className="font-extrabold">Prefer calling?</div>
                  <div className="mt-1 text-neutral-700">
                    Glen: <a className="link" href={`tel:${site.phonePrimary}`}>{site.phonePrimary}</a>
                    {site.phoneSecondary ? (
                      <>
                        {" "}• Mason: <a className="link" href={`tel:${site.phoneSecondary}`}>{site.phoneSecondary}</a>
                      </>
                    ) : null}
                    {" "}• <a className="link" href={`mailto:${site.email}`}>{site.email}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
