
"use client";

import { authClient } from "@/lib/auth-client";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserInfo = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    console.log("Nav session", session);

    if (isPending) {
        return (
            <div className="text-foreground/75">
                Loading...
            </div>
        );
    }

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Signed out successfully!");
                    router.push("/log-in"); // redirect to login page. // Client-side event handler থেকে navigate করছি, তাই router.push ব্যবহার করেছি।
                },
            },
        });
    };
    return (
        <div>
            {
                session?.user ?
                    <div>
                        <Popover>
                            <PopoverTrigger render={<Button variant="outline" className="w-fit">{session.user?.name} ▼</Button>} />
                            <PopoverContent align="start">
                                <PopoverHeader>
                                    <PopoverTitle>{session.user?.name}</PopoverTitle>
                                    <PopoverDescription>
                                        <span className="block">{session.user?.email}</span>
                                        <Link
                                            href="/profile"
                                            className="my-4 hidden items-center gap-1.5 text-foreground/75 transition-colors hover:text-brand sm:flex"
                                        >
                                            <CircleUserRound className="size-4" />
                                            Profile
                                        </Link>
                                        <Button variant="destructive" className="cursor-pointer" onClick={handleSignOut}>↩︎ Sign Out</Button>
                                    </PopoverDescription>
                                </PopoverHeader>
                            </PopoverContent>
                        </Popover>
                    </div>
                    :
                    <div className="flex items-center gap-4 text-sm font-medium sm:gap-5">
                        <Link
                            href="/log-in"
                            className="text-foreground/75 transition-colors hover:text-brand"
                        >
                            Login
                        </Link>
                        <Link
                            href="/sign-up"
                            className="text-foreground/75 transition-colors hover:text-brand"
                        >
                            Sign Up
                        </Link>
                    </div>
            }
        </div>
    );
};

export default UserInfo;
