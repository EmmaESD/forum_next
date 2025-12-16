"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Lien de réinitialisation invalide");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la réinitialisation");
      }

      toast.success("Mot de passe mis à jour. Vous pouvez maintenant vous connecter.");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Impossible de réinitialiser le mot de passe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border rounded-lg p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-center">
          Réinitialiser le mot de passe
        </h1>
        <Input
          type="password"
          placeholder="Nouveau mot de passe (min. 8 caractères)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Input
          type="password"
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={
            isSubmitting ||
            !password.trim() ||
            !confirmPassword.trim() ||
            password.length < 8
          }
        >
          Mettre à jour le mot de passe
        </Button>
      </form>
    </div>
  );
}


