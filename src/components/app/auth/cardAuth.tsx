"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { SignIn } from "./signinForm";
import { SignUp } from "./signupForm";
import { useState } from "react";

export function CardAuth() {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleMode = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <Card className="w-full max-w-md p-6 shadow-lg">
            <CardHeader>
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isSignIn ? "Se connecter" : "Créer un compte"}
                </h2>

                <CardDescription className="text-center">
                    {isSignIn
                        ? "Entrez votre email ci-dessous pour vous connecter à votre compte"
                        : "Créez votre compte pour accéder à toutes les fonctionnalités"
                    }
                </CardDescription>
                
            </CardHeader>
            <CardContent>
                {isSignIn ? <SignIn /> : <SignUp />}
            </CardContent>
            <CardFooter>
                <CardAction className="flex justify-center items-center">
                    <Button variant="link" onClick={toggleMode}>
                    {isSignIn ? "Pas encore de compte ? Créer un compte" : "Déjà un compte ? Se connecter"}
                    </Button>
                </CardAction>
            </CardFooter>
        </Card>
    );
}