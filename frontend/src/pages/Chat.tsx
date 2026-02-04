import { useState, useRef, useEffect } from "react";
import { Bot, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { FadeIn } from "@/components/motion/FadeIn";
import { predictSymptoms } from "@/lib/api";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const WELCOME_MESSAGE = `Hello! I'm your SymptoCare health assistant. 👋

I can help you understand your symptoms and provide educational information about possible conditions and medicines.

⚠️ **Important**: I'm an AI for educational purposes only. My responses should not be used as medical advice. Always consult a healthcare professional for proper diagnosis and treatment.

How can I help you today? Feel free to describe any symptoms you're experiencing.`;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: WELCOME_MESSAGE,
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await predictSymptoms(content);
      
      let assistantContent = `Based on your symptoms, here's what I found:\n\n`;
      assistantContent += `🔍 **Possible Condition**: ${response.disease}\n\n`;
      
      if (response.medicines && response.medicines.length > 0) {
        assistantContent += `💊 **Suggested Medicines**:\n`;
        response.medicines.forEach((med) => {
          assistantContent += `• ${med}\n`;
        });
        assistantContent += `\n`;
      }
      
      assistantContent += `⚠️ **Remember**: ${response.disclaimer || "This is for educational purposes only. Please consult a healthcare professional for proper diagnosis and treatment."}`;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: assistantContent,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting to the server right now. Please make sure the backend is running at http://localhost:8000 and try again.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] flex-col">
        {/* Chat Header */}
        <FadeIn direction="down" duration={0.3}>
          <div className="border-b border-border bg-card px-4 py-4">
            <div className="container mx-auto flex items-center gap-3">
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                className="flex h-10 w-10 items-center justify-center rounded-full btn-gradient"
              >
                <Bot className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="font-display font-semibold text-foreground">SymptoCare Assistant</h1>
                <p className="text-xs text-muted-foreground">AI-powered health education</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Disclaimer Banner */}
        <FadeIn direction="down" duration={0.3} delay={0.1}>
          <div className="bg-warning/10 border-b border-warning/20 px-4 py-2">
            <div className="container mx-auto flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Educational only</strong> – Not a substitute for professional medical advice.
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-muted/30">
          <div className="container mx-auto max-w-3xl px-4 py-6">
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.isUser ? 20 : -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.3,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <ChatBubble
                      message={message.content}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing Indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full btn-gradient">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="rounded-2xl rounded-tl-md bg-card px-4 py-3 shadow-soft">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-2 w-2 rounded-full bg-primary/50"
                            animate={{
                              y: [0, -5, 0],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <FadeIn direction="up" duration={0.3}>
          <div className="bg-background border-t border-border">
            <div className="container mx-auto max-w-3xl">
              <ChatInput onSend={handleSend} isLoading={isLoading} />
            </div>
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
}
