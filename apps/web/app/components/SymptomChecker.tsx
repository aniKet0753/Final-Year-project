"use client"

import React, { useState } from 'react';
import { Search, Plus, X, Sparkles, AlertCircle } from 'lucide-react';
// import { RecommendationEngine } from '../utils/recommendation';
import { RecommendationResult } from '../types';
import { MedicineCard } from './MedicineCard';

export const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Mild');

  // const filteredSymptoms = symptoms.filter(symptom =>
  //   symptom.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //   !selectedSymptoms.includes(symptom)
  // );

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setSearchTerm('');
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    // setTimeout(() => {
    //   const results = RecommendationEngine.analyzeSymptoms(selectedSymptoms, { 
    //     symptoms: selectedSymptoms,
    //     severity,
    //     prakriti: ['Vata', 'Pitta', 'Kapha'],
    //     age: 30
    //   });
    //   setRecommendations(results);
    //   setIsAnalyzing(false);
    // }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          AI-Powered Ayurvedic Symptom Analysis
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Describe your symptoms and receive personalized Ayurvedic medicine recommendations based on ancient wisdom and modern analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Symptom Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-emerald-600" />
            Select Your Symptoms
          </h3>

          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search symptoms..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>

          {/* Symptom Suggestions
          {searchTerm && (
            <div className="mb-4 max-h-40 overflow-y-auto bg-gray-50 rounded-lg p-2">
              {filteredSymptoms.slice(0, 8).map(symptom => (
                <button
                  key={symptom}
                  onClick={() => addSymptom(symptom)}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 rounded transition-colors"
                >
                  {symptom}
                </button>
              ))}
            </div>
          )} */}

          {/* Selected Symptoms */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Symptoms:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(symptom => (
                <span
                  key={symptom}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800"
                >
                  {symptom}
                  <button
                    onClick={() => removeSymptom(symptom)}
                    className="ml-2 hover:text-emerald-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Severity Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Symptom Severity:</h4>
            <div className="flex space-x-4">
              {(['Mild', 'Moderate', 'Severe'] as const).map(level => (
                <label key={level} className="flex items-center">
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    checked={severity === level}
                    onChange={(e) => setSeverity(e.target.value as typeof level)}
                    className="mr-2 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzeSymptoms}
            disabled={selectedSymptoms.length === 0 || isAnalyzing}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get Recommendations
              </>
            )}
          </button>
        </div>

        {/* Analysis Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Analysis Results
          </h3>

          {recommendations.length === 0 && !isAnalyzing && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Select symptoms and click "Get Recommendations" to see personalized medicine suggestions.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your symptoms...</p>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recommendations.slice(0, 3).map((result, index) => (
                <div key={result.medicine.id} className="relative">
                  <div className={`absolute -left-2 -top-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    result.confidence === 'High' ? 'bg-green-500' :
                    result.confidence === 'Medium' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 ml-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{result.medicine.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        result.confidence === 'High' ? 'bg-green-100 text-green-800' :
                        result.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {result.confidence} Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{result.medicine.description}</p>
                    <div className="text-xs text-gray-500">
                      Matched symptoms: {result.matchedSymptoms.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detailed Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Detailed Medicine Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 6).map(result => (
              <MedicineCard
                key={result.medicine.id}
                medicine={result.medicine}
                matchScore={result.matchScore}
                confidence={result.confidence}
              />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Important Medical Disclaimer</p>
            <p>
              These recommendations are for educational purposes only and should not replace professional medical advice. 
              Always consult with a qualified Ayurvedic practitioner or healthcare provider before starting any treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};