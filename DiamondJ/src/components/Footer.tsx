import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="text-lg font-extrabold">{site.name}</div>
          <p className="mt-2 text-sm text-neutral-600">
            {site.tagline}. Serving {site.locationText}.
          </p>
          <div className="mt-4 space-y-1 text-sm">
            <div>
              <span className="font-semibold">Phone:</span>{" "}
              <a className="link" href={`tel:${site.phonePrimary}`}>{site.phonePrimary}</a>
              {site.phoneSecondary ? (
                <>
                  {" "}•{" "}
                  <a className="link" href={`tel:${site.phoneSecondary}`}>{site.phoneSecondary}</a>
                </>
              ) : null}
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              <a className="link" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-extrabold">Quick Links</div>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li><Link className="link" href="/#menu">Menu</Link></li>
            <li><Link className="link" href="/#catering">Catering Packages</Link></li>
            <li><Link className="link" href="/#gallery">Gallery</Link></li>
            <li><Link className="link" href="/#order">Online Ordering</Link></li>
            <li><Link className="link" href="/#contact">Contact / Quote</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="font-extrabold">Social</div>
          <p className="mt-3 text-neutral-600">
            Follow us on Facebook for weekly setups, specials, and event pics.
          </p>
          <a className="btn btn-secondary mt-4" href={site.facebookUrl} target="_blank" rel="noreferrer">
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

      <div className="border-t border-neutral-200">
        <div className="container py-6 text-xs text-neutral-600 flex flex-wrap items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
          <div>
            <span className="text-neutral-500">Website:</span>{" "}
            <a className="link" href={site.url}>{site.domain}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
