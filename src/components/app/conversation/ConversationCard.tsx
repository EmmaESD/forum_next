import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/date";
import { ConversationWithExtend } from "@/types/conversation.type";
import Link from "next/link";
import { useSession } from "@/hooks/use-session";
import ConversationDeleteButton from "./ConversationDeleteButton";

interface ConversationCardProps {
  conversation: ConversationWithExtend;
}

export default function ConversationCard({
  conversation,
}: ConversationCardProps) {
  const { user } = useSession();
  const isOwner = user?.id === conversation.authorId;

  return (
    <Card className="cursor-pointer hover:shadow-md transition-all">
      <Link href={`/conversations/${conversation.id}`} className="block flex-1">
        <CardContent>{conversation?.title}</CardContent>
      </Link>
      <CardFooter className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-sm italic text-zinc-500">
            {getRelativeTime(conversation.createdAt)}
          </p>
          <p className="text-sm italic text-zinc-500">
            {conversation?.messages.length > 0
              ? `Nombre de réponses : ${conversation?.messages.length}`
              : "Aucune réponse"}
          </p>
        </div>
        {isOwner && (
          <ConversationDeleteButton
            id={conversation.id}
          />
        )}
      </CardFooter>
    </Card>
  );
}
