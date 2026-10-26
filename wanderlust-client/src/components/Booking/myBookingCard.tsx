import Image from "next/image";
import { CalendarDays, Trash2 } from "lucide-react";
import { MyBookingType } from "@/app/my-bookings/page";

interface MyBookingCardProps {
    booking: MyBookingType
}

const formatDepartureDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const MyBookingCard = ({booking}: MyBookingCardProps) => {
    const { name, price, departureDate, imageUrl, BookingTime, duration } = booking;

    const priceLabel = price
        ? price.startsWith("$")
            ? price
            : `$${price}`
        : "$0";

    return (
        <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:gap-6">
            {/* Cover image */}
            <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-64">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name ?? "Travel destination"}
                        fill
                        unoptimized
                        sizes="(min-width: 640px) 256px, 100vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col gap-2">
                <h2 className="text-xl font-bold md:text-2xl">
                    {name ?? "Untitled booking"}
                </h2>

                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="size-4 shrink-0" />
                    Departure: {formatDepartureDate(departureDate)}
                </span>

                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="size-4 shrink-0" />
                    BookingTime: {formatDepartureDate(BookingTime)}
                </span>

                <p className="text-sm text-muted-foreground">Duration: {duration}</p>
                <p className="text-2xl font-bold text-brand">
                    {priceLabel}
                </p>
            </div>

            {/* Actions */}
            <div className="flex sm:self-end">
                <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-destructive px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                    <Trash2 className="size-4" />
                    Cancel
                </button>
            </div>
        </article>
    );
};

export default MyBookingCard;
