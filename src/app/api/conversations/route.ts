import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const conversations = await prisma.conversation.findMany({
    include: {
      messages: {
        select: { id: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      deletedAt: null,
    },
  });

  return NextResponse.json(conversations);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, authorId } = body;

    if (!title || !authorId) {
      return NextResponse.json(
        { error: "Title and authorId are required" },
        { status: 400 }
      );
    }

    const conversation = await prisma.conversation.create({
      data: {
        title,
        authorId,
      },
    });

    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 }
    );
  }
}
