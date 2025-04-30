"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useDatabase } from "@/hooks/useDatabase";
import { hash } from "bcryptjs";
import { signIn } from "next-auth/react";
import { STORE_NAMES } from "@/lib/db/schema";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { db } = useDatabase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!db) {
      setError("Database not initialized");
      setIsLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const existingUser = await db.get(STORE_NAMES.USERS, email);
      if (existingUser) {
        setError("Email already registered");
        setIsLoading(false);
        return;
      }

      // Hash password
      const hashedPassword = await hash(password, 10);
      const userId = crypto.randomUUID();

      // Create new user
      await db.add(STORE_NAMES.USERS, {
        id: userId,
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      // Sign in the user
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        setError("Failed to sign in after registration");
        setIsLoading(false);
        return;
      }

      // Redirect to dashboard
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6">
        <div>
          <h2 className="text-center text-3xl font-bold">Create Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link href="/auth/signin" className="text-sm text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 