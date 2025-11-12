"use client";

import ConversationList from "@/components/app/conversation/ConversationList";
import { useSession } from "@/hooks/use-session";
import { CardAuth } from "@/components/app/auth/cardAuth";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";

export default function Home() {
  const { isAuthenticated, isLoading, user } = useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      console.log("Sign out successful");
      window.location.reload();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-4 flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      {isAuthenticated && (
        <div className="w-full max-w-md flex justify-end mb-4">
          <Button variant="destructive" onClick={handleSignOut}>
            Se déconnecter
          </Button>
        </div>
      )}

      {!isAuthenticated && <CardAuth />}

      {isAuthenticated ? (
        <div className="mt-6 w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">
            Bienvenue {user?.name || user?.email} !
          </h2>
          <ConversationList />
        </div>
      ) : (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800">
            Veuillez vous connecter pour voir les conversations.
          </p>
        </div>
      )}
    </div>
  );
}
