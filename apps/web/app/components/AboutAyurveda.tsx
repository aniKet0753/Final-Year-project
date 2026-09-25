"use client"

import React from 'react';
import { Leaf, Heart, Brain, Zap, Shield, Sun } from 'lucide-react';

export const AboutAyurveda: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          About Ayurveda
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the ancient science of life that has been healing humanity for over 5,000 years.
          Ayurveda offers a holistic approach to health and wellness through natural remedies and lifestyle practices.
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The Science of Life
            </h3>
            <p className="text-gray-700 mb-4">
              Ayurveda, derived from Sanskrit words "Ayu" (life) and "Veda" (knowledge), is one of the world's oldest healing systems. 
              It emphasizes prevention and treatment of illness through lifestyle practices and natural therapies.
            </p>
            <p className="text-gray-700">
              Unlike modern medicine that focuses on symptoms, Ayurveda addresses the root cause of illness by 
              balancing the mind, body, and spirit through personalized treatments based on individual constitution.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center">
              <Leaf className="w-16 h-16 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Three Doshas */}
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
          The Three Doshas
        </h3>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          According to Ayurveda, every individual has a unique constitution (Prakriti) determined by three fundamental 
          energies called Doshas. Understanding your dominant dosha helps in choosing the right treatments and lifestyle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vata */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Vata</h4>
            <p className="text-gray-600 mb-4">
              Governs movement, breathing, circulation, and nervous system. Associated with air and space elements.
            </p>
            <div className="text-left">
              <h5 className="font-semibold text-gray-900 mb-2">Characteristics:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Creative and energetic</li>
                <li>• Quick thinking</li>
                <li>• Tends to be thin</li>
                <li>• Sensitive to cold</li>
              </ul>
              <h5 className="font-semibold text-gray-900 mb-2 mt-4">When Imbalanced:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Anxiety and restlessness</li>
                <li>• Insomnia</li>
                <li>• Digestive issues</li>
                <li>• Joint pain</li>
              </ul>
            </div>
          </div>

          {/* Pitta */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Pitta</h4>
            <p className="text-gray-600 mb-4">
              Controls digestion, metabolism, and body temperature. Associated with fire and water elements.
            </p>
            <div className="text-left">
              <h5 className="font-semibold text-gray-900 mb-2">Characteristics:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Intelligent and focused</li>
                <li>• Strong digestion</li>
                <li>• Medium build</li>
                <li>• Warm body temperature</li>
              </ul>
              <h5 className="font-semibold text-gray-900 mb-2 mt-4">When Imbalanced:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Anger and irritability</li>
                <li>• Hyperacidity</li>
                <li>• Skin problems</li>
                <li>• Inflammatory conditions</li>
              </ul>
            </div>
          </div>

          {/* Kapha */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Kapha</h4>
            <p className="text-gray-600 mb-4">
              Provides structure, stability, and immunity. Associated with earth and water elements.
            </p>
            <div className="text-left">
              <h5 className="font-semibold text-gray-900 mb-2">Characteristics:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Calm and stable</li>
                <li>• Strong immunity</li>
                <li>• Heavier build</li>
                <li>• Cool and moist skin</li>
              </ul>
              <h5 className="font-semibold text-gray-900 mb-2 mt-4">When Imbalanced:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Weight gain</li>
                <li>• Sluggishness</li>
                <li>• Respiratory issues</li>
                <li>• Depression</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Key Principles */}
      <div className="mb-12">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Key Principles of Ayurveda
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-red-500 mr-3" />
              <h4 className="text-xl font-semibold text-gray-900">Holistic Approach</h4>
            </div>
            <p className="text-gray-600">
              Ayurveda treats the whole person - mind, body, and spirit - rather than just symptoms. 
              It recognizes the interconnectedness of all aspects of health.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-purple-500 mr-3" />
              <h4 className="text-xl font-semibold text-gray-900">Prevention First</h4>
            </div>
            <p className="text-gray-600">
              The primary focus is on maintaining health and preventing disease through proper diet, 
              lifestyle, and daily routines tailored to individual constitution.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Leaf className="w-6 h-6 text-green-500 mr-3" />
              <h4 className="text-xl font-semibold text-gray-900">Natural Remedies</h4>
            </div>
            <p className="text-gray-600">
              Uses herbs, minerals, and natural substances to restore balance. These remedies work 
              with the body's natural healing mechanisms without harmful side effects.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-yellow-500 mr-3" />
              <h4 className="text-xl font-semibold text-gray-900">Individual Treatment</h4>
            </div>
            <p className="text-gray-600">
              Every person is unique, and treatments are customized based on individual constitution, 
              current health status, and environmental factors.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-12">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Benefits of Ayurvedic Medicine
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">No Side Effects</h4>
            <p className="text-sm text-gray-600">Natural remedies work gently with your body</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Treats Root Cause</h4>
            <p className="text-sm text-gray-600">Addresses underlying imbalances, not just symptoms</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Personalized Care</h4>
            <p className="text-sm text-gray-600">Treatments tailored to your unique constitution</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sun className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Improves Immunity</h4>
            <p className="text-sm text-gray-600">Strengthens natural defense mechanisms</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-6 h-6 text-teal-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Sustainable Health</h4>
            <p className="text-sm text-gray-600">Promotes long-term wellness and vitality</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Mind-Body Balance</h4>
            <p className="text-sm text-gray-600">Harmonizes mental and physical well-being</p>
          </div>
        </div>
      </div>

      {/* Modern Relevance */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Ayurveda in Modern Times
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Scientific Validation</h4>
            <p className="text-gray-600 mb-4">
              Modern research is increasingly validating ancient Ayurvedic principles. Studies have shown the 
              effectiveness of various herbs and treatments in managing chronic conditions like diabetes, 
              arthritis, and cardiovascular diseases.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Integrative Medicine</h4>
            <p className="text-gray-600 mb-4">
              Many healthcare systems now incorporate Ayurvedic principles alongside conventional medicine, 
              offering patients a more comprehensive approach to healing and wellness.
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> While Ayurveda offers valuable insights into health and wellness, 
            always consult with qualified practitioners and inform your healthcare provider about any 
            Ayurvedic treatments you're considering.
          </p>
        </div>
      </div>
    </div>
  );
};