"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/hooks/use-session";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProfileData {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  bio: string | null;
  contributions: number;
}

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useSession();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      setIsFetching(true);
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Erreur lors du chargement du profil");
        }
        setProfile(data);
        setName(data.name ?? "");
        setAvatar(data.avatar ?? "");
        setBio(data.bio ?? "");
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger le profil");
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, avatar, bio }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }

      setProfile((prev) => (prev ? { ...prev, name, avatar, bio } : prev));
      toast.success("Profil mis à jour");
    } catch (error) {
      console.error(error);
      toast.error("Impossible de mettre à jour le profil");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Vous devez être connecté pour voir votre profil.</p>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const initials =
    profile.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || profile.email[0].toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center text-xl font-semibold overflow-hidden">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                alt={profile.name ?? profile.email}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm text-zinc-500">{profile.email}</p>
            <p className="text-sm text-zinc-500">
              Contributions : <span className="font-semibold">{profile.contributions}</span>
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL de l&apos;avatar</label>
            <Input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


