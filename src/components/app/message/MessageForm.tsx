"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageService from "@/services/message.service";
import { MessageDTO } from "@/types/message.type";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface MessageFormProps {
  conversationId: string;
}

export default function MessageForm({ conversationId }: MessageFormProps) {
  const { register, handleSubmit, watch, reset } = useForm<MessageDTO>();

  const onSubmit = async (data: MessageDTO) => {
    try {
      await MessageService.createMessage({
        ...data,
        conversationId,
      });
      reset();
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const contentWatch = watch("content");

  return (
    <form className="relative my-5" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Type your message..."
        className="py-6"
        {...register("content")}
      />
      <Button
        type="submit"
        className="absolute top-1/2 right-0 -translate-y-1/2 mr-2"
        disabled={!contentWatch || contentWatch.trim() === ""}
      >
        Send
      </Button>
    </form>
  );
}
