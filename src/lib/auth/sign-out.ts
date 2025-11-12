import { auth } from "./auth";
export async function signOut(request: Request) {
    try {
        await auth.api.signOut({
            headers: request.headers,
        });
        return { success: true };
    } catch (error) {
        console.error("Sign out error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Une erreur est survenue lors de la déconnexion"
        };
    }
}
