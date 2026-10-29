
import MyBookingCard from "@/components/Booking/myBookingCard";
import { auth } from "@/lib/auth";
import getTokenFromServerComponent from "@/lib/getTokenFromServerComponent";
import { headers } from "next/headers";

export interface MyBookingType {
    _id: string;
    email: string;
    name: string;
    country: string;
    category: string;
    price: string;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
    BookingTime: string;
}

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log("my bookings session", session);

    const token = await getTokenFromServerComponent();

    const res = await fetch(`http://localhost:5000/my-bookings/${session?.user.email}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    // console.log(res);
    const myBookedData: MyBookingType[] = await res.json();
    // console.log("myBookedData", myBookedData);
    // console.log("myBookedData", myBookedData.length);

    return (
        <main className="flex-1 px-4 py-12">
            <div className="mx-auto w-full max-w-6xl">
                <header>
                    <h1 className="font-heading text-4xl font-light md:text-5xl">
                        My Bookings
                    </h1>
                    <p className="mt-3 text-muted-foreground md:text-lg">
                        Manage and view your upcoming travel plans
                    </p>
                </header>

                {
                    myBookedData.length > 0 ?
                        <div className="mt-8 flex flex-col gap-6 mb-50">
                            {
                                myBookedData.map(booking => <MyBookingCard key={booking._id} booking={booking}></MyBookingCard>)
                            }
                        </div>
                        :
                        <div className="flex min-h-[60vh] items-center justify-center">
                            <p className="text-muted-foreground">No Bookings Yet..</p>
                        </div>
                }
            </div>
        </main>
    );
};

export default MyBookingPage;
