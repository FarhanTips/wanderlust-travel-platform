import Image from "next/image";
import { ArrowRight } from "lucide-react";
import bannerImg from "@/assets/Banner.png";
import Link from "next/link";

const searchFields = [
  { name: "location", label: "Location", placeholder: "Address, City Or Zip" },
  {
    name: "duration",
    label: "Date/Duration",
    placeholder: "Anytime/3 Days",
  },
  { name: "budget", label: "Budget", placeholder: "$0-$3000" },
  { name: "people", label: "People", placeholder: "5-10" },
] as const;

export default function Banner() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-1 flex-col overflow-hidden">
      {/* Background image + readability overlay */}
      <Image
        src={bannerImg}
        alt="Aerial view of a turquoise bay surrounded by lush green hills"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="-z-10 bg-linear-to-b from-black/45 via-black/20 to-black/60" />

      {/* Hero content */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="max-w-4xl text-5xl font-extralight leading-[1.08] tracking-wide text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
          Discover Your
          <span className="block">Next Adventure</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base font-light text-white/85 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/destinations"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded bg-brand px-9 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition-all hover:bg-brand-dark hover:shadow-xl"
          >
            Explore Now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-12 items-center justify-center rounded border border-white/25 bg-white/15 px-9 text-sm font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <form className="relative border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-[repeat(4,1fr)_11rem]">
          {searchFields.map(({ name, label, placeholder }) => (
            <div key={name} className="px-5 py-3 sm:px-7 sm:py-4">
              <label
                htmlFor={`hero-${name}`}
                className="block text-[15px] font-semibold text-white"
              >
                {label}
              </label>
              <input
                id={`hero-${name}`}
                name={name}
                type="text"
                placeholder={placeholder}
                className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/55"
              />
            </div>
          ))}
          <button
            type="submit"
            className="col-span-2 bg-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-dark lg:col-span-1 lg:py-0 lg:text-lg"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
}
