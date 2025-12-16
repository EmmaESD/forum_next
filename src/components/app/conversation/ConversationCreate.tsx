"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import ConversationService from "@/services/conversation.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface NewConversationProps {
  title: string;
  authorId: string;
  messages?: [];
}

export default function NewConversation({
  title,
  authorId,
}: NewConversationProps) {
    const {handleSubmit, register} = useForm<Pick<NewConversationProps, "title">>({
      defaultValues: {
        title: title || "",
      },
    });
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: Pick<NewConversationProps, "title">) => {
            await ConversationService.createConversation({
              title: data.title,
              authorId,
              messages: [],
            } as any);
        },
        onSuccess: () => {
            toast.success("Conversation created successfully!");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        }
    });

    const onSubmit = async (data: Pick<NewConversationProps, "title">) => {
        mutation.mutate(data);
    };

    

    return (
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="text"
                placeholder="Titre de la conversation"
                className="mb-4"
                {...register("title")}
            ></Input>
        <Button
        type="submit"
      >
        {mutation.isPending && <Spinner className="mr-2" />}
        Créer une conversation
      </Button>
        </form>
    );
}