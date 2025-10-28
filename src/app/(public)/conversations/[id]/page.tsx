import MessageForm from "@/components/app/message/MessageForm";
import MessageList from "@/components/app/message/MessageList";

interface ConversationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConversationDetailPage({
  params,
}: ConversationDetailPageProps) {
  const { id } = await params;

  console.log("Conversation ID:", id);
  const response = await fetch(`http://localhost:3000/api/conversations/${id}`);
  const conversation = await response.json();

  return (
    <div className="container mx-auto">
      <h1>{conversation?.title}</h1>

      <div>
        <MessageForm conversationId={id} />
      </div>

      <div>
        <MessageList conversationId={id} />
      </div>
    </div>
  );
}
