"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";

export function AuthExample() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await authClient.signUp.email({
                email,
                password,
                name,
            });
            console.log("Sign up successful:", result);
        } catch (error) {
            console.error("Sign up error:", error);
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });
            console.log("Sign in successful:", result);
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            console.log("Sign out successful");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold">Authentification</h2>

            <form onSubmit={handleSignUp} className="space-y-2">
                <h3 className="text-xl">Inscription</h3>
                <input
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    S&apos;inscrire
                </button>
            </form>

            <form onSubmit={handleSignIn} className="space-y-2">
                <h3 className="text-xl">Connexion</h3>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Se connecter
                </button>
            </form>

            <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Se déconnecter
            </button>
        </div>
    );
}
