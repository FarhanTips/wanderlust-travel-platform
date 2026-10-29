
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { SyntheticEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DestinationType } from "@/lib/destinations";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { toast } from "react-toastify";
import getTokenFromClientComponent from "@/lib/getTokenFromClientComponent";

interface EditFormProps {
    destination: DestinationType
}

const EditForm = ({destination}: EditFormProps) => {

    const router = useRouter();

    // Remembers the form so we can clear all fields at once
    const formRef = useRef<HTMLFormElement>(null);

    // Keeps the category dropdown in sync, so Cancel can clear it too
    const [category, setCategory] = useState<string>(destination.category ?? "");

    async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const editedPackage: Record<string, string> = {};

        formData.forEach((value, key) => {
            editedPackage[key] = value.toString();
        });
        console.log("Data from form", editedPackage);

        const token = await getTokenFromClientComponent();

        const res = await fetch(`http://localhost:5000/destination/${destination._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(editedPackage),
        })

        const data = await res.json();
        console.log("after PATCH destination", data);

        if (res.ok && data.acknowledged) {
            toast.success("Update Successfull!");
            // formRef.current?.reset();
            // setCategory("");
            router.refresh();
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Destination Name */}
            <div className="grid gap-2">
                <Label htmlFor="name">Destination Name</Label>
                <Input id="name" name="name" defaultValue={destination.name} />
            </div>

            {/* Country + Category */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                        id="country"
                        name="country"
                        defaultValue={destination.country}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>Category</Label>
                    <Select name="category" value={category} onValueChange={(value) => setCategory(value ?? "")}>
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
                        defaultValue={destination.price}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                        id="duration"
                        name="duration"
                        defaultValue={destination.duration}
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
                    defaultValue={destination.departureDate}
                />
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    defaultValue={destination.imageUrl}
                />
            </div>

            {/* Description */}
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={destination.description}
                />
            </div>

            {/* Buttons */}
            <DialogFooter>
                <DialogClose render={<Button variant="outline">Cancel</Button>} />
                <DialogClose render={<Button type="submit">Save changes</Button>} />

            </DialogFooter>
        </form>
    );
};

export default EditForm;
