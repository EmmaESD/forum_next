"use client";

import ConversationList from "@/components/app/conversation/ConversationList";
import { useSession } from "@/hooks/use-session";
import { CardAuth } from "@/components/app/auth/cardAuth";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import NewConversationButton from "@/components/app/conversation/ConversationCreate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProfileSummary {
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  contributions: number;
}

export default function Home() {
  const { isAuthenticated, isLoading, user } = useSession();
  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      console.log("Sign out successful");
      window.location.reload();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      setIsProfileLoading(true);
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Erreur lors du chargement du profil");
        }
        setProfile({
          name: data.name,
          email: data.email,
          avatar: data.avatar,
          bio: data.bio,
          contributions: data.contributions,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

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
        <div className="w-full max-w-4xl flex justify-between items-center mb-4">
          
          <Button variant="destructive" onClick={handleSignOut}>
            Se déconnecter
          </Button>
        </div>
      )}

      {!isAuthenticated && <CardAuth />}

      {isAuthenticated ? (
        <div className="mt-6 w-full max-w-6xl flex gap-6 items-start">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">
              Bienvenue {user?.name || user?.email} !
            </h2>
            <NewConversationButton authorId={user?.id || ""} title="" />
            <ConversationList />
          </div>

          <div className="w-full max-w-sm">
            <Card>
              <CardHeader className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center overflow-hidden text-lg font-semibold">
                  {profile?.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatar}
                      alt={profile.name || profile.email}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {(profile?.name || profile?.email || "?")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <p className="font-semibold">
                    {profile?.name || user?.name || user?.email}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {profile?.email || user?.email}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs uppercase text-zinc-500">Bio</p>
                  <p className="text-sm text-zinc-700">
                    {isProfileLoading
                      ? "Chargement..."
                      : profile?.bio || "Aucune bio pour le moment."}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-zinc-500">
                    Contributions
                  </p>
                  <p className="text-sm font-semibold">
                    {profile?.contributions ?? "—"}
                  </p>
                </div>
                <div className="pt-2 space-y-2">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full">
                      Voir / éditer mon profil
                    </Button>
                  </Link>
                  <Link href="/forgot-password">
                    <Button variant="ghost" className="w-full text-xs text-zinc-600">
                      Réinitialiser mon mot de passe
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
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
