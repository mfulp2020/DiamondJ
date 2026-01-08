import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

function requiredEnv() {
  return (
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_TO_EMAIL &&
    process.env.CONTACT_FROM_EMAIL
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const eventDate = String(body.eventDate || "").trim();
    const guests = String(body.guests || "").trim();
    const location = String(body.location || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !phone || !message) {
      return NextResponse.json(
        { ok: false, error: "Please include name, phone, and message." },
        { status: 400 }
      );
    }

    if (!requiredEnv()) {
      console.log("CONTACT FORM SUBMISSION (no email configured):", {
        name, phone, email, eventDate, guests, location, message,
      });
      return NextResponse.json({ ok: true, mode: "logged" });
    }

    const subject = `New Catering Inquiry — ${name}`;
    const text =
      `Diamond J Catering inquiry:\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email || "(none)"}\n` +
      `Event Date: ${eventDate || "(not provided)"}\n` +
      `Guests: ${guests || "(not provided)"}\n` +
      `Location: ${location || "(not provided)"}\n\n` +
      `Message:\n${message}\n`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `${site.name} <${process.env.CONTACT_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL!,
      subject,
      text,
      replyTo: email || undefined,
    });

    return NextResponse.json({ ok: true, mode: "email" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please call/text instead." },
      { status: 500 }
    );
  }
}
