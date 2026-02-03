import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/chat";

const CHAT_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/health-chat`;

interface ChatResponse {
  response: string;
  timestamp: string;
  error?: string;
  fallbackResponse?: string;
}

export async function sendMessage(
  message: string,
  conversationHistory: Pick<Message, "role" | "content">[]
): Promise<string> {
  try {
    const response = await fetch(CHAT_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        message,
        conversationHistory: conversationHistory.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 429) {
        throw new Error("The service is currently busy. Please wait a moment and try again.");
      }
      if (response.status === 402) {
        throw new Error("Service temporarily unavailable. Please try again later.");
      }
      
      throw new Error(errorData.error || "Failed to get response from health assistant");
    }

    const data: ChatResponse = await response.json();
    
    if (data.error) {
      return data.fallbackResponse || "I apologize, but I couldn't process your request. Please try again.";
    }

    return data.response;
  } catch (error) {
    console.error("Chat service error:", error);
    throw error;
  }
}
