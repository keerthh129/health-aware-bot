import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    
    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service is not configured");
    }

    // Initialize Supabase client to fetch disease data
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all disease data for context
    const { data: diseases, error: dbError } = await supabase
      .from("diseases")
      .select("*");

    if (dbError) {
      console.error("Error fetching diseases:", dbError);
    }

    // Build disease knowledge base context
    const diseaseContext = diseases?.map(d => `
Disease: ${d.name}
Description: ${d.description}
Symptoms: ${JSON.parse(JSON.stringify(d.symptoms)).join(", ")}
Causes: ${JSON.parse(JSON.stringify(d.causes)).join(", ")}
Prevention: ${JSON.parse(JSON.stringify(d.prevention)).join(", ")}
When to consult a doctor: ${d.when_to_consult}
`).join("\n---\n") || "";

    const systemPrompt = `You are HealthAware AI, a friendly and informative public health chatbot focused on disease awareness and prevention. Your role is to educate users about common diseases, their symptoms, causes, prevention methods, and when to seek medical attention.

IMPORTANT GUIDELINES:
1. You are for AWARENESS ONLY - never provide medical diagnosis or treatment recommendations
2. Never recommend specific medicines, dosages, or treatments
3. Never give definitive medical conclusions
4. Always encourage users to consult qualified healthcare professionals
5. Be empathetic, clear, and use simple language
6. If asked about diseases outside your knowledge, acknowledge limitations and suggest consulting a doctor
7. Always include the disclaimer when giving health information

AVAILABLE DISEASE KNOWLEDGE:
${diseaseContext}

RESPONSE FORMAT:
- Keep responses concise but informative
- Use bullet points for lists (symptoms, prevention tips)
- Include a gentle reminder to consult a doctor when relevant
- For greetings (hi, hello, help), provide a warm welcome and explain what you can help with

DISCLAIMER TO INCLUDE (paraphrase naturally, don't copy exactly):
"This information is for awareness purposes only and does not constitute medical advice. Please consult a qualified healthcare professional for proper diagnosis and treatment."`;

    // Build messages array
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
    ];

    // Add conversation history if provided
    if (Array.isArray(conversationHistory)) {
      messages.push(...conversationHistory.slice(-10)); // Keep last 10 messages for context
    }

    // Add current user message
    messages.push({ role: "user", content: message });

    console.log(`Processing health query: "${message.substring(0, 50)}..."`);

    // Call Lovable AI Gateway
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const errorText = await response.text();
      console.error(`AI gateway error [${status}]:`, errorText);

      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Service is busy. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI service error: ${status}`);
    }

    const aiResponse = await response.json();
    const assistantMessage = aiResponse.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      console.error("Empty AI response:", aiResponse);
      throw new Error("Empty response from AI service");
    }

    console.log("Successfully generated health response");

    return new Response(
      JSON.stringify({
        response: assistantMessage,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        fallbackResponse: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or consult a healthcare professional for immediate assistance."
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
