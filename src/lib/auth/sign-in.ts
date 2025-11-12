import { auth } from "./auth";

export async function signIn(email: string, password: string, rememberMe: boolean = false) {
    try {
        const result = await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        return { success: true, data: result };
    } catch (error) {
        console.error("Sign in error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Une erreur est survenue lors de la connexion"
        };
    }
}
