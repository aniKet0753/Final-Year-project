"use client"

import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Activity, Heart, Brain, Printer, Share2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar }  from 'recharts';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

interface HealthReport {
  id: string;
  title: string;
  date: Date;
  type: 'comprehensive' | 'symptom-analysis' | 'prakriti' | 'progress';
  summary: string;
  recommendations: string[];
  data: any;
}

export const HealthReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [reports, setReports] = useState<HealthReport[]>([
    {
      id: '1',
      title: 'Comprehensive Health Analysis',
      date: new Date(Date.now() - 86400000),
      type: 'comprehensive',
      summary: 'Overall health assessment showing good progress in digestive health and stress management.',
      recommendations: [
        'Continue current Triphala regimen',
        'Increase meditation practice to 20 minutes daily',
        'Add gentle morning yoga routine'
      ],
      data: {
        overallScore: 78,
        categories: [
          { category: 'Digestive Health', score: 85 },
          { category: 'Mental Wellness', score: 72 },
          { category: 'Physical Fitness', score: 68 },
          { category: 'Sleep Quality', score: 80 },
          { category: 'Stress Management', score: 75 }
        ]
      }
    },
    {
      id: '2',
      title: 'Prakriti Assessment Report',
      date: new Date(Date.now() - 172800000),
      type: 'prakriti',
      summary: 'Detailed constitutional analysis revealing Vata-Pitta dominance with seasonal recommendations.',
      recommendations: [
        'Follow Vata-pacifying diet during fall/winter',
        'Practice cooling pranayama in summer',
        'Maintain regular daily routine'
      ],
      data: {
        dominantDosha: 'Vata-Pitta',
        scores: { vata: 45, pitta: 35, kapha: 20 },
        characteristics: ['Creative', 'Energetic', 'Quick thinking', 'Sensitive to cold']
      }
    }
  ]);

  const generateReport = async () => {
    const reportElement = document.getElementById('health-report');
    if (reportElement) {
      const canvas = await html2canvas(reportElement);
      const link = document.createElement('a');
      link.download = 'health-report.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const healthTrendData = [
    { date: '2025-01-01', energy: 6, stress: 4, sleep: 7, digestion: 8 },
    { date: '2025-01-02', energy: 7, stress: 3, sleep: 8, digestion: 8 },
    { date: '2025-01-03', energy: 5, stress: 6, sleep: 6, digestion: 7 },
    { date: '2025-01-04', energy: 8, stress: 2, sleep: 9, digestion: 9 },
    { date: '2025-01-05', energy: 7, stress: 3, sleep: 8, digestion: 8 },
    { date: '2025-01-06', energy: 9, stress: 2, sleep: 9, digestion: 9 },
    { date: '2025-01-07', energy: 8, stress: 3, sleep: 8, digestion: 8 }
  ];

  const doshaBalanceData = [
    { dosha: 'Vata', current: 45, ideal: 33 },
    { dosha: 'Pitta', current: 35, ideal: 33 },
    { dosha: 'Kapha', current: 20, ideal: 33 }
  ];

  const ReportCard: React.FC<{ report: HealthReport }> = ({ report }) => {
    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'comprehensive': return Activity;
        case 'symptom-analysis': return Heart;
        case 'prakriti': return Brain;
        case 'progress': return TrendingUp;
        default: return FileText;
      }
    };

    const getTypeColor = (type: string) => {
      switch (type) {
        case 'comprehensive': return 'bg-blue-100 text-blue-600';
        case 'symptom-analysis': return 'bg-red-100 text-red-600';
        case 'prakriti': return 'bg-purple-100 text-purple-600';
        case 'progress': return 'bg-green-100 text-green-600';
        default: return 'bg-gray-100 text-gray-600';
      }
    };

    const Icon = getTypeIcon(report.type);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 cursor-pointer"
        onClick={() => setSelectedReport(report.id)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(report.type)}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{report.date.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full capitalize">
            {report.type.replace('-', ' ')}
          </span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{report.summary}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Recommendations:</h4>
          <ul className="space-y-1">
            {report.recommendations.slice(0, 2).map((rec, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View Full Report
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const selectedReportData = reports.find(r => r.id === selectedReport);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Reports</h2>
          <p className="text-lg text-gray-600">Comprehensive analysis and insights into your health journey</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={generateReport}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {!selectedReport ? (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{reports.length}</h3>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">78%</h3>
              <p className="text-sm text-gray-600">Health Score</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">15</h3>
              <p className="text-sm text-gray-600">Days Tracked</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">92%</h3>
              <p className="text-sm text-gray-600">Improvement</p>
            </div>
          </div>

          {/* Health Trends Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Health Trends (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} name="Energy" />
                  <Line type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={2} name="Stress" />
                  <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" strokeWidth={2} name="Sleep" />
                  <Line type="monotone" dataKey="digestion" stroke="#06b6d4" strokeWidth={2} name="Digestion" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Dosha Balance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={doshaBalanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dosha" />
                  <YAxis domain={[0, 50]} />
                  <Tooltip />
                  <Bar dataKey="current" fill="#10b981" name="Current" />
                  <Bar dataKey="ideal" fill="#e5e7eb" name="Ideal Balance" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reports List */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Reports</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Detailed Report View */
        <div id="health-report">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedReportData?.title}</h3>
                <p className="text-gray-600">{selectedReportData?.date.toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Reports
              </button>
            </div>

            {selectedReportData?.type === 'comprehensive' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Overall Health Score</h4>
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 relative">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                          <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="8"
                            strokeDasharray={`${(selectedReportData.data.overallScore / 100) * 314} 314`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-gray-900">
                            {selectedReportData.data.overallScore}%
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600">Excellent Progress</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h4>
                    <div className="space-y-4">
                      {selectedReportData.data.categories.map((cat: any) => (
                        <div key={cat.category}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                            <span className="text-sm text-gray-600">{cat.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-500 h-2 rounded-full"
                              style={{ width: `${cat.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedReportData?.type === 'prakriti' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Constitutional Analysis</h4>
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                    <h5 className="text-xl font-bold text-gray-900">{selectedReportData.data.dominantDosha}</h5>
                    <p className="text-gray-600">Dominant Constitution</p>
                  </div>
                  
                  <div className="space-y-3">
                    {Object.entries(selectedReportData.data.scores).map(([dosha, score]: [string, any]) => (
                      <div key={dosha}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 capitalize">{dosha}</span>
                          <span className="text-sm text-gray-600">{score}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Characteristics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedReportData.data.characteristics.map((char: string) => (
                      <div key={char} className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-center text-sm font-medium">
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedReportData?.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{idx + 1}</span>
                      </div>
                      <p className="text-emerald-800 text-sm">{rec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};