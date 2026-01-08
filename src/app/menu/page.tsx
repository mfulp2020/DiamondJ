import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { menu } from "@/lib/menu";
import Link from "next/link";

export default function MenuPage() {
  return (
    <>
      <Nav />
      <main>
        <Section title="Menu" subtitle="Catering-friendly menu. We can customize for your event.">
          <div className="grid gap-4">
            {menu.map((cat) => (
              <div key={cat.title} className="card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-extrabold">{cat.title}</h3>
                  {cat.note ? <div className="text-xs text-neutral-600">{cat.note}</div> : null}
                </div>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {cat.items.map((i) => (
                    <li key={i.name} className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                      <div className="font-bold">{i.name}</div>
                      {i.desc ? <div className="mt-1 text-sm text-neutral-700">{i.desc}</div> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/order">Online Ordering</Link>
            <Link className="btn btn-secondary" href="/contact">Get a Quote</Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
