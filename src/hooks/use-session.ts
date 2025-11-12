"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useEffect, useState } from "react";

export function useSession() {
    const [session, setSession] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data } = await authClient.getSession();
                setSession(data);
            } catch (error) {
                console.error("Error fetching session:", error);
                setSession(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, []);

    return {
        session,
        user: session?.user || null,
        isAuthenticated: !!session?.user,
        isLoading,
    };
}
