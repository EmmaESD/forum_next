import { Message } from "@/generated/prisma";
import DeleteButton from "../common/DeleteButton";
import MessageService from "@/services/message.service";
import { useSession } from "@/hooks/use-session";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const { user } = useSession();
  const isOwner = user?.id === message.authorId;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(message.content);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newContent: string) => {
      await MessageService.updateById(message.id, { content: newContent });
    },
    onSuccess: () => {
      toast.success("Message mis à jour");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    if (!value.trim()) return;
    mutation.mutate(value);
  };

  return (
    <div className="border shadow-sm rounded-md p-8 relative space-y-2">
      {isOwner && (
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            ✏️
          </Button>
          <DeleteButton
            entityName="Message"
            queryKey="messages"
            onDelete={MessageService.deleteById}
            id={message.id}
          />
        </div>
      )}

      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={mutation.isPending || !value.trim()}
            >
              Enregistrer
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setValue(message.content);
              }}
              disabled={mutation.isPending}
            >
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <p>{message.content}</p>
      )}
    </div>
  );
}
