import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export function ChatBubble({ message, isUser, timestamp }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105",
          isUser ? "bg-primary" : "btn-gradient"
        )}
      >
        {isUser ? (
          <User className="h-5 w-5 text-primary-foreground" />
        ) : (
          <Bot className="h-5 w-5 text-primary-foreground" />
        )}
      </div>

      {/* Message */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-soft transition-shadow hover:shadow-card",
          isUser
            ? "rounded-tr-md bg-primary text-primary-foreground"
            : "rounded-tl-md bg-card text-card-foreground"
        )}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message}</p>
        {timestamp && (
          <p
            className={cn(
              "mt-1 text-xs transition-opacity",
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>
    </div>
  );
}
