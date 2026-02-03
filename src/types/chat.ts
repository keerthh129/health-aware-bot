export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  when_to_consult: string;
  keywords: string[];
  created_at: string;
  updated_at: string;
}
