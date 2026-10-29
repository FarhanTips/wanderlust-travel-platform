import DestinationsExplorer from "@/components/CRUD Destination/DestinationsExplorer";
import type { DestinationType } from "@/lib/destinations";

const AllDestinationsPage = async () => {

    const res = await fetch(`${process.env.API_URL}/destinations`, {
        cache: "no-store",
    });
    const destinations: DestinationType[] = await res.json();

    return (
        <main className="flex-1 px-4 py-12">
            <div className="mx-auto w-full max-w-6xl">
                <header>
                    <h1 className="font-heading text-4xl font-light md:text-5xl">
                        Explore All Destinations
                    </h1>
                    <p className="mt-3 text-muted-foreground md:text-lg">
                        Find your perfect travel experience from our curated collection
                    </p>
                </header>

                <DestinationsExplorer destinations={destinations} />
            </div>
        </main>
    );
};

export default AllDestinationsPage;
