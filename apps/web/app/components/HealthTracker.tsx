"use client"

import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Calendar, Plus, Heart, Thermometer, Droplets, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

interface HealthMetric {
  id: string;
  date: string;
  weight: number;
  bloodPressure: { systolic: number; diastolic: number };
  heartRate: number;
  temperature: number;
  sleepHours: number;
  stressLevel: number;
  energyLevel: number;
  symptoms: string[];
  notes: string;
}

export const HealthTracker: React.FC = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('weight');
  const [newEntry, setNewEntry] = useState<Partial<HealthMetric>>({
    date: new Date().toISOString().split('T')[0],
    weight: 0,
    bloodPressure: { systolic: 120, diastolic: 80 },
    heartRate: 72,
    temperature: 98.6,
    sleepHours: 8,
    stressLevel: 5,
    energyLevel: 5,
    symptoms: [],
    notes: ''
  });

  // Load sample data
  useEffect(() => {
    const sampleData: HealthMetric[] = [
      {
        id: '1',
        date: '2025-01-01',
        weight: 70,
        bloodPressure: { systolic: 120, diastolic: 80 },
        heartRate: 72,
        temperature: 98.6,
        sleepHours: 7.5,
        stressLevel: 3,
        energyLevel: 8,
        symptoms: [],
        notes: 'Feeling good today'
      },
      {
        id: '2',
        date: '2025-01-02',
        weight: 69.8,
        bloodPressure: { systolic: 118, diastolic: 78 },
        heartRate: 70,
        temperature: 98.4,
        sleepHours: 8,
        stressLevel: 2,
        energyLevel: 9,
        symptoms: [],
        notes: 'Great sleep last night'
      },
      {
        id: '3',
        date: '2025-01-03',
        weight: 70.2,
        bloodPressure: { systolic: 125, diastolic: 82 },
        heartRate: 75,
        temperature: 99.1,
        sleepHours: 6,
        stressLevel: 6,
        energyLevel: 6,
        symptoms: ['headache', 'fatigue'],
        notes: 'Stressful day at work'
      }
    ];
    setMetrics(sampleData);
  }, []);

  const addEntry = () => {
    if (newEntry.date) {
      const entry: HealthMetric = {
        id: Date.now().toString(),
        date: newEntry.date,
        weight: newEntry.weight || 0,
        bloodPressure: newEntry.bloodPressure || { systolic: 120, diastolic: 80 },
        heartRate: newEntry.heartRate || 72,
        temperature: newEntry.temperature || 98.6,
        sleepHours: newEntry.sleepHours || 8,
        stressLevel: newEntry.stressLevel || 5,
        energyLevel: newEntry.energyLevel || 5,
        symptoms: newEntry.symptoms || [],
        notes: newEntry.notes || ''
      };
      
      setMetrics([...metrics, entry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setShowAddForm(false);
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        weight: 0,
        bloodPressure: { systolic: 120, diastolic: 80 },
        heartRate: 72,
        temperature: 98.6,
        sleepHours: 8,
        stressLevel: 5,
        energyLevel: 5,
        symptoms: [],
        notes: ''
      });
    }
  };

  const getChartData = () => {
    return metrics.map(metric => ({
      date: new Date(metric.date).toLocaleDateString(),
      weight: metric.weight,
      heartRate: metric.heartRate,
      temperature: metric.temperature,
      sleepHours: metric.sleepHours,
      stressLevel: metric.stressLevel,
      energyLevel: metric.energyLevel,
      systolic: metric.bloodPressure.systolic,
      diastolic: metric.bloodPressure.diastolic
    }));
  };

  const getMetricStats = () => {
    if (metrics.length === 0) return null;
    
    const latest = metrics[metrics.length - 1]!;
    const previous = metrics[metrics.length - 2];
    
    return {
      weight: {
        current: latest.weight,
        change: previous ? latest.weight - previous.weight : 0,
        trend: previous ? (latest.weight > previous.weight ? 'up' : 'down') : 'stable'
      },
      heartRate: {
        current: latest.heartRate,
        change: previous ? latest.heartRate - previous.heartRate : 0,
        trend: previous ? (latest.heartRate > previous.heartRate ? 'up' : 'down') : 'stable'
      },
      sleepHours: {
        current: latest.sleepHours,
        change: previous ? latest.sleepHours - previous.sleepHours : 0,
        trend: previous ? (latest.sleepHours > previous.sleepHours ? 'up' : 'down') : 'stable'
      }
    };
  };

  const stats = getMetricStats();
  const chartData = getChartData();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Tracker</h2>
          <p className="text-lg text-gray-600">Monitor your health metrics and track progress over time</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Entry</span>
        </button>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className={`w-5 h-5 ${stats.weight.trend === 'up' ? 'text-red-500' : 'text-green-500'}`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.weight.current} kg</h3>
            <p className="text-sm text-gray-600">Weight</p>
            <p className={`text-xs ${stats.weight.change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {stats.weight.change >= 0 ? '+' : ''}{stats.weight.change.toFixed(1)} kg from last entry
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <TrendingUp className={`w-5 h-5 ${stats.heartRate.trend === 'up' ? 'text-red-500' : 'text-green-500'}`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.heartRate.current} bpm</h3>
            <p className="text-sm text-gray-600">Heart Rate</p>
            <p className={`text-xs ${stats.heartRate.change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {stats.heartRate.change >= 0 ? '+' : ''}{stats.heartRate.change} bpm from last entry
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Moon className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className={`w-5 h-5 ${stats.sleepHours.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.sleepHours.current}h</h3>
            <p className="text-sm text-gray-600">Sleep</p>
            <p className={`text-xs ${stats.sleepHours.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.sleepHours.change >= 0 ? '+' : ''}{stats.sleepHours.change.toFixed(1)}h from last entry
            </p>
          </motion.div>
        </div>
      )}

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Trends</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="weight">Weight</option>
              <option value="heartRate">Heart Rate</option>
              <option value="temperature">Temperature</option>
              <option value="sleepHours">Sleep Hours</option>
            </select>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Wellness Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="energyLevel" fill="#10b981" name="Energy Level" />
              <Bar dataKey="stressLevel" fill="#f59e0b" name="Stress Level" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Entries</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Weight</th>
                <th className="text-left py-3 px-4">BP</th>
                <th className="text-left py-3 px-4">Heart Rate</th>
                <th className="text-left py-3 px-4">Sleep</th>
                <th className="text-left py-3 px-4">Energy</th>
                <th className="text-left py-3 px-4">Symptoms</th>
              </tr>
            </thead>
            <tbody>
              {metrics.slice(-5).reverse().map(metric => (
                <tr key={metric.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{new Date(metric.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{metric.weight} kg</td>
                  <td className="py-3 px-4">{metric.bloodPressure.systolic}/{metric.bloodPressure.diastolic}</td>
                  <td className="py-3 px-4">{metric.heartRate} bpm</td>
                  <td className="py-3 px-4">{metric.sleepHours}h</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full" 
                          style={{ width: `${(metric.energyLevel / 10) * 100}%` }}
                        />
                      </div>
                      <span>{metric.energyLevel}/10</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {metric.symptoms.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {metric.symptoms.slice(0, 2).map(symptom => (
                          <span key={symptom} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                            {symptom}
                          </span>
                        ))}
                        {metric.symptoms.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{metric.symptoms.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-green-600 text-xs">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Add Health Entry</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newEntry.weight}
                  onChange={(e) => setNewEntry({ ...newEntry, weight: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate (bpm)</label>
                <input
                  type="number"
                  value={newEntry.heartRate}
                  onChange={(e) => setNewEntry({ ...newEntry, heartRate: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Hours</label>
                <input
                  type="number"
                  step="0.5"
                  value={newEntry.sleepHours}
                  onChange={(e) => setNewEntry({ ...newEntry, sleepHours: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Energy Level (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newEntry.energyLevel}
                  onChange={(e) => setNewEntry({ ...newEntry, energyLevel: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600">{newEntry.energyLevel}/10</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stress Level (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newEntry.stressLevel}
                  onChange={(e) => setNewEntry({ ...newEntry, stressLevel: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600">{newEntry.stressLevel}/10</div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Any additional notes about your health today..."
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={addEntry}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
              >
                Add Entry
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};