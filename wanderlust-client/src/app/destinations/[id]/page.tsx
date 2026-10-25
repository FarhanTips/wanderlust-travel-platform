import { DestinationType } from "@/lib/destinations";

interface DestinationDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const DestinationDetailsPage = async ({params}: DestinationDetailsPageProps) => {

    const {id} = await params;

    const res = await fetch(`http://localhost:5000/destination/${id}`);
    const destination: DestinationType = await res.json();
    console.log(destination)
    return (
        <div>
            {destination.name}
        </div>
    );
};

export default DestinationDetailsPage;
