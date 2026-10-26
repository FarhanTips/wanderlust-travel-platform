
"use client";
import { Trash2Icon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DestinationType } from "@/lib/destinations";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";


interface DeleteDestinationDialogProps {
    destination: DestinationType;
}

const DeleteDestinationDialog = ({ destination }: DeleteDestinationDialogProps) => {

    const router = useRouter();

    const handleDeleteButton = async () => {
        const res = await fetch(`http://localhost:5000/destination/${destination._id}`, {
            method: "Delete"
        });

        const data = await res.json();
        console.log("After Delete", data);

        if (res.ok && data.acknowledged) {
            toast.error("Delete Successfull!");
            // formRef.current?.reset();
            // setCategory("");
            router.replace("/destinations");   // Use replace instead of push so the user can't go back to the deleted destination page
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button variant="destructive" className="p-4.5 cursor-pointer">Delete</Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete Destination?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the destination from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDeleteButton}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDestinationDialog;
