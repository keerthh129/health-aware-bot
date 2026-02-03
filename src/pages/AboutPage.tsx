import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Brain,
  Database,
  Shield,
  UserCheck,
  ArrowRight,
  Sparkles,
  Server,
  Lock,
} from "lucide-react";

const howItWorks = [
  {
    step: 1,
    icon: MessageCircle,
    title: "Ask Your Question",
    description:
      "Type your health-related question in natural language. No need for medical terms—just ask like you would ask a friend.",
  },
  {
    step: 2,
    icon: Brain,
    title: "AI Processes Your Query",
    description:
      "Our advanced AI understands your question and matches it with our comprehensive disease knowledge base.",
  },
  {
    step: 3,
    icon: Database,
    title: "Access Knowledge Base",
    description:
      "The system retrieves accurate, up-to-date information about symptoms, causes, prevention, and warning signs.",
  },
  {
    step: 4,
    icon: UserCheck,
    title: "Receive Clear Response",
    description:
      "You get a friendly, easy-to-understand response with relevant health awareness information.",
  },
];

const techFeatures = [
  {
    icon: Sparkles,
    title: "Advanced AI",
    description:
      "Powered by state-of-the-art language models that understand context and provide relevant responses.",
  },
  {
    icon: Server,
    title: "Robust Backend",
    description:
      "Built on reliable cloud infrastructure ensuring fast responses and high availability.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "No personal data is stored. Your conversations are processed securely and not retained.",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              About{" "}
              <span className="text-gradient-primary">HealthAware AI</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn how our AI-powered chatbot helps people understand diseases,
              recognize symptoms, and make informed decisions about their health.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                HealthAware AI was created to bridge the gap in public health
                education. We believe everyone deserves access to reliable health
                information in a format they can understand.
              </p>
              <p className="text-muted-foreground">
                By leveraging artificial intelligence, we make it easy for anyone
                to learn about common diseases, understand warning signs, and know
                when to seek professional medical care.
              </p>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                <p className="text-sm">
                  <strong>Our commitment:</strong> We provide awareness
                  information only and always encourage users to consult
                  healthcare professionals for medical advice.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">6+ Diseases</h3>
                <p className="text-muted-foreground mb-6">
                  Comprehensive information on common health conditions
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">24/7</p>
                    <p className="text-sm text-muted-foreground">Available</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">Free</p>
                    <p className="text-sm text-muted-foreground">To Use</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding your health has never been easier. Here's how
              HealthAware AI processes your questions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="relative">
                  <CardHeader>
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              HealthAware AI combines cutting-edge AI with a curated medical
              knowledge base to deliver accurate, helpful responses.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {techFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Try HealthAware AI now and get instant answers to your health
            awareness questions.
          </p>
          <Link to="/chat">
            <Button size="lg" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              Start a Conversation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
