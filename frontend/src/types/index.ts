// src/types/index.ts
export interface Medicine {
  name: string;
  uses: string;
  dosage: string;
  sideEffects: string;
  warnings: string;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export interface ApiResponse {
  name?: string;
  uses?: string;
  dosage?: string;
  sideEffects?: string;
  warnings?: string;
  error?: string;
  suggestions?: string;
  advice?: string;
  disclaimer?: string;
}
