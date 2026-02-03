import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { SuggestedQuestions } from "@/components/chat/SuggestedQuestions";
import { DisclaimerBanner } from "@/components/chat/DisclaimerBanner";
import { sendMessage } from "@/services/chatService";
import { Message } from "@/types/chat";
import { useToast } from "@/hooks/use-toast";
import { Bot } from "lucide-react";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: `👋 Hello! I'm **HealthAware AI**, your public health awareness assistant.

I can help you learn about common diseases including:
- **Dengue & Malaria** (mosquito-borne diseases)
- **Diabetes & Hypertension** (chronic conditions)
- **COVID-19 & Tuberculosis** (respiratory infections)

Feel free to ask about symptoms, causes, prevention methods, or when you should see a doctor.

*Remember: I provide awareness information only, not medical diagnosis or treatment advice.*`,
  timestamp: new Date(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare conversation history (exclude welcome message)
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await sendMessage(content, history);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to get response. Please try again.",
        variant: "destructive",
      });

      // Add error response from bot
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "I apologize, but I'm having trouble responding right now. Please try again in a moment. If you have urgent health concerns, please consult a healthcare professional.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuggestions = messages.length <= 1;

  return (
    <Layout showFooter={false}>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Chat Header */}
        <div className="border-b bg-card px-4 py-3">
          <div className="container flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-semibold">HealthAware AI</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
                Online • Disease Awareness Assistant
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin bg-gradient-hero">
          <div className="container py-4 space-y-4">
            {/* Disclaimer at top */}
            <DisclaimerBanner />

            {/* Messages */}
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {/* Typing indicator */}
            {isLoading && <TypingIndicator />}

            {/* Suggested questions for new conversations */}
            {showSuggestions && !isLoading && (
              <div className="pt-4">
                <SuggestedQuestions
                  onSelect={handleSendMessage}
                  disabled={isLoading}
                />
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t bg-card p-4">
          <div className="container">
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
            <p className="text-xs text-center text-muted-foreground mt-2">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
