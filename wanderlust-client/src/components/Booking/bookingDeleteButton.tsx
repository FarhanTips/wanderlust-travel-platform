
"use client"
import { MyBookingType } from "@/app/my-bookings/page";
import getTokenFromClientComponent from "@/lib/getTokenFromClientComponent";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface BookingDeleteButtonProps {
    booking: MyBookingType
}

const BookingDeleteButton = ({ booking }: BookingDeleteButtonProps) => {
    const router = useRouter();

    const handleBookingDeleteButton = async () => {
        const token = await getTokenFromClientComponent();

        const res = await fetch(`http://localhost:5000/my-bookings/${booking._id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log("After Delete", data);

        if (res.ok && data.acknowledged) {
            toast.warn(`${booking.name} booking Canceled`);
            router.refresh();
        }
    }
    return (
        <div className="flex sm:self-end">
            <button onClick={handleBookingDeleteButton}
                type="button"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-destructive px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
                <Trash2 className="size-4" />
                Cancel
            </button>
        </div>
    );
};

export default BookingDeleteButton;
