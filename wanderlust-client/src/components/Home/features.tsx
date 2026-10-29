import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { DestinationType } from "@/lib/destinations";


// Round arrow buttons, same style as the Testimonials carousel.
const controlClassName =
    "static size-11 border-border text-muted-foreground transition-colors hover:border-brand hover:bg-transparent hover:text-brand disabled:opacity-50";

const Features = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`);
    const featuredDestinations: DestinationType[] = await res.json();

    return (
        <section className="py-20">
            <div className="mx-auto max-w-6xl px-4">
                {/* -mr lets the next card peek in from the right, like the design */}
                <Carousel opts={{ align: "start" }} className="-mr-4 xl:-mr-10">
                    {/* Heading + "All Destinations" button */}
                    <div className="flex items-center justify-between gap-6 pr-4 xl:pr-10">
                        <div>
                            <h2 className="text-4xl font-semibold text-foreground md:text-5xl">
                                Featured Destinations
                            </h2>
                            <p className="mt-3 text-sm text-muted-foreground">
                                Handpicked travel experiences for the adventure seekers
                            </p>
                        </div>

                        <Link
                            href="/destinations"
                            className="group flex h-12 shrink-0 items-center rounded-md border border-brand text-muted-foreground transition-colors hover:text-brand"
                        >
                            <span className="px-4 text-xs font-medium uppercase tracking-widest">
                                All Destinations
                            </span>
                            <span className="h-5 w-px bg-brand/40" />
                            <span className="flex items-center px-3">
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </Link>
                    </div>

                    {/* Slides */}
                    <CarouselContent className="mt-10">
                        {featuredDestinations.map((destination) => {
                            const { _id, name, country, price, duration, imageUrl } =
                                destination;
                            const priceLabel = price
                                ? price.startsWith("$")
                                    ? price
                                    : `$${price}`
                                : "$0";

                            return (
                                <CarouselItem
                                    key={_id}
                                    className="sm:basis-1/2 xl:basis-[calc(50%-12px)]"
                                >
                                    <article className="group flex flex-col">
                                        {/* Cover image + rating badge */}
                                        <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-muted">
                                            {imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    alt={name ?? "Travel destination"}
                                                    fill
                                                    unoptimized
                                                    sizes="(min-width: 640px) 50vw, 100vw"
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                                    No image
                                                </div>
                                            )}

                                        </div>

                                        {/* Details */}
                                        <div className="mt-6 flex flex-col gap-3">
                                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                <MapPin className="size-4 shrink-0" />
                                                {country ?? "Unknown"}
                                            </span>

                                            <div className="flex items-baseline justify-between gap-3">
                                                <h3 className="text-2xl font-semibold">
                                                    {name ?? "Untitled destination"}
                                                </h3>
                                                <p className="shrink-0 text-2xl font-semibold">
                                                    {priceLabel}
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        /Person
                                                    </span>
                                                </p>
                                            </div>

                                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                <CalendarDays className="size-4 shrink-0" />
                                                {duration ?? "Duration not specified"}
                                            </span>

                                            <Link
                                                href={`/destinations/${_id}`}
                                                className="inline-flex w-fit items-center gap-1 text-xs font-semibold tracking-widest text-brand uppercase transition-colors hover:text-brand-dark"
                                            >
                                                <span className="border-b border-b-brand-dark">
                                                    Book Now
                                                </span>
                                                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                            </Link>
                                        </div>
                                    </article>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>

                    {/* Slide counter + arrows.
                        The counter stays at 1/5 because this file is a Server Component —
                        tracking the live slide needs useState, which requires a "use client" file. */}
                    <div className="mt-14 flex items-center gap-4 pr-4 xl:pr-10">
                        <span className="text-lg font-medium">
                            1/{featuredDestinations.length}
                        </span>
                        <div className="h-px flex-1 bg-border" />
                        <div className="flex gap-3">
                            <CarouselPrevious className={controlClassName} />
                            <CarouselNext className={controlClassName} />
                        </div>
                    </div>
                </Carousel>
            </div>
        </section>
    );
};

export default Features;
