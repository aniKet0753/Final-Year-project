"use client"

import React, { useState } from 'react';
import { Leaf, Info, Shield, Clock, Star } from 'lucide-react';
import { Medicine } from '../types';

interface MedicineCardProps {
  medicine: Medicine;
  matchScore?: number;
  confidence?: 'High' | 'Medium' | 'Low';
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ 
  medicine, 
  matchScore, 
  confidence 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getConfidenceColor = (conf?: string) => {
    switch (conf) {
      case 'High': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{medicine.name}</h3>
              <p className="text-sm text-gray-600">{medicine.sanskritName}</p>
            </div>
          </div>
          {confidence && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getConfidenceColor(confidence)}`}>
              {confidence}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
            {medicine.type}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(medicine.severity)}`}>
            {medicine.severity}
          </span>
          {matchScore && (
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-gray-600">{matchScore}% match</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{medicine.description}</p>
        
        <div className="space-y-2 mb-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Primary Uses
            </h4>
            <div className="flex flex-wrap gap-1">
              {medicine.indications.slice(0, 3).map(indication => (
                <span
                  key={indication}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                >
                  {indication}
                </span>
              ))}
              {medicine.indications.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                  +{medicine.indications.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Main Ingredients
            </h4>
            <p className="text-sm text-gray-600 line-clamp-1">
              {medicine.mainIngredients.join(', ')}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{medicine.category}</span>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>{showDetails ? 'Hide' : 'Details'}</span>
          </button>
        </div>
      </div>

      {/* Detailed Information */}
      {showDetails && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-4 space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-1 text-emerald-600" />
                Dosage & Usage
              </h4>
              <p className="text-sm text-gray-700 bg-white p-2 rounded border">
                {medicine.dosage}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {medicine.benefits.map(benefit => (
                  <li key={benefit} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {medicine.precautions.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-2 text-amber-700">
                  Precautions
                </h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  {medicine.precautions.map(precaution => (
                    <li key={precaution} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {precaution}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Body Systems</h4>
              <div className="flex flex-wrap gap-1">
                {medicine.bodySystem.map(system => (
                  <span
                    key={system}
                    className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Suitable for Prakriti</h4>
              <div className="flex flex-wrap gap-1">
                {medicine.prakriti.map(dosha => (
                  <span
                    key={dosha}
                    className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded"
                  >
                    {dosha}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};