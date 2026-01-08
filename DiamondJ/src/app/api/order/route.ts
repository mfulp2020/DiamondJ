import { NextResponse } from "next/server";
import twilio from "twilio";

function getClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  return twilio(sid, token);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const pickupOrDelivery = String(body.pickupOrDelivery || "").trim();
    const date = String(body.date || "").trim();
    const time = String(body.time || "").trim();
    const items = String(body.items || "").trim();
    const notes = String(body.notes || "").trim();
    const address = String(body.address || "").trim();

    if (!name || !phone || !items) {
      return NextResponse.json(
        { ok: false, error: "Please include name, phone, and order items." },
        { status: 400 }
      );
    }

    const from = process.env.TWILIO_FROM_NUMBER;
    const to1 = process.env.ORDER_TO_NUMBER_1;
    const to2 = process.env.ORDER_TO_NUMBER_2;

    const text =
      `DIAMOND J ORDER 🔥\n` +
      `Name: ${name}\n` +
      `Customer Phone: ${phone}\n` +
      `Type: ${pickupOrDelivery || "Not specified"}\n` +
      `Date/Time: ${date || "?"} ${time || ""}\n` +
      (address ? `Address: ${address}\n` : "") +
      `\nItems:\n${items}\n` +
      (notes ? `\nNotes:\n${notes}\n` : "");

    const client = getClient();

    // If Twilio isn't configured yet, still succeed (so dev works immediately)
    if (!client || !from || !to1 || !to2) {
      console.log("ORDER SUBMISSION (Twilio not configured):", { ...body, text });
      return NextResponse.json({ ok: true, mode: "logged" });
    }

    await Promise.all([
      client.messages.create({ from, to: to1, body: text }),
      client.messages.create({ from, to: to2, body: text }),
    ]);

    return NextResponse.json({ ok: true, mode: "sms" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Order failed to send. Please call/text instead." },
      { status: 500 }
    );
  }
}
