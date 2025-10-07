"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/data/authContext';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      

      login(data.token, data.user);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="p-40">
    <Card className=" bg-black backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-red-400">Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="login" onSubmit={handleSubmit} >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label >Email</Label>
              <Input className="border-white/50 hover:bg-white/5 hover:border-white" 

                type="email"
                value={email}
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input className="border-white/50 hover:bg-white/5 hover:border-white" 
              value={password} id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col">
        <Button form="login" className='border-green-500 hover:bg-green-500 w-full hover:font-bold transition ' 
        variant='outline'type="submit" disabled={loading} >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
    <p className="py-8 text-center text-white/70">
  New user?{" "}
  <Link href="/signup" className="text-green-400 hover:underline" >
    Sign up
  </Link>
</p>
</div>
  )

}
