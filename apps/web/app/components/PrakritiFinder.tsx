"use client"

import React, { useState } from 'react';
import { User, CheckCircle, Brain, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
    score: number;
  }[];
}

const prakritQuestions: Question[] = [
  {
    id: '1',
    question: 'What is your body build?',
    options: [
      { text: 'Thin, light frame, prominent joints', dosha: 'vata', score: 3 },
      { text: 'Medium build, well-proportioned', dosha: 'pitta', score: 3 },
      { text: 'Large frame, heavy build, broad shoulders', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '2',
    question: 'How is your skin?',
    options: [
      { text: 'Dry, rough, cool to touch', dosha: 'vata', score: 3 },
      { text: 'Warm, oily, prone to rashes', dosha: 'pitta', score: 3 },
      { text: 'Thick, moist, cool, smooth', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '3',
    question: 'What is your hair like?',
    options: [
      { text: 'Dry, brittle, curly', dosha: 'vata', score: 3 },
      { text: 'Fine, oily, early graying/balding', dosha: 'pitta', score: 3 },
      { text: 'Thick, lustrous, wavy', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '4',
    question: 'How is your appetite?',
    options: [
      { text: 'Variable, sometimes forget to eat', dosha: 'vata', score: 3 },
      { text: 'Strong, get irritable when hungry', dosha: 'pitta', score: 3 },
      { text: 'Steady, can skip meals easily', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '5',
    question: 'How do you handle stress?',
    options: [
      { text: 'Become anxious and worried', dosha: 'vata', score: 3 },
      { text: 'Become irritable and angry', dosha: 'pitta', score: 3 },
      { text: 'Remain calm and steady', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '6',
    question: 'What is your sleep pattern?',
    options: [
      { text: 'Light sleeper, wake up easily', dosha: 'vata', score: 3 },
      { text: 'Moderate sleep, wake up refreshed', dosha: 'pitta', score: 3 },
      { text: 'Deep sleeper, hard to wake up', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '7',
    question: 'How is your energy level?',
    options: [
      { text: 'Comes in bursts, then fatigue', dosha: 'vata', score: 3 },
      { text: 'Moderate, steady energy', dosha: 'pitta', score: 3 },
      { text: 'Steady, good endurance', dosha: 'kapha', score: 3 }
    ]
  },
  {
    id: '8',
    question: 'How do you learn?',
    options: [
      { text: 'Quick to learn, quick to forget', dosha: 'vata', score: 3 },
      { text: 'Sharp intellect, good retention', dosha: 'pitta', score: 3 },
      { text: 'Slow to learn, excellent retention', dosha: 'kapha', score: 3 }
    ]
  }
];

export const PrakritiFinder: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });

  const handleAnswer = (questionId: string, option: any) => {
    const newAnswers = { ...answers, [questionId]: option };
    setAnswers(newAnswers);

    if (currentQuestion < prakritQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (allAnswers: Record<string, any>) => {
    const newScores = { vata: 0, pitta: 0, kapha: 0 };
    
    // Object.values(allAnswers).forEach((answer: any) => {
    //   newScores[answer.dosha] += answer.score;
    // });

    setScores(newScores);
    setShowResults(true);
  };

  const getDominantDosha = () => {
    const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha);
    if (scores.vata === maxScore) return 'vata';
    if (scores.pitta === maxScore) return 'pitta';
    return 'kapha';
  };

  const getDoshaInfo = (dosha: string) => {
    const info = {
      vata: {
        name: 'Vata',
        element: 'Air & Space',
        characteristics: ['Creative', 'Energetic', 'Quick thinking', 'Adaptable'],
        recommendations: ['Warm, cooked foods', 'Regular routine', 'Oil massage', 'Meditation'],
        color: 'blue',
        icon: Zap
      },
      pitta: {
        name: 'Pitta',
        element: 'Fire & Water',
        characteristics: ['Intelligent', 'Focused', 'Ambitious', 'Leader'],
        recommendations: ['Cool, fresh foods', 'Avoid spicy food', 'Swimming', 'Cooling pranayama'],
        color: 'orange',
        icon: Heart
      },
      kapha: {
        name: 'Kapha',
        element: 'Earth & Water',
        characteristics: ['Calm', 'Stable', 'Compassionate', 'Patient'],
        recommendations: ['Light, warm foods', 'Regular exercise', 'Dry massage', 'Stimulating activities'],
        color: 'green',
        icon: User
      }
    };
    return info[dosha as keyof typeof info];
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScores({ vata: 0, pitta: 0, kapha: 0 });
  };

  if (showResults) {
    const dominantDosha = getDominantDosha();
    const doshaInfo = getDoshaInfo(dominantDosha);
    const Icon = doshaInfo.icon;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Prakriti Results</h2>
          <p className="text-lg text-gray-600">Discover your unique Ayurvedic constitution</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dominant Dosha */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="text-center mb-6">
              <div className={`w-20 h-20 bg-${doshaInfo.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-10 h-10 text-${doshaInfo.color}-600`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Your Dominant Dosha: {doshaInfo.name}
              </h3>
              <p className="text-gray-600">{doshaInfo.element}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Characteristics:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {doshaInfo.characteristics.map(char => (
                    <div key={char} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{char}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Recommendations:</h4>
                <ul className="space-y-1">
                  {doshaInfo.recommendations.map(rec => (
                    <li key={rec} className="text-sm text-gray-700 flex items-start">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Dosha Score Breakdown</h3>
            
            <div className="space-y-4">
              {Object.entries(scores).map(([dosha, score]) => {
                const percentage = (score / Math.max(...Object.values(scores))) * 100;
                const info = getDoshaInfo(dosha);
                
                return (
                  <div key={dosha}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 capitalize">{dosha}</span>
                      <span className="text-sm text-gray-600">{score} points</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className={`bg-${info.color}-500 h-3 rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">Understanding Your Results</h4>
              <p className="text-sm text-amber-700">
                Your dominant dosha represents your primary constitution, but you may have secondary doshas too. 
                A balanced approach considering all three doshas is ideal for optimal health.
              </p>
            </div>

            <button
              onClick={resetTest}
              className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
            >
              Take Test Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = prakritQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / prakritQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Prakriti Assessment</h2>
        <p className="text-lg text-gray-600 mb-6">
          Discover your unique Ayurvedic constitution through this comprehensive assessment
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {prakritQuestions.length}
        </p>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        {/* <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          {question.question}
        </h3>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(question.id, option)}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                <span className="text-gray-700">{option.text}</span>
              </div>
            </motion.button>
          ))}
        </div> */}
      </motion.div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Choose the option that best describes you most of the time
      </div>
    </div>
  );
};