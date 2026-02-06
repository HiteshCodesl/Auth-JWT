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
import { LoaderCircle } from "lucide-react"


type loginResponse = {
  success: boolean;
  data: {
    token: string,
  };
  error?: string;
};


export default function Page() {
    const router =  useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginRequest = async() => {
        try{
        setLoading(true);
        const response =  await axios.post<loginResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {email, password});
        
        if(response.status === 201){
            const data = response.data;
            console.log(data);
            const token = data.token;

            localStorage.setItem("token", token);

            toast.success("Login Successfully")

            router.push('/dashboard/me');
        }
        }catch{
            toast.error("login Failed")
        }finally{
            setLoading(false);
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
                    <Button onClick={loginRequest} type="submit" className="w-full">
                         Login
                        {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    </Button>
                    <a
                        href="/signup"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Not A User? Signup
                    </a>
                </CardFooter>
            </Card>
        </div>
    )
}
