"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type User = {
  _id: string;
  name: string;
  email: string;
};


export default function Page() {
    const router =  useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const signupRequest = async() => {
        const response =  await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, {email, name, password});
        
        if(response.status === 201){
            const data = response.data as User;
            console.log(data);
            router.push('/login');
        }else{
            toast(response.data.error)
        }
    }

    return (
        <div className="justify-center mx-auto flex h-screen w-screen items-center">

            <Card className="w-full max-w-sm ">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>

                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="name"
                                    type="text"
                                    placeholder="Enter A Name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>

                                </div>
                                <Input 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password" 
                                    type="password" 
                                    required 
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={signupRequest} type="submit" className="w-full">
                        Signup
                    </Button>
                    <a
                        href="/login"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Already User? Login
                    </a>
                </CardFooter>
            </Card>
        </div>
    )
}
