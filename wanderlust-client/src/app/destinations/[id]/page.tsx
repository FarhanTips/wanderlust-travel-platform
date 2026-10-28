import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, MapPin, Check } from "lucide-react";
import { DestinationType } from "@/lib/destinations";
import DeleteDestinationDialog from "@/components/CRUD Destination/DeleteDestinationDialog";
import EditDestinationDialog from "@/components/CRUD Destination/EditDestinationDialog"
import BookNowButton from "@/components/Booking/bookNowButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

interface DestinationDetailsPageProps {
    params: Promise<{ id: string }>;
}

const DestinationDetailsPage = async ({ params }: DestinationDetailsPageProps) => {
    const { id } = await params;

    const jwtToken = await auth.api.getToken({
        headers: await headers()
    });
    // console.log(jwtToken?.token);


    const res = await fetch(`http://localhost:5000/destination/${id}`, {
        headers: {
            authorization: `Bearer ${jwtToken?.token}`
        }
    });

    // console.log("after get", res);
    if (res.statusText === "Unauthorized") {
        notFound();
    }

    const destination: DestinationType = await res.json();


    const priceLabel = destination.price
        ? destination.price.startsWith("$")
            ? destination.price
            : `$${destination.price}`
        : "$0";

    return (
        <div className="min-h-screen bg-background">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
                <Link
                    href="/destinations"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Back to Destinations
                </Link>
                <div className="flex items-center gap-3">
                    <EditDestinationDialog destination={destination}></EditDestinationDialog>
                    <DeleteDestinationDialog destination={destination}></DeleteDestinationDialog>
                </div>
            </div>

            {/* Hero image */}
            <div className="mx-4 overflow-hidden md:mx-10">
                {destination.imageUrl ? (
                    <Image
                        src={destination.imageUrl}
                        alt={destination.name ?? "Travel destination"}
                        width={1400}
                        height={700}
                        className="h-180 w-full object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-80 w-full items-center justify-center bg-muted text-muted-foreground md:h-125">
                        No image available
                    </div>
                )}
            </div>

            {/* Main content */}
            <main className="mx-auto max-w-6xl px-4 py-10 md:px-10 md:py-14">
                <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
                    {/* Left column */}
                    <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="size-4" />
                            <span>{destination.country ?? "Unknown"}</span>
                        </div>

                        <h1 className="mt-3 font-heading text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                            {destination.name ?? "Untitled Destination"}
                        </h1>

                        <div className="mt-5 flex items-center gap-4 text-sm md:text-base">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <CalendarDays className="size-4" />
                                <span className="font-medium text-foreground">
                                    {destination.duration ?? "7 Days / 6 Nights"}
                                </span>
                            </div>
                        </div>

                        <section className="mt-10">
                            <h2 className="font-heading text-2xl font-medium md:text-3xl">Overview</h2>
                            <p className="mt-3 text-muted-foreground leading-relaxed">
                                {destination.description ??
                                    "Discover the magic of this destination with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets."}
                            </p>
                        </section>

                    </div>

                    {/* Right card */}
                    <aside className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Starting from
                        </div>
                        <div className="mt-1 text-4xl font-semibold text-brand md:text-5xl">
                            {priceLabel}
                        </div>
                        <div className="text-sm text-muted-foreground">per person</div>

                        <div className="mt-5 text-sm font-medium text-foreground">
                            {destination.departureDate ?? "05/15/2026"}
                        </div>

                        <BookNowButton destination={destination}></BookNowButton>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                <Check className="size-4 text-green-600" />
                                <span>Free cancellation up to 7 days</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                <Check className="size-4 text-green-600" />
                                <span>Travel insurance included</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                <Check className="size-4 text-green-600" />
                                <span>24/7 customer support</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default DestinationDetailsPage;
