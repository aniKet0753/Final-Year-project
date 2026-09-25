"use client"
import React, { useState } from 'react';
import { Header } from './components/Header';
import Landing from './components/LandingPage';
import { SymptomChecker } from './components/SymptomChecker';
// import { MedicineDatabase } from './components/MedicineDatabase';
import { AboutAyurveda } from './components/AboutAyurveda';
import { PrakritiFinder } from './components/PrakritiFinder';
import { HealthTracker } from './components/HealthTracker';
import { AIConsultation } from './components/AIConsultation';
import { TeleMedicine } from './components/TeleMedicine';
import { LifestyleRecommendations } from './components/LifestyleRecommendations';
import { HealthReports } from './components/HealthReports';

// Pages that render full-screen, with no dashboard Header and no dashboard footer
const FULL_PAGE_SECTIONS = ['home', 'signin', 'signup'];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showChrome = !FULL_PAGE_SECTIONS.includes(activeSection);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HealthTracker />;
      // case 'signin':
      //   return <SignIn onNavigate={setActiveSection} />;
      // case 'signup':
      //   return <SignUp onNavigate={setActiveSection} />;
      // case 'medicines':
      //   return <MedicineDatabase />;
      case 'prakriti':
        return <PrakritiFinder />;
      case 'tracker':
        return <HealthTracker />;
      case 'ai-consult':
        return <AIConsultation />;
      // case 'community':
      //   return <CommunityForum />;
      case 'telemedicine':
        return <TeleMedicine />;
      case 'lifestyle':
        return <LifestyleRecommendations />;
      case 'reports':
        return <HealthReports />;
      case 'about':
        return <AboutAyurveda />;
      default:
        return <SymptomChecker />;
    }
  };

  return (
    <div
      className={
        showChrome
          ? 'min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'
          : 'min-h-screen'
      }
    >
      {/* Dashboard header: hidden on landing, sign in and sign up */}
      {showChrome && (
        <Header onNavigate={setActiveSection} activeSection={activeSection} />
      )}

      <main>{renderContent()}</main>

      {/* Dashboard footer: hidden on landing, sign in and sign up */}
      {showChrome && (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-emerald-400">AyurTech Pro</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Revolutionary AI-powered Ayurvedic healthcare platform combining ancient wisdom with modern technology.
                </p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">AI</span>
                  </div>
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">24/7</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-emerald-400">Features</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• AI Symptom Analysis</li>
                  <li>• Prakriti Assessment</li>
                  <li>• Health Tracking</li>
                  <li>• Telemedicine</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-emerald-400">Community</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Expert Forums</li>
                  <li>• Success Stories</li>
                  <li>• Knowledge Base</li>
                  <li>• Support Groups</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-emerald-400">Contact</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• 24/7 AI Support</li>
                  <li>• Expert Consultations</li>
                  <li>• Emergency Helpline</li>
                  <li>• Feedback Portal</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm mb-4">
                <strong>Medical Disclaimer:</strong> This platform provides educational information and should not replace professional medical advice.
              </p>

              <div className="text-gray-500 text-xs mb-4">
                © 2026 AyurTech Pro. Bridging Ancient Wisdom with Modern AI Technology.
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;