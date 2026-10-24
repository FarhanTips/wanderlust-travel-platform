import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import type { DestinationType } from "@/lib/destinations";

// The API doesn't return a rating yet, so cards fall back to the design's value.
const FALLBACK_RATING = "4.5";

type DestinationCardProps = {
    destination: DestinationType;
};

const DestinationCard = ({ destination }: DestinationCardProps) => {
    const { _id, name, country, price, duration, imageUrl } = destination;

    const priceLabel = price
        ? price.startsWith("$")
            ? price
            : `$${price}`
        : "$0";

    return (
        <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            {/* Cover image + rating badge */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name ?? "Travel destination"}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                    </div>
                )}

                <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
                    {FALLBACK_RATING}
                    <Star className="size-3 fill-foreground text-foreground" />
                </span>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2 p-4">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4 shrink-0" />
                    {country ?? "Unknown"}
                </span>

                <div className="flex items-baseline justify-between gap-3">
                    <h3 className="truncate text-lg font-medium">
                        {name ?? "Untitled destination"}
                    </h3>
                    <p className="shrink-0 text-lg font-semibold">
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
                    className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-semibold tracking-widest uppercase text-brand transition-colors hover:text-brand-dark"
                >
                    Book Now
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </div>
        </article>
    );
};

export default DestinationCard;
