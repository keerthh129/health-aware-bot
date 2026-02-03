import { format } from "date-fns";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";
  const formattedTime = format(message.timestamp, "h:mm a");

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-chat",
          isUser
            ? "bg-chat-user text-chat-user-foreground rounded-tr-md"
            : "bg-chat-bot text-chat-bot-foreground rounded-tl-md"
        )}
      >
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {isUser ? (
            <p className="m-0 text-sm leading-relaxed">{message.content}</p>
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="m-0 mb-2 last:mb-0 text-sm leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-sm">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold mt-3 mb-1">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-sm font-medium mt-2 mb-1">{children}</h4>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <p
          className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-right" : "text-left"
          )}
        >
          {formattedTime}
        </p>
      </div>
    </div>
  );
}
