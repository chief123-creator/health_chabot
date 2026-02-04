import { Link } from "react-router-dom";
import { Stethoscope, AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      {/* Disclaimer Banner */}
      <div className="bg-warning/10 border-b border-warning/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-start gap-3 text-sm">
            <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
            <p className="text-muted-foreground">
              <strong className="text-foreground">Medical Disclaimer:</strong> SymptoCare is for educational purposes only. 
              The information provided is not a substitute for professional medical advice, diagnosis, or treatment. 
              Always consult a qualified healthcare provider.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg btn-gradient">
                <Stethoscope className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>SymptoCare</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI-powered health education companion. Learn about symptoms and medicines with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/symptoms" className="text-muted-foreground hover:text-primary transition-colors">
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link to="/medicine" className="text-muted-foreground hover:text-primary transition-colors">
                  Medicine Search
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                  Chat Assistant
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About & Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Important Notice</h4>
            <p className="text-sm text-muted-foreground">
              This application uses machine learning for educational predictions. 
              Results should not be used for self-diagnosis or treatment decisions.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SymptoCare. Educational Project. Not for medical use.</p>
        </div>
      </div>
    </footer>
  );
}
