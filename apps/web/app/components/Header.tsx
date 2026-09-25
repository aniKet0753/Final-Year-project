"use client"

import React, { useState } from 'react';
import { Leaf, Heart, Brain, User, Activity, MessageCircle, Video, LifeBuoy as Lifestyle, FileText, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'AI Diagnosis', icon: Heart },
    { id: 'medicines', label: 'Medicine DB', icon: Leaf },
    { id: 'prakriti', label: 'Prakriti Test', icon: User },
    { id: 'tracker', label: 'Health Tracker', icon: Activity },
    { id: 'ai-consult', label: 'AI Consult', icon: Brain },
    { id: 'community', label: 'Community', icon: MessageCircle },
    { id: 'telemedicine', label: 'TeleMedicine', icon: Video },
    { id: 'lifestyle', label: 'Lifestyle', icon: Lifestyle },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'about', label: 'About', icon: Brain }
  ];

  return (
    <header className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm">
              <Leaf className="w-7 h-7 text-emerald-100" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AyurTech Pro</h1>
              <p className="text-emerald-100 text-xs">AI-Powered Ayurvedic Healthcare</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigationItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-white/25 text-white shadow-lg backdrop-blur-sm'
                      : 'text-emerald-100 hover:text-white hover:bg-white/15'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-white/25 text-white'
                        : 'text-emerald-100 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};