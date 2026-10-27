"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { SyntheticEvent } from "react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"

export default function SignUpPage() {

    const router = useRouter();

    const handleSignUp = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user: Record<string, string> = {};

        formData.forEach((value, key) => {
            user[key] = value.toString();
        });

        console.log("data from form", user)

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
        });

        console.log("data", data);
        console.log("error", error);

        if (error) {
            toast.error(error.message ?? "Something went wrong!");
            return;
        }

        toast.success("Your account has been created successfully!");
        router.push("/log-in");
    };

    return (
        <div className="flex flex-col gap-6 max-w-lg w-full mx-auto my-20">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Sign Up Form</CardTitle>
                    <CardDescription>
                        Please complete the form accurately
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignUp}>
                        <FieldGroup>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                            </FieldSeparator>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="your name"
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input id="password" type="password" name="password" placeholder="password" required minLength={8} />
                            </Field>
                            <Field>
                                <Button type="submit" className="cursor-pointer">Sign Up</Button>
                                <FieldDescription className="text-center">
                                    Have an account? <Link href="log-in">Log In</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                <Link href="/">⬅︎ Go to homepage</Link>
            </FieldDescription>
        </div>
    )
}
