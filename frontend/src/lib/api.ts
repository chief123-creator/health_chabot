const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface PredictRequest {
  symptoms: string;
}

export interface PredictResponse {
  disease: string;
  medicines: string[];
  disclaimer: string;
}

export interface MedicineDetails {
  name: string;
  description?: string;
  usage?: string;
  sideEffects?: string[];
  manufacturer?: string;
}

export interface SearchMedicineResponse {
  medicine: MedicineDetails;
  ocrResult?: string;
}

export async function predictSymptoms(symptoms: string): Promise<PredictResponse> {
  const response = await fetch(`${BASE_URL}/search-medicine`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symptoms }),
  });

  if (!response.ok) {
    throw new Error("Failed to predict symptoms");
  }

  return response.json();
}

export async function searchMedicineByName(name: string): Promise<SearchMedicineResponse> {
  const formData = new FormData();
  formData.append("name", name);

  const response = await fetch(`${BASE_URL}/api/search-medicine`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to search medicine");
  }

 const data = await response.json();
}

export async function searchMedicineByImage(image: File): Promise<SearchMedicineResponse> {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(`${BASE_URL}/api/search-medicine`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to search medicine by image");
  }

  return response.json();
}
