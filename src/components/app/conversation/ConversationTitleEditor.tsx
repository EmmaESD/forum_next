"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import ConversationService from "@/services/conversation.service";
import { toast } from "sonner";

interface ConversationTitleEditorProps {
  id: string;
  title: string;
  authorId: string;
}

export default function ConversationTitleEditor({
  id,
  title,
  authorId,
}: ConversationTitleEditorProps) {
  const { user } = useSession();
  const isOwner = user?.id === authorId;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await ConversationService.updateById(id, { title: value });
      toast.success("Conversation mise à jour");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour de la conversation");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOwner) {
    return <h1>{title}</h1>;
  }

  return (
    <div className="flex items-center gap-2 w-full">
      {isEditing ? (
        <>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1"
          />
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving || value.trim() === ""}
          >
            Enregistrer
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              setValue(title);
            }}
            disabled={isSaving}
          >
            Annuler
          </Button>
        </>
      ) : (
        <>
          <h1 className="flex-1">{title}</h1>
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            Modifier
          </Button>
        </>
      )}
    </div>
  );
}


