import { Conversation, Message } from "@/generated/prisma";

export interface ConversationWithExtend extends Conversation {
  title: string;
  authorId: string;
  messages: Message[];
}
