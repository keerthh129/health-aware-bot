import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in-up">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
        <Bot className="h-4 w-4" />
      </div>

      {/* Typing bubble */}
      <div className="bg-chat-bot rounded-2xl rounded-tl-md px-4 py-3 shadow-chat">
        <div className="flex items-center gap-1">
          <div className="typing-dot w-2 h-2 rounded-full bg-muted-foreground/60" />
          <div className="typing-dot w-2 h-2 rounded-full bg-muted-foreground/60" />
          <div className="typing-dot w-2 h-2 rounded-full bg-muted-foreground/60" />
        </div>
      </div>
    </div>
  );
}
