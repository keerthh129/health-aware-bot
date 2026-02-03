import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DisclaimerBanner() {
  return (
    <Alert variant="default" className="border-warning/50 bg-warning/10">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertDescription className="text-sm text-muted-foreground">
        <strong className="text-foreground">Medical Disclaimer:</strong> This chatbot
        provides disease awareness information only and does not offer medical
        diagnosis, treatment recommendations, or medication advice. Always consult
        a qualified healthcare professional for medical concerns.
      </AlertDescription>
    </Alert>
  );
}
