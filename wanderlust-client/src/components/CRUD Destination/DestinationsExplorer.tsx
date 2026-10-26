"use client";

import { useState } from "react";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import type { DestinationType } from "@/lib/destinations";
import DestinationCard from "./DestinationCard";

const priceRanges = [
    { label: "Under $200", min: 0, max: 199 },
    { label: "$200 to $399", min: 200, max: 399 },
    { label: "$400 & above", min: 400, max: Infinity },
] as const;

const sortOptions = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
] as const;

// Sentinel value for the "All Categories" option — never matches a real category.
const ALL_CATEGORIES = "all";

// Keeps the trigger text flush and uppercase like the design's filter bar.
const triggerClassName =
    "h-12 w-full justify-between rounded-none border-0 bg-transparent px-4 text-sm font-medium uppercase tracking-wide shadow-none focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-ring/40 dark:bg-transparent dark:hover:bg-transparent";

function priceOf(destination: DestinationType) {
    const parsed = Number(String(destination.price ?? "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

type DestinationsExplorerProps = {
    destinations: DestinationType[];
};

const DestinationsExplorer = ({ destinations }: DestinationsExplorerProps) => {
    // `null` means "not chosen", so the trigger shows its placeholder label.
    const [category, setCategory] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string | null>(null);

    const categories = Array.from(
        new Set(
            destinations
                .map((destination) => destination.category)
                .filter((value): value is string => Boolean(value))
        )
    ).sort();

    const selectedRange =
        priceRanges.find((range) => range.label === priceRange) ?? null;

    const visible = destinations.filter((destination) => {
        if (category && category !== ALL_CATEGORIES && destination.category !== category)
            return false;

        if (selectedRange) {
            const price = priceOf(destination);
            if (price < selectedRange.min || price > selectedRange.max) {
                return false;
            }
        }

        return true;
    });

    if (sortBy === "price-asc") {
        visible.sort((a, b) => priceOf(a) - priceOf(b));
    } else if (sortBy === "price-desc") {
        visible.sort((a, b) => priceOf(b) - priceOf(a));
    } else if (sortBy === "name-asc") {
        visible.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
    }

    return (
        <section className="mt-8">
            {/* Filter bar */}
            <div className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-lg border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="min-w-0">
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className={triggerClassName}>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={ALL_CATEGORIES}>
                                All Categories
                            </SelectItem>
                            {categories.map((value) => (
                                <SelectItem key={value} value={value}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="min-w-0">
                    <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger className={triggerClassName}>
                            <SelectValue placeholder="Price Range" />
                        </SelectTrigger>
                        <SelectContent>
                            {priceRanges.map(range => (
                                <SelectItem key={range.label} value={range.label}>
                                    {range.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="min-w-0">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className={triggerClassName}>
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Result count */}
            <p className="mt-4 text-sm text-muted-foreground">
                Showing {visible.length}{" "}
                {visible.length === 1 ? "destination" : "destinations"}
            </p>

            {/* Card grid */}
            {visible.length > 0 ? (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((destination) => (
                        <DestinationCard
                            key={destination._id}
                            destination={destination}
                        />
                    ))}
                </div>
            ) : (
                <p className="mt-10 text-center text-muted-foreground">
                    No destinations match the selected filters.
                </p>
            )}
        </section>
    );
};

export default DestinationsExplorer;
