import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcrypt") as typeof import("bcrypt");

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: "Token and password are required" },
      { status: 400 }
    );
  }

  const verification = await prisma.verification.findFirst({
    where: { value: token },
  });

  if (!verification || verification.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: verification.identifier },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // On suppose que le provider email/password utilise providerId = "email"
  await prisma.account.updateMany({
    where: {
      userId: user.id,
      providerId: "email",
    },
    data: {
      password: hashedPassword,
    },
  });

  // On supprime le token pour qu'il ne soit utilisable qu'une fois
  await prisma.verification.delete({
    where: { id: verification.id },
  });

  return NextResponse.json({ ok: true });
}
