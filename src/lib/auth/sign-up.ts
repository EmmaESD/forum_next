import { auth } from "./auth";

export async function signUp(email: string, password: string, name?: string) {
    try {
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: name || "",
            },
        });

        return { success: true, data: result };
    } catch (error) {
        console.error("Sign up error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription"
            // tes test test
        };
    }
}
