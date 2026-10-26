import { Headphones, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
] as const;

export default function WhyChoose() {
  return (
    <section className="border-y border-cyan-200 bg-[#e6f7fa] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-light text-foreground md:text-5xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-center text-muted-foreground md:text-lg">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-lg border border-cyan-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <Icon className="size-8 text-brand" strokeWidth={1.75} />
              <h3 className="mt-5 text-2xl font-normal text-foreground">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
