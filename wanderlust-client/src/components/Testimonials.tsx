"use client";

import Image from "next/image";
import person1Img from "@/assets/person1.png";
import person2Img from "@/assets/person2.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali trip was absolutely magical! Every detail was perfectly planned, the resorts were luxurious, and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: person2Img,
  },
  {
    quote:
      "Our Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: person1Img,
  },
  {
    quote:
      "Watching the cherry blossoms in Kyoto was a dream come true. Wanderlust handled every transfer and ryokan booking flawlessly — we just showed up and enjoyed.",
    name: "Emily Rodriguez",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=444&h=560&fit=crop&crop=faces&auto=format",
  },
  {
    quote:
      "Our Santorini honeymoon was pure perfection. The private sunset cruise they arranged was the highlight of the entire trip.",
    name: "David Kim",
    location: "Seoul, South Korea",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=444&h=560&fit=crop&crop=faces&auto=format",
  },
  {
    quote:
      "The African safari felt straight out of a documentary — elephants at sunrise, luxury tented camps, and guides who knew every animal by name.",
    name: "Aisha Patel",
    location: "Toronto, Canada",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=444&h=560&fit=crop&crop=faces&auto=format",
  },
  {
    quote:
      "We drove through Norway's fjords on a route that felt tailor-made for us. Every hotel was better than the last — an unforgettable two weeks.",
    name: "Marcus Weber",
    location: "Berlin, Germany",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=444&h=560&fit=crop&crop=faces&auto=format",
  },
] as const;

const controlClassName =
  "static size-11 border-border text-muted-foreground transition-colors hover:border-brand hover:bg-transparent hover:text-brand disabled:opacity-50";

export default function Testimonials() {
  return (
    <section className="border-b border-cyan-200 bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Carousel opts={{ align: "start" }} className="w-full">
          {/* Header + carousel controls */}
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="text-4xl font-light text-foreground md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-2 text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="hidden shrink-0 gap-3 sm:flex">
              <CarouselPrevious className={controlClassName} />
              <CarouselNext className={controlClassName} />
            </div>
          </div>

          {/* Testimonial slides */}
          <CarouselContent className="-ml-6 mt-10">
            {testimonials.map(({ quote, name, location, image }) => (
              <CarouselItem
                key={name}
                className="basis-[85%] pl-6 sm:basis-1/2"
              >
                <div className="flex h-full flex-col gap-5 rounded-lg border border-cyan-100 bg-white p-6 sm:flex-row">
                  <div className="flex flex-1 flex-col">
                    <p className="text-[17px] leading-snug text-foreground md:text-lg">
                      {quote}
                    </p>
                    <div className="mt-auto pt-6">
                      <p className="font-medium text-brand">— {name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {location}
                      </p>
                    </div>
                  </div>
                  <Image
                    src={image}
                    alt={name}
                    width={176}
                    height={224}
                    className="h-56 w-44 shrink-0 self-end object-cover sm:self-start"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
