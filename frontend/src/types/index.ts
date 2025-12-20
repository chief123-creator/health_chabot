
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

// it was for medical showing 
export interface Medicine {
  name: string;
  priceRupee?: number | null;
  manufacturerName?: string | null;
  type?: string | null;
  packSize?: string | null;
  substitutes: string[];
  sideEffects?: string | null;
  chemicalClass?: string | null;
  therapeuticClass?: string | null;
  imageUrl?: string | null;
  composition?: string | null;
  uses?: string | null;
}

export interface ApiResponse extends Partial<Medicine> {
  error?: string;
}
