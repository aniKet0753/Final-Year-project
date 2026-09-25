// import { Medicine, RecommendationResult, UserProfile } from '../types';
// // import { medicines } from '../data/medicines';

// export class RecommendationEngine {
//   static analyzeSymptoms(userSymptoms: string[], userProfile?: UserProfile): RecommendationResult[] {
//     const recommendations: RecommendationResult[] = [];

//     // medicines.forEach(medicine => {
//     //   const matchScore = this.calculateMatchScore(medicine, userSymptoms, userProfile);
      
//     //   if (matchScore > 0) {
//     //     const matchedSymptoms = this.getMatchedSymptoms(medicine, userSymptoms);
//     //     const confidence = this.calculateConfidence(matchScore, matchedSymptoms.length);
        
//     //     recommendations.push({
//     //       medicine,
//     //       matchScore,
//     //       matchedSymptoms,
//     //       confidence
//     //     });
//     //   }
//     // });

//     return recommendations
//       .sort((a, b) => b.matchScore - a.matchScore)
//       .slice(0, 10); // Return top 10 recommendations
//   }

//   private static calculateMatchScore(
//     medicine: Medicine, 
//     userSymptoms: string[], 
//     userProfile?: UserProfile
//   ): number {
//     let score = 0;
    
//     // Direct symptom matching (highest weight)
//     userSymptoms.forEach(symptom => {
//       if (medicine.symptoms.some(ms => ms.toLowerCase().includes(symptom.toLowerCase()))) {
//         score += 10;
//       }
//     });

//     // Indication matching (medium weight)
//     userSymptoms.forEach(symptom => {
//       if (medicine.indications.some(indication => 
//         indication.toLowerCase().includes(symptom.toLowerCase()) ||
//         symptom.toLowerCase().includes(indication.toLowerCase())
//       )) {
//         score += 7;
//       }
//     });

//     // Prakriti compatibility (low weight)
//     if (userProfile?.prakriti) {
//       const compatiblePrakriti = medicine.prakriti.some(p => 
//         userProfile.prakriti.includes(p)
//       );
//       if (compatiblePrakriti) {
//         score += 3;
//       }
//     }

//     // Severity matching
//     if (userProfile?.severity) {
//       if (medicine.severity === userProfile.severity) {
//         score += 5;
//       } else if (
//         (medicine.severity === 'Moderate' && userProfile.severity !== 'Severe') ||
//         (medicine.severity === 'Mild' && userProfile.severity === 'Mild')
//       ) {
//         score += 2;
//       }
//     }

//     return score;
//   }

//   private static getMatchedSymptoms(medicine: Medicine, userSymptoms: string[]): string[] {
//     const matched: string[] = [];
    
//     userSymptoms.forEach(symptom => {
//       if (medicine.symptoms.some(ms => ms.toLowerCase().includes(symptom.toLowerCase()))) {
//         matched.push(symptom);
//       }
//     });

//     return matched;
//   }

//   private static calculateConfidence(matchScore: number, matchedSymptomsCount: number): 'High' | 'Medium' | 'Low' {
//     if (matchScore >= 20 && matchedSymptomsCount >= 3) return 'High';
//     if (matchScore >= 10 && matchedSymptomsCount >= 2) return 'Medium';
//     return 'Low';
//   }

//   static searchMedicines(query: string): Medicine[] {
//     const lowerQuery = query.toLowerCase();
    
//     return medicines.filter(medicine => 
//       medicine.name.toLowerCase().includes(lowerQuery) ||
//       medicine.sanskritName.includes(query) ||
//       medicine.category.toLowerCase().includes(lowerQuery) ||
//       medicine.mainIngredients.some(ingredient => 
//         ingredient.toLowerCase().includes(lowerQuery)
//       ) ||
//       medicine.indications.some(indication => 
//         indication.toLowerCase().includes(lowerQuery)
//       )
//     );
//   }

//   static filterMedicines(filters: {
//     category?: string;
//     type?: string;
//     bodySystem?: string;
//     severity?: string;
//   }): Medicine[] {
//     return medicines.filter(medicine => {
//       if (filters.category && medicine.category !== filters.category) return false;
//       if (filters.type && medicine.type !== filters.type) return false;
//       if (filters.bodySystem && !medicine.bodySystem.includes(filters.bodySystem)) return false;
//       if (filters.severity && medicine.severity !== filters.severity) return false;
//       return true;
//     });
//   }
// }