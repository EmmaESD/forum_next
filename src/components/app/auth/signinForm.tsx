"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });
            console.log("Sign in successful:", result);
            window.location.reload(); // Recharge la page pour actualiser la session
        } catch (error) {
            console.error("Sign in error:", error);
            setError("Email ou mot de passe incorrect");
        }
    };

    return (
        <form onSubmit={handleSignIn} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                    {error}
                </div>
            )}
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" className="w-full">
                Se connecter
            </Button>
        </form>
    );
}
