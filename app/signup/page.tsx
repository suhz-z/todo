"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-30">
      <Card className=" bg-black/60 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-blue-400">Create a new account</CardTitle>
        </CardHeader>

        <CardContent>
          <form id="signup" onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                className="border-white/50 hover:bg-white/5 hover:border-white"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                className="border-white/50 hover:bg-white/5 hover:border-white"
                type="email"
                value={email}
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                className="border-white/50 hover:bg-white/5 hover:border-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                className="border-white/50 hover:bg-white/5 hover:border-white"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              form="signup"
              type="submit"
              variant="outline"
              className="border-green-500 hover:bg-green-500 hover:font-bold transition w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          
        </CardFooter>
        
      </Card>
         <p className="py-8 text-center text-white/70">
            Already have an account?{" "}
            <Link href="/login" className="text-green-400 hover:text-green-500 font-semibold">
              Login
            </Link>
          </p>
    </div>
  );
}
