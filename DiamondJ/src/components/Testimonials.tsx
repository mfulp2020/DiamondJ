import React from "react";

const testimonials = [
  {
    name: "Local Wedding Client",
    quote:
      "Food was incredible and everything was on time. Guests kept talking about the brisket!",
  },
  {
    name: "Corporate Lunch",
    quote:
      "Easy to work with, generous portions, and the sides were a hit. We’ll book again.",
  },
  {
    name: "Birthday Party",
    quote:
      "Set up was clean and professional. The pulled pork disappeared fast.",
  },
];

export default function Testimonials() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <div className="text-sm font-extrabold">{t.name}</div>
          <p className="mt-3 text-sm text-neutral-700">“{t.quote}”</p>
        </div>
      ))}
    </div>
  );
}