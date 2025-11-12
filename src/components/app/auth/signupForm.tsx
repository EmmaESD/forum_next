"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";

export function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        try {
            const result = await authClient.signUp.email({
                email,
                password,
                name,
            });
            console.log("Sign up successful:", result);
            setSuccess(true);
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error("Sign up error:", error);
            setError("Erreur lors de l'inscription. L'email existe peut-être déjà.");
        }
    };

    return (
        <form onSubmit={handleSignUp} className="space-y-4">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                    {error}
                </div>
            )}
            {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
                    Inscription réussie ! Redirection...
                </div>
            )}
            <Input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Mot de passe (min. 8 caractères)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
            />
            <Button type="submit" className="w-full">
                S&apos;inscrire
            </Button>
        </form>
    );
}