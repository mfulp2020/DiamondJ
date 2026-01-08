import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { faqs, packages } from "@/lib/catering";
import Link from "next/link";

export default function CateringPage() {
  return (
    <>
      <Nav />
      <main>
        <Section title="Catering" subtitle="Flexible options for events big or small.">
          <div className="grid gap-4 md:grid-cols-3">
            {packages.map((p) => (
              <div key={p.name} className="card p-6">
                <div className="text-lg font-extrabold">{p.name}</div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
                  {p.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <Link className="btn btn-primary mt-6 w-full" href="/contact">
                  Request Pricing
                </Link>
              </div>
            ))}
          </div>
        </Section>

        <Section title="FAQ" subtitle="Quick answers to common questions.">
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="card p-6">
                <div className="font-extrabold">{f.q}</div>
                <p className="mt-2 text-sm text-neutral-700">{f.a}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
