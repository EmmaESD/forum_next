import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("DELETE message called", params);
  const { id } = await params;

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const message = await prisma.message.findUnique({
    where: { id },
  });

  if (!message) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  if (message.authorId !== session.user.id) {
    return NextResponse.json(
      { error: "You are not allowed to delete this message" },
      { status: 403 }
    );
  }

  const deletedMessage = await prisma.message.delete({
    where: { id },
  });

  return NextResponse.json(deletedMessage);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const message = await prisma.message.findUnique({
    where: { id },
  });

  if (!message) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  if (message.authorId !== session.user.id) {
    return NextResponse.json(
      { error: "You are not allowed to edit this message" },
      { status: 403 }
    );
  }

  const body = await request.json();

  const updatedMessage = await prisma.message.update({
    where: { id },
    data: {
      content: body.content ?? message.content,
    },
  });

  return NextResponse.json(updatedMessage);
}
