
"use client";
import { DestinationType } from "@/lib/destinations";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";

interface BookNowButtonProps {
    destination: DestinationType
}

const BookNowButton = ({ destination }: BookNowButtonProps) => {

    const { data: session, isPending } = authClient.useSession();
    console.log("Book Now session", session);
    if (isPending) {
        return (
            <Button
                className="mt-6 w-full rounded-lg bg-white py-6.5 text-base font-semibold text-foreground/65  border border-gray-400 hover:bg-white">
                Loading...
            </Button>
        );
    }

    const { _id, ...destinationData } = destination;
    const handleBookNowButton = async () => {
        const bookedData = {
            email: session?.user.email,
            ...destinationData,
            BookingTime: new Date(),
        }
        console.log(bookedData);
        // console.log(JSON.stringify(bookedData));

        const res = await fetch("http://localhost:5000/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookedData),
        });

        const data = await res.json();
        console.log("after POST  bookedData", data);

        if (res.ok && data.acknowledged) {
            toast.success(`${bookedData.name} booked successfully!`);
        }


    }
    return (
        <div>
            {
                session?.user ?
                    <Button onClick={handleBookNowButton}
                        className="cursor-pointer mt-6 w-full rounded-lg bg-brand py-6.5 text-base font-semibold text-white hover:bg-brand-dark"
                    >
                        Book Now
                        <ArrowRight className="size-4" />
                    </Button>
                    :
                    <Link href="/log-in">
                        <Button
                            className="cursor-pointer mt-6 w-full rounded-lg bg-white border border-gray-400 py-6.5 text-base font-semibold text-brand hover:bg-white"
                        >
                            Log In First
                        </Button>
                    </Link>
            }

        </div>
    );
};

export default BookNowButton;
