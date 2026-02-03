import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  MessageCircle,
  XCircle,
  CheckCircle,
  Phone,
  ArrowRight,
} from "lucide-react";

const whatWeDoNot = [
  "Provide medical diagnosis or assessment",
  "Recommend specific medications or dosages",
  "Suggest treatment plans or therapies",
  "Replace professional medical consultations",
  "Provide emergency medical assistance",
  "Interpret medical test results",
];

const whatWeDo = [
  "Provide general disease awareness information",
  "Explain common symptoms of various conditions",
  "Share prevention methods and healthy practices",
  "Indicate when you should seek medical attention",
  "Offer educational content about public health",
  "Answer questions about disease causes and risk factors",
];

export default function DisclaimerPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20 text-warning-foreground text-sm font-medium">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Important Information
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Medical Disclaimer
            </h1>
            <p className="text-lg text-muted-foreground">
              Please read this disclaimer carefully before using HealthAware AI.
              Understanding these limitations is essential for your safety.
            </p>
          </div>
        </div>
      </section>

      {/* Main Disclaimer */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <Card className="border-warning/50 mb-8">
            <CardHeader className="bg-warning/10">
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-warning" />
                Official Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="font-medium text-lg">
                HealthAware AI is designed for disease awareness and educational
                purposes only.
              </p>
              <p className="text-muted-foreground">
                This chatbot does not provide medical diagnosis, treatment
                recommendations, or professional medical advice. The information
                provided should not be used as a substitute for professional
                medical consultation, diagnosis, or treatment.
              </p>
              <p className="text-muted-foreground">
                Always seek the advice of a qualified healthcare provider with
                any questions you may have regarding a medical condition. Never
                disregard professional medical advice or delay in seeking it
                because of something you have read or learned from this chatbot.
              </p>
              <p className="text-muted-foreground">
                If you think you may have a medical emergency, call your doctor,
                go to the emergency department, or call emergency services
                immediately.
              </p>
            </CardContent>
          </Card>

          {/* What We Do / Don't Do */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  What We Do NOT Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {whatWeDoNot.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-success/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  What We DO Provide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {whatWeDo.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Notice */}
          <Card className="bg-destructive/10 border-destructive/30 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Phone className="h-8 w-8 text-destructive flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    In Case of Emergency
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    If you are experiencing a medical emergency, do not use this
                    chatbot. Instead, please:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Call your local emergency services immediately</li>
                    <li>• Go to the nearest hospital emergency room</li>
                    <li>• Contact your healthcare provider's emergency line</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agreement */}
          <div className="text-center p-6 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-4">
              By using HealthAware AI, you acknowledge that you have read and
              understood this disclaimer, and you agree to use this service for
              educational and awareness purposes only.
            </p>
            <Link to="/chat">
              <Button className="gap-2">
                <MessageCircle className="h-4 w-4" />
                I Understand, Continue to Chat
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
