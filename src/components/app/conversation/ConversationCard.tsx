import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/date";
import { ConversationWithExtend } from "@/types/conversation.type";

interface ConversationCardProps {
  conversation: ConversationWithExtend;
}

export default function ConversationCard({
  conversation,
}: ConversationCardProps) {
  return (
    <Card>
      <CardContent>{conversation?.title}</CardContent>
      <CardFooter>
        <div className="flex justify-between w-100">
          <p>{getRelativeTime(conversation.createdAt)}</p>
          <p>
            {conversation?.messages.length > 0
              ? `Nombre de réponses : ${conversation?.messages.length}`
              : "Aucune réponse"}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
