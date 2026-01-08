# Diamond J Catering Website (Next.js + Tailwind) — Turnkey Folder

This is a ready-to-run Next.js (App Router) website for Diamond J Catering, including:
- Home, Menu, Catering, Gallery, Contact, Online Ordering pages
- Contact inquiry form (logs by default, optional email via Resend)
- Online order form that sends SMS to both phones via Twilio (recommended)
- Preloaded generic gallery photos + your provided logo files placed in /public

## 1) Install
```bash
npm install
```

## 2) Run locally
```bash
npm run dev
```
Open http://localhost:3000

## 3) Configure texting (Twilio) — Online Ordering
Create a `.env.local` in the project root:

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM_NUMBER=+1XXXXXXXXXX
ORDER_TO_NUMBER_1=+14173803089
ORDER_TO_NUMBER_2=+14798834580
```

## 4) Optional: Configure email for Contact form (Resend)
If you want the Contact/Quote form to email you, add:

```bash
RESEND_API_KEY=your_key_here
CONTACT_TO_EMAIL=mfulp2020@gmail.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

(If not set, the contact form will log submissions to the server console.)

## 5) Deploy (Vercel)
- Push this folder to GitHub
- Import into Vercel
- Add env vars in Vercel settings (Twilio / Resend)
- Deploy

## Notes
- Replace images in `/public/gallery` with your real event/food photos anytime.
- Replace `/public/og.jpg` with your best hero image for social sharing.
