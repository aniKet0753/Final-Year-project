"use client"

import React, { useState } from 'react';
import { Sun, Moon, Utensils, Activity, Droplets, Wind, Flame, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';

interface LifestyleRecommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  dosha: 'vata' | 'pitta' | 'kapha' | 'all';
  season: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  benefits: string[];
  instructions: string[];
  icon: React.ComponentType<any>;
}

export const LifestyleRecommendations: React.FC = () => {
  const [selectedDosha, setSelectedDosha] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const recommendations: LifestyleRecommendation[] = [
    {
      id: '1',
      category: 'Daily Routine',
      title: 'Dinacharya - Ayurvedic Daily Routine',
      description: 'A structured daily routine that aligns with natural rhythms for optimal health and well-being.',
      dosha: 'all',
      season: 'All Seasons',
      difficulty: 'easy',
      benefits: ['Improved energy', 'Better sleep', 'Enhanced digestion', 'Mental clarity'],
      instructions: [
        'Wake up before sunrise (5-6 AM)',
        'Drink warm water with lemon',
        'Practice meditation or pranayama',
        'Exercise or yoga practice',
        'Eat largest meal at midday',
        'Wind down activities after sunset',
        'Sleep by 10 PM'
      ],
      icon: Sun
    },
    {
      id: '2',
      category: 'Diet',
      title: 'Vata-Pacifying Diet',
      description: 'Warm, nourishing foods to balance Vata dosha and reduce anxiety, dryness, and irregularity.',
      dosha: 'vata',
      season: 'Fall/Winter',
      difficulty: 'easy',
      benefits: ['Reduced anxiety', 'Better digestion', 'Improved sleep', 'Increased stability'],
      instructions: [
        'Eat warm, cooked foods',
        'Include healthy fats like ghee and sesame oil',
        'Favor sweet, sour, and salty tastes',
        'Avoid cold, dry, and raw foods',
        'Eat at regular times',
        'Stay hydrated with warm beverages'
      ],
      icon: Utensils
    },
    {
      id: '3',
      category: 'Exercise',
      title: 'Pitta-Balancing Yoga',
      description: 'Cooling yoga practices to balance Pitta dosha and reduce heat, anger, and inflammation.',
      dosha: 'pitta',
      season: 'Summer',
      difficulty: 'moderate',
      benefits: ['Reduced inflammation', 'Better emotional balance', 'Improved flexibility', 'Mental calmness'],
      instructions: [
        'Practice during cooler parts of the day',
        'Focus on forward bends and twists',
        'Include moon salutations',
        'Avoid heated or intense practices',
        'End with long savasana',
        'Practice near water or in nature'
      ],
      icon: Activity
    },
    {
      id: '4',
      category: 'Breathing',
      title: 'Kapha-Energizing Pranayama',
      description: 'Energizing breathing techniques to balance Kapha dosha and reduce lethargy and congestion.',
      dosha: 'kapha',
      season: 'Spring',
      difficulty: 'moderate',
      benefits: ['Increased energy', 'Improved circulation', 'Reduced congestion', 'Mental alertness'],
      instructions: [
        'Practice Bhastrika (bellows breath)',
        'Try Kapalabhati (skull shining breath)',
        'Include Surya Bhedana (right nostril breathing)',
        'Practice in the morning',
        'Start slowly and build intensity',
        'Follow with meditation'
      ],
      icon: Wind
    },
    {
      id: '5',
      category: 'Sleep',
      title: 'Ayurvedic Sleep Hygiene',
      description: 'Natural practices to improve sleep quality and align with circadian rhythms.',
      dosha: 'all',
      season: 'All Seasons',
      difficulty: 'easy',
      benefits: ['Better sleep quality', 'Improved recovery', 'Enhanced immunity', 'Mental clarity'],
      instructions: [
        'Sleep and wake at consistent times',
        'Create a calming bedtime routine',
        'Avoid screens 1 hour before bed',
        'Keep bedroom cool and dark',
        'Practice gentle stretching or meditation',
        'Avoid heavy meals 3 hours before sleep'
      ],
      icon: Moon
    },
    {
      id: '6',
      category: 'Detox',
      title: 'Seasonal Cleansing',
      description: 'Gentle detoxification practices to reset the body and mind with changing seasons.',
      dosha: 'all',
      season: 'Spring/Fall',
      difficulty: 'advanced',
      benefits: ['Improved digestion', 'Increased energy', 'Mental clarity', 'Emotional balance'],
      instructions: [
        'Start with simple mono-diet (kitchari)',
        'Drink warm water throughout the day',
        'Practice gentle yoga and meditation',
        'Get adequate rest',
        'Avoid processed foods and stimulants',
        'Consider professional guidance'
      ],
      icon: Droplets
    }
  ];

  const categories = ['all', 'Daily Routine', 'Diet', 'Exercise', 'Breathing', 'Sleep', 'Detox'];
  const doshas = [
    { id: 'all', name: 'All Doshas', color: 'gray' },
    { id: 'vata', name: 'Vata', color: 'blue' },
    { id: 'pitta', name: 'Pitta', color: 'orange' },
    { id: 'kapha', name: 'Kapha', color: 'green' }
  ];

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesDosha = selectedDosha === 'all' || rec.dosha === selectedDosha || rec.dosha === 'all';
    const matchesCategory = selectedCategory === 'all' || rec.category === selectedCategory;
    return matchesDosha && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha) {
      case 'vata': return 'bg-blue-100 text-blue-800';
      case 'pitta': return 'bg-orange-100 text-orange-800';
      case 'kapha': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Lifestyle Recommendations</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Personalized lifestyle guidance based on Ayurvedic principles to enhance your daily well-being and maintain optimal health.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Dosha</label>
            <div className="flex flex-wrap gap-2">
              {doshas.map(dosha => (
                <button
                  key={dosha.id}
                  onClick={() => setSelectedDosha(dosha.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedDosha === dosha.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {dosha.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredRecommendations.map((recommendation, index) => {
          const Icon = recommendation.icon;
          return (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{recommendation.title}</h3>
                    <p className="text-sm text-emerald-600">{recommendation.category}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(recommendation.difficulty)}`}>
                    {recommendation.difficulty}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getDoshaColor(recommendation.dosha)}`}>
                    {recommendation.dosha === 'all' ? 'All Doshas' : recommendation.dosha}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{recommendation.description}</p>

              {/* Season */}
              <div className="mb-4">
                <span className="text-sm text-gray-600">Best for: </span>
                <span className="text-sm font-medium text-gray-900">{recommendation.season}</span>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.benefits.map(benefit => (
                    <span key={benefit} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">How to Practice:</h4>
                <ul className="space-y-1">
                  {recommendation.instructions.slice(0, 3).map((instruction, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {instruction}
                    </li>
                  ))}
                  {recommendation.instructions.length > 3 && (
                    <li className="text-sm text-gray-500 italic">
                      +{recommendation.instructions.length - 3} more steps...
                    </li>
                  )}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200">
                  View Full Guide
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mountain className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters to find lifestyle recommendations that match your needs.
          </p>
          <button
            onClick={() => {
              setSelectedDosha('all');
              setSelectedCategory('all');
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Daily Routine Visualization */}
      <div className="mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Ideal Ayurvedic Daily Routine
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="w-8 h-8 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Morning (6 AM - 10 AM)</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Wake up before sunrise</li>
              <li>Meditation & pranayama</li>
              <li>Exercise or yoga</li>
              <li>Light breakfast</li>
            </ul>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Midday (10 AM - 6 PM)</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Main meal at noon</li>
              <li>Active work period</li>
              <li>Light afternoon snack</li>
              <li>Gentle evening walk</li>
            </ul>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Moon className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Evening (6 PM - 10 PM)</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Light dinner</li>
              <li>Relaxing activities</li>
              <li>Gentle stretching</li>
              <li>Sleep by 10 PM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};