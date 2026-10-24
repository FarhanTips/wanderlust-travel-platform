"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { SaveIcon, Trash2Icon } from "lucide-react";
import { SyntheticEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const AddDestinationPage = () => {

    const router = useRouter();

    // Remembers the form so we can clear all fields at once
    const formRef = useRef<HTMLFormElement>(null);

    // Keeps the category dropdown in sync, so Cancel can clear it too
    const [category, setCategory] = useState<string | null>("Beach");

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newPackage: Record<string, string> = {};

        formData.forEach((value, key) => {
            newPackage[key] = value.toString();
        });
        console.log("Data from form", newPackage);

        const res = await fetch("http://localhost:5000/add-destination", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPackage),
        })

        const data = await res.json();
        console.log("after POST data", data);

        if (res.ok && data.acknowledged) {
            toast.success("Destination added successfully!");
            formRef.current?.reset();
            setCategory(null);

            
            router.refresh();
        }
    }

    function handleCancel() {
        formRef.current?.reset();   // clears every input, textarea and date
        setCategory(null);          // clears the category dropdown
    }

    return (
        <main className="flex-1 px-4 py-12">
            <div className="mx-auto w-full max-w-xl">
                <h1 className="mb-8 font-heading text-4xl font-light">
                    Add New Travel Package
                </h1>

                <Card className="shadow-md">
                    <CardContent>
                        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Destination Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="name">Destination Name</Label>
                                <Input id="name" name="name" placeholder="Bali Paradise" />
                            </div>

                            {/* Country + Category */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        placeholder="Indonesia"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Category</Label>
                                    <Select name="category" value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Beach">Beach</SelectItem>
                                            <SelectItem value="Adventure">Adventure</SelectItem>
                                            <SelectItem value="Cultural">Cultural</SelectItem>
                                            <SelectItem value="City">City</SelectItem>
                                            <SelectItem value="Nature">Nature</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Price + Duration */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price (USD)</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="e.g. 1299"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Duration</Label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        placeholder="e.g. 7 Days/6 Nights"
                                    />
                                </div>
                            </div>

                            {/* Departure Date */}
                            <div className="grid gap-2">
                                <Label htmlFor="departureDate">Departure Date</Label>
                                <Input
                                    id="departureDate"
                                    name="departureDate"
                                    type="date"
                                />
                            </div>

                            {/* Image URL */}
                            <div className="grid gap-2">
                                <Label htmlFor="imageUrl">Image URL</Label>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            {/* Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe the travel experience..."
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="destructive" size="lg" onClick={handleCancel}>
                                    <Trash2Icon /> Cancel
                                </Button>
                                <Button type="submit" size="lg">
                                    <SaveIcon /> Add Travel Package
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default AddDestinationPage;
