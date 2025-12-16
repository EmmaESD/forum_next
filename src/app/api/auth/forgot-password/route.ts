import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Toujours renvoyer 200 pour ne pas révéler si l'email existe
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1h

  await prisma.verification.create({
    data: {
      id: crypto.randomUUID(),
      identifier: email,
      value: token,
      expiresAt,
    },
  });

  const resetUrl = `${
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  }/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: "Forum <no-reply@your-app.dev>",
      to: [email],
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <p>Bonjour,</p>
        <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous :</p>
        <p><a href="${resetUrl}">Réinitialiser mon mot de passe</a></p>
        <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.</p>
      `.trim(),
    });
  } catch (error) {
    console.error("Error sending reset email:", error);
    // On ne révèle pas l'erreur exacte au client
  }

  return NextResponse.json({ ok: true });
}
