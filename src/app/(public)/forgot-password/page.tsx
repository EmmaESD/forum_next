"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la demande de réinitialisation");
      }

      toast.success(
        "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé."
      );
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
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
          Mot de passe oublié
        </h1>
        <p className="text-sm text-zinc-600">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
        <Input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !email.trim()}
        >
          Envoyer le lien
        </Button>
      </form>
    </div>
  );
}


