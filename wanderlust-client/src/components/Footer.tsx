import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const brandFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/" },
  { label: "Terms of Service", href: "/" },
  { label: "Privacy Policy", href: "/" },
];

const socialLinks = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4.5 fill-current">
        <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-4.5"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-4.5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-medium uppercase tracking-wider text-white">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Brand */}
        <p
          className={`${brandFont.className} text-6xl font-bold tracking-tight md:text-7xl`}
        >
          Wanderlust
        </p>
        <p className="mt-4 text-white/70">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        {/* Columns */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <ColumnHeading>Newsletter</ColumnHeading>
            <p className="mt-3 text-sm text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4 flex h-11 max-w-xs items-stretch overflow-hidden rounded bg-[#262626]">
              <input
                type="email"
                name="email"
                aria-label="Email address"
                placeholder="Enter email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/45"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex w-11 shrink-0 items-center justify-center text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ArrowUpRight className="size-5" />
              </button>
            </form>
          </div>

          <div>
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="mt-4 space-y-3 text-[15px] text-white/80">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-brand">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Support</ColumnHeading>
            <ul className="mt-4 space-y-3 text-[15px] text-white/80">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="transition-colors hover:text-brand">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul className="mt-4 space-y-3 text-[15px] text-white/80">
              <li>
                <a href="tel:+1786901622" className="transition-colors hover:text-brand">
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderlust.com"
                  className="transition-colors hover:text-brand"
                >
                  info@wanderlust.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© 2026 Wanderlust. All rights reserved.</p>
          <div className="flex items-center gap-5 text-white/85">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-colors hover:text-brand"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
