export interface Medicine {
  id: string;
  name: string;
  sanskritName: string;
  category: string;
  type: 'Churna' | 'Vati' | 'Ras' | 'Ghrita' | 'Taila' | 'Kwath' | 'Lehya' | 'Bhasma';
  mainIngredients: string[];
  indications: string[];
  symptoms: string[];
  bodySystem: string[];
  prakriti: ('Vata' | 'Pitta' | 'Kapha')[];
  dosage: string;
  precautions: string[];
  benefits: string[];
  severity: 'Mild' | 'Moderate' | 'Severe';
  description: string;
}

export interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  bodySystem: string;
}

export interface RecommendationResult {
  medicine: Medicine;
  matchScore: number;
  matchedSymptoms: string[];
  confidence: 'High' | 'Medium' | 'Low';
}

export interface UserProfile {
  prakriti: ('Vata' | 'Pitta' | 'Kapha')[];
  age: number;
  symptoms: string[];
  severity: 'Mild' | 'Moderate' | 'Severe';
}