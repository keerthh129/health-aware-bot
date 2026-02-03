import { Button } from "@/components/ui/button";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

const suggestions = [
  "What are the symptoms of dengue?",
  "How can I prevent diabetes?",
  "When should I see a doctor for fever?",
  "What causes malaria?",
  "How to protect myself from COVID-19?",
  "What are the signs of tuberculosis?",
];

export function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground text-center">
        Try asking about:
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((question) => (
          <Button
            key={question}
            variant="outline"
            size="sm"
            onClick={() => onSelect(question)}
            disabled={disabled}
            className="text-xs h-auto py-2 px-3 whitespace-normal text-left"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}
