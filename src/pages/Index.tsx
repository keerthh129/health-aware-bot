import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Shield,
  Heart,
  Activity,
  Stethoscope,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Natural Conversations",
    description:
      "Ask questions in plain English about diseases, symptoms, and prevention methods.",
  },
  {
    icon: Shield,
    title: "Evidence-Based Information",
    description:
      "Get reliable awareness content sourced from established medical knowledge.",
  },
  {
    icon: Activity,
    title: "Multiple Conditions",
    description:
      "Learn about dengue, malaria, diabetes, hypertension, COVID-19, and tuberculosis.",
  },
  {
    icon: Stethoscope,
    title: "Know When to Seek Help",
    description:
      "Understand warning signs that indicate you should consult a healthcare professional.",
  },
];

const diseases = [
  "Dengue",
  "Malaria",
  "Diabetes",
  "Hypertension",
  "COVID-19",
  "Tuberculosis",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Heart className="h-4 w-4" />
              AI-Powered Health Awareness
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Trusted Guide to{" "}
              <span className="text-gradient-primary">Disease Awareness</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant, reliable information about common diseases, their
              symptoms, prevention methods, and when to seek medical help. No
              medical jargon, just clear answers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/chat">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <MessageCircle className="h-5 w-5" />
                  Start Chatting
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Free to use
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-success" />
                No login required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-success" />
                Private & secure
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="border-y bg-warning/10 py-4">
        <div className="container">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
            <p className="text-sm">
              <strong>Important:</strong> This chatbot is for disease awareness
              only and does not provide medical diagnosis or treatment. Please
              consult a qualified doctor for medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How HealthAware AI Helps You
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered chatbot makes health education accessible to
              everyone with instant, accurate information.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="group hover:shadow-card-hover transition-shadow"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diseases Coverage */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Diseases We Cover
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get comprehensive awareness information about these common health
              conditions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {diseases.map((disease) => (
              <div
                key={disease}
                className="px-6 py-3 rounded-full bg-card border shadow-sm font-medium hover:border-primary hover:shadow-md transition-all"
              >
                {disease}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/chat">
              <Button size="lg" className="gap-2">
                <MessageCircle className="h-5 w-5" />
                Ask About Any Condition
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Learn About Your Health?
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Start a conversation with HealthAware AI and get instant answers
                to your health awareness questions. It's free, private, and
                available 24/7.
              </p>
              <Link to="/chat">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Start Chatting Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
