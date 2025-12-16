import MessageForm from "@/components/app/message/MessageForm";
import MessageList from "@/components/app/message/MessageList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ConversationTitleEditor from "@/components/app/conversation/ConversationTitleEditor";

interface ConversationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConversationDetailPage({
  params,
}: ConversationDetailPageProps) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/conversations/${id}`, {
    cache: "no-store",
  });
  const conversation = await response.json();

  return (
    <div className="container mx-auto">
      <div className="my-4">
        <Link href="/" className="flex items-center mb-4">
          <Button variant="link">&larr; Back to Conversations</Button>
        </Link>
      </div>

      <div className="bg-amber-100 p-4 rounded-md text-xl flex items-center gap-2">
        Subject:
        <ConversationTitleEditor
          id={conversation.id}
          title={conversation.title}
          authorId={conversation.authorId}
        />
      </div>

      <div>
        <MessageForm conversationId={id} />
      </div>

      <div>
        <MessageList conversationId={id} />
      </div>
    </div>
  );
}
