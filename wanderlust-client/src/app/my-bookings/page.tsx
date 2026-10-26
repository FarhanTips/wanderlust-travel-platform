
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() 
    })
    console.log("my bookings session", session);

    const res = await fetch(`http://localhost:5000/my-bookings/${session?.user.email}`);

    const myBookedData = await res.json();
    console.log(myBookedData);
    return (
        <div>

        </div>
    );
};

export default MyBookingPage;
