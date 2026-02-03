import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span className="font-semibold">HealthAware AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered disease awareness chatbot helping you understand health
              conditions and make informed decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                to="/chat"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Chat with AI
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/disclaimer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Medical Disclaimer
              </Link>
            </nav>
          </div>

          {/* Disclaimer Notice */}
          <div className="space-y-4">
            <h4 className="font-medium">Important Notice</h4>
            <p className="text-sm text-muted-foreground">
              This chatbot provides disease awareness information only and does
              not replace professional medical advice. Always consult a
              qualified healthcare provider.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} HealthAware AI. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive" /> for public
            health
          </p>
        </div>
      </div>
    </footer>
  );
}
