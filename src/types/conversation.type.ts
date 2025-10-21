// type conversation with extended messages
import { Conversation, Message } from "@/generated/prisma";

export interface ConversationWithExtend extends Conversation {
  messages: Message[];
}
