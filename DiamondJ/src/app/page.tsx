import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Testimonials from "@/components/Testimonials";
import ScrollReveal from "@/components/ScrollReveal";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Nav />
      <ScrollReveal />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden hero-root pt-20">
          <div className="absolute inset-0">
            <Image
              src="/og.jpg"
              alt={`${site.name} hero`}
              fill
              priority
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 hero-overlay" />
          </div>

          <div className="relative">
            <div className="container py-16 md:py-24">
              <div className="grid items-center gap-10 md:grid-cols-2">
                <div data-reveal>
                  <div className="flex flex-wrap gap-2">
                    <span className="pill">Slow-Smoked BBQ</span>
                    <span className="pill">Serving {site.locationText}</span>
                  </div>

                  <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl hero-title">
                    Rustic smokehouse catering.
                    <span className="block text-white/90">
                      Big flavor, clean setup, zero stress.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                    From barn weddings to office lunches, we roll in with the pit
                    hot, the sides ready, and the crew on time. You bring the
                    guests — we bring the feast.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-white/70">
                    <span className="stamp">On-Time Setup</span>
                    <span className="stamp">Family Owned</span>
                    <span className="stamp">Smoked Overnight</span>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      className="btn btn-primary"
                      href="/#contact"
                    >
                      Get a Fast Quote
                    </Link>
                    <Link
                      className="btn btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/15"
                      href="/#order"
                    >
                      Online Ordering
                    </Link>
                    <Link
                      className="btn btn-secondary border-white/30 bg-white/0 text-white hover:bg-white/10"
                      href="/#menu"
                    >
                      View Menu
                    </Link>
                  </div>

                  <p className="mt-6 text-xs text-white/60">
                    Prefer calling/texting?{" "}
                    <a
                      className="underline underline-offset-4 hover:text-white"
                      href={`tel:${site.phonePrimary}`}
                    >
                      {site.phonePrimary}
                    </a>
                    {site.phoneSecondary ? (
                      <>
                        {" "}
                        •{" "}
                        <a
                          className="underline underline-offset-4 hover:text-white"
                          href={`tel:${site.phoneSecondary}`}
                        >
                          {site.phoneSecondary}
                        </a>
                      </>
                    ) : null}
                  </p>
                </div>

                <div className="relative md:justify-self-end" data-reveal>
                  <div className="pointer-events-none absolute -top-52 left-1/2 -translate-x-1/2 float-slow">
                    <Image
                      src="/Logo.png"
                      alt={`${site.name} logo`}
                      width={520}
                      height={520}
                      className="h-36 w-52 opacity-85 invert sm:h-44 sm:w-64 md:h-64 md:w-80"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-3xl hero-card">
                    <div className="relative p-7">
                      <div className="text-sm font-extrabold text-white">
                        Trail Boss Booking
                      </div>
                      <div className="mt-1 text-sm text-white/75">
                        Share the date + headcount and we’ll send menu options.
                      </div>

                      <div className="mt-6 grid gap-3">
                        {[
                          "Weddings & Receptions",
                          "Corporate Lunches",
                          "Birthdays & Parties",
                          "Fundraisers & Team Feeds",
                        ].map((t) => (
                          <div
                            key={t}
                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
                          >
                            <div className="text-sm font-semibold text-white/85">
                              {t}
                            </div>
                            <div className="h-2 w-2 rounded-full bg-[#d2a35a] shadow-sm shadow-[#d2a35a]/40" />
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          className="btn btn-primary"
                          href="/#contact"
                        >
                          Request a Quote
                        </Link>
                        <a
                          className="btn btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/15"
                          href={site.facebookUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <svg
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            className="h-7 w-7"
                          >
                            <circle cx="16" cy="16" r="16" fill="#1877F2" />
                            <path
                              fill="#fff"
                              d="M19.4 10.4h2.8V7.6h-2.8c-3 0-4.6 1.8-4.6 4.5v2.3h-2.6v2.8h2.6v7.2h3.1v-7.2h2.7l.5-2.8h-3.2v-2.1c0-.8.4-1.2 1.5-1.2z"
                            />
                          </svg>
                          <span className="ml-2">Find Us On Facebook</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>

        {/* MENU */}
        <div id="menu" />
        <Section
          title="Pitmaster Favorites"
          subtitle="Western comfort classics, slow-smoked and ready for a crowd."
        >
          <p className="mb-5 max-w-2xl text-sm text-neutral-700">
            Planning supper? Pick a favorite and we’ll handle the smoke,
            season, and portions.
          </p>
          <div className="grid gap-5 md:grid-cols-3 stagger-grid">
            {[
              {
                title: "Brisket",
                text: "Slow-smoked, sliced or chopped — always a centerpiece.",
                price: "$20 / lb",
                note: "Perfect for big plates, wedding spreads, and office lunches.",
              },
              {
                title: "Pulled Pork",
                text: "Tender, slow-smoked, and perfect for sandwiches or plates.",
                price: "$12 / lb",
                note: "Built for sliders, tailgates, and laid-back parties.",
              },
              {
                title: "Ribs",
                text: "By the rack or half rack — sauced or dry.",
                price: "$22 / rack • $14 / half",
                note: "Great for backyard cookouts and family nights.",
              },
            ].map((s) => (
              <div key={s.title} className="card p-6" data-reveal>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-lg font-extrabold text-[#2a1a12]">
                    {s.title}
                  </div>
                  <span className="badge">{s.price}</span>
                </div>
                <p className="mt-3 text-sm text-neutral-700">{s.text}</p>
                {s.note ? (
                  <p className="mt-2 text-xs text-neutral-500">{s.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </Section>

        {/* CATERING */}
        <div id="catering" />
        <Section
          title="Catering Trail Menu"
          subtitle="Packages built for crowds. Mix meats, sides, and add-ons your way."
        >
          <p className="mb-5 max-w-2xl text-sm text-neutral-700">
            Every package shows up hot, labeled, and ready to serve. Swap meats,
            sides, or portion sizes anytime.
          </p>
          <div className="grid gap-5 md:gap-6 lg:grid-cols-2 stagger-grid">
            <div className="card p-6" data-reveal data-reveal-direction="left">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-black">The Smokehouse Spread</div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Choose 2–3 meats & 2–3 sides for your custom Smokehouse
                    Spread.
                  </p>
                </div>
                <span className="stamp">
                  BBQ
                </span>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm font-extrabold">Meats</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                    <li>Brisket</li>
                    <li>Pulled Pork</li>
                    <li>Smoked Sausage</li>
                    <li>Ribs</li>
                    <li>Smoked Bologna</li>
                    <li>Smoked Chicken (pulled, half, or quarters)</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-extrabold">Sides</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                    <li>Cheesy Potatoes</li>
                    <li>Smoked Mac & Cheese</li>
                    <li>Potato Salad</li>
                    <li>Cole Slaw</li>
                    <li>Baked Beans</li>
                    <li>Rolls</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card p-6" data-reveal data-reveal-direction="right">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-black">Fiesta Roundup</div>
                  <p className="mt-1 text-sm text-neutral-600">
                    A full taco/fajita-style spread.
                  </p>
                </div>
                <span className="stamp">
                  Tex-Mex
                </span>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>Taco Bar</li>
                <li>Enchiladas</li>
                <li>Fajitas (Beef & Chicken)</li>
                <li>Rice</li>
                <li>Beans</li>
                <li>Chips & Salsa</li>
              </ul>
            </div>

            <div className="card p-6" data-reveal data-reveal-direction="left">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-black">Italian Trail Supper</div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Comfort classics, perfect for big groups.
                  </p>
                </div>
                <span className="stamp">
                  Italian
                </span>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>Spaghetti with Meat Sauce</li>
                <li>Chicken Alfredo with Fettuccine</li>
                <li>Lasagna</li>
                <li>Garlic Breadsticks</li>
                <li>Garden Salad</li>
                <li>Meatballs</li>
                <li>Antipasto Charcuterie Board</li>
              </ul>
            </div>

            <div className="card p-6" data-reveal data-reveal-direction="right">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-black">
                    The Rancher’s Prime Rib Meal
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Smoked prime rib with hearty sides.
                  </p>
                </div>
                <span className="stamp">
                  Premium
                </span>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>Smoked Prime Rib</li>
                <li>Roasted Potatoes / Green Beans / Bacon</li>
                <li>Garden Salad</li>
                <li>Rolls</li>
              </ul>
            </div>

            <div className="card p-6" data-reveal data-reveal-direction="left">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-black">Bayou Bounty</div>
                  <p className="mt-1 text-sm text-neutral-600">
                    A classic fish fry setup.
                  </p>
                </div>
                <span className="stamp">
                  Seafood
                </span>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>Classic Catfish Fry</li>
                <li>French Fries</li>
                <li>Hushpuppies</li>
                <li>Add-ons: Fried shrimp, coleslaw</li>
              </ul>
            </div>

            <div className="card p-6" data-reveal data-reveal-direction="right">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-black">Seafood Boil Bonanza</div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Cajun spice & fire — big-time crowd pleaser.
                  </p>
                </div>
                <span className="stamp">
                  Cajun
                </span>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>Shrimp</li>
                <li>Crab Legs</li>
                <li>Crawfish</li>
                <li>Corn</li>
                <li>Potatoes</li>
                <li>Cajun Sausage</li>
              </ul>
            </div>

            <div className="card p-6" data-reveal data-reveal-direction="left">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-black">Chuckwagon Classics</div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Simple, filling, and always hits.
                  </p>
                </div>
                <span className="stamp">
                  Classic
                </span>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>Ham & Beans</li>
                <li>Cornbread</li>
                <li>Fried Taters</li>
              </ul>
            </div>

            <div className="card p-6" data-reveal data-reveal-direction="right">
              <div className="text-lg font-black">Sweet Tooth Saloon</div>
              <p className="mt-1 text-sm text-neutral-600">
                Dessert options for any crowd size.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>Cookie Platter</li>
                <li>Fruit Cobblers</li>
                <li>Cake</li>
                <li>Cheesecake</li>
                <li>Brownies</li>
              </ul>
              <p className="mt-4 text-sm text-neutral-600">
                Ask about our{" "}
                <span className="font-extrabold text-neutral-900">
                  Chocolate Strawberry Mountain
                </span>
                .
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 stagger-grid">
            <div className="card p-6" data-reveal>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-lg font-black">Trail-Ready Add-Ons</div>
                <span className="badge">Per-person pricing</span>
              </div>
              <p className="mt-1 text-sm text-neutral-600">
                Round out the spread and keep service running smooth.
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                <li>Drinks + ice</li>
                <li>Plates, utensils, napkins</li>
                <li>Sauce bar + extras</li>
                <li>Delivery + setup</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link className="btn btn-primary" href="/#contact">
                  Add to a quote
                </Link>
                <a
                  className="btn btn-secondary"
                  href={`tel:${site.phonePrimary}`}
                >
                  Call now
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* GALLERY */}
        <div id="gallery" />
        <Section title="Campfire Gallery" subtitle="A taste of what we do.">
          <div className="grid gap-4 md:grid-cols-2 stagger-grid">
            {[
              "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80",
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80",
              "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=1600&q=80",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
            ].map((src) => (
              <div
                key={src}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200"
                data-reveal
              >
                <img
                  src={src}
                  alt="Diamond J Catering"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* ORDER */}
        <div id="order" />
        <Section
          title="Online Ordering"
          subtitle="Place pickup or delivery orders with next-day notice."
        >
          <div className="card p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xl font-extrabold">Place an order</div>
              <p className="mt-2 text-sm text-neutral-600">
                Lock in your date, pick your meats, and we’ll confirm details.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="badge">Next-day notice</span>
                <span className="badge">Pickup or delivery</span>
                <span className="badge">Easy customization</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link className="btn btn-primary" href="/order">
                Order form
              </Link>
              <a className="btn btn-secondary" href={`tel:${site.phonePrimary}`}>
                Call
              </a>
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <div id="contact" />
        <Section title="Book the Pit" subtitle="Fast quotes — tell us date, headcount, and vibe.">
          <div className="card p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xl font-extrabold">Get a quote</div>
              <p className="mt-2 text-sm text-neutral-600">
                Call/text:{" "}
                <a className="link" href={`tel:${site.phonePrimary}`}>
                  {site.phonePrimary}
                </a>
                {site.phoneSecondary ? (
                  <>
                    {" "}
                    •{" "}
                    <a className="link" href={`tel:${site.phoneSecondary}`}>
                      {site.phoneSecondary}
                    </a>
                  </>
                ) : null}
              </p>
            </div>
            <div className="flex gap-3">
              <Link className="btn btn-primary" href="/contact">
                Start a quote
              </Link>
            </div>
          </div>
        </Section>

        <Section
          title="Local Legends Say"
          subtitle="Kind words from recent events."
          variant="soft"
        >
          <Testimonials />
        </Section>
      </main>

      <Footer />
    </>
  );
}
