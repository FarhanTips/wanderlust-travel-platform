import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ctaImg from "@/assets/CTA.png";

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={ctaImg}
        alt="Aerial view of an airplane flying over a tropical island"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="-z-10 bg-linear-to-b from-black/60 via-black/45 to-black/60" />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center md:py-28">
        <h2 className="text-4xl font-light text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-white/85 md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <a
          href="/destinations"
          className="group mt-9 inline-flex h-12 items-center gap-3 rounded bg-white px-8 text-sm font-semibold uppercase tracking-[0.12em] text-foreground shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
        >
          Book Your Trip Today
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
