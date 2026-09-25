"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Calendar, Clock, User, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  languages: string[];
  availability: string;
  consultationFee: number;
  image: string;
  verified: boolean;
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: Date;
  duration: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  type: 'video' | 'audio' | 'chat';
}

export const TeleMedicine: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const webcamRef = useRef<Webcam>(null);

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialization: 'Panchakarma & Detox Specialist',
      experience: 15,
      rating: 4.9,
      languages: ['English', 'Hindi', 'Sanskrit'],
      availability: 'Available Now',
      consultationFee: 1500,
      image: '👩‍⚕️',
      verified: true
    },
    {
      id: '2',
      name: 'Vaidya Rajesh Kumar',
      specialization: 'Herbal Medicine & Chronic Diseases',
      experience: 20,
      rating: 4.8,
      languages: ['English', 'Hindi', 'Tamil'],
      availability: 'Next Available: 2:00 PM',
      consultationFee: 2000,
      image: '👨‍⚕️',
      verified: true
    },
    {
      id: '3',
      name: 'Dr. Meera Patel',
      specialization: 'Women\'s Health & Fertility',
      experience: 12,
      rating: 4.9,
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: 'Available Now',
      consultationFee: 1800,
      image: '👩‍⚕️',
      verified: true
    },
    {
      id: '4',
      name: 'Dr. Arjun Nair',
      specialization: 'Mental Health & Stress Management',
      experience: 10,
      rating: 4.7,
      languages: ['English', 'Hindi', 'Malayalam'],
      availability: 'Next Available: 4:30 PM',
      consultationFee: 1600,
      image: '👨‍⚕️',
      verified: true
    }
  ];

  useEffect(() => {
    // Sample appointments
    const sampleAppointments: Appointment[] = [
      {
        id: '1',
        doctorId: '1',
        doctorName: 'Dr. Priya Sharma',
        date: new Date(Date.now() + 3600000), // 1 hour from now
        duration: 30,
        status: 'scheduled',
        type: 'video'
      },
      {
        id: '2',
        doctorId: '2',
        doctorName: 'Vaidya Rajesh Kumar',
        date: new Date(Date.now() - 86400000), // Yesterday
        duration: 45,
        status: 'completed',
        type: 'video'
      }
    ];
    setAppointments(sampleAppointments);
  }, []);

  const startCall = () => {
    setInCall(true);
  };

  const endCall = () => {
    setInCall(false);
    setVideoEnabled(true);
    setAudioEnabled(true);
  };

  const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-2xl">
            {doctor.image}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              {doctor.verified && (
                <Shield className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <p className="text-emerald-600 font-medium">{doctor.specialization}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <span>{doctor.experience} years exp.</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{doctor.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">₹{doctor.consultationFee}</p>
          <p className="text-sm text-gray-600">per consultation</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Languages:</p>
        <div className="flex flex-wrap gap-2">
          {doctor.languages.map(lang => (
            <span key={lang} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            doctor.availability.includes('Available Now') ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          <span className="text-sm text-gray-600">{doctor.availability}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedDoctor(doctor);
              setShowBooking(true);
            }}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Book Appointment
          </button>
          {doctor.availability.includes('Available Now') && (
            <button
              onClick={() => {
                setSelectedDoctor(doctor);
                startCall();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
            >
              <Video className="w-4 h-4" />
              <span>Call Now</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (inCall && selectedDoctor) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-50">
        <div className="h-full flex flex-col">
          {/* Call Header */}
          <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                {selectedDoctor.image}
              </div>
              <div>
                <h3 className="font-semibold">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-300">Connected • 00:05:23</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Consultation Active
              </span>
            </div>
          </div>

          {/* Video Area */}
          <div className="flex-1 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Doctor's Video (Simulated) */}
              <div className="bg-gray-800 relative flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-6xl mx-auto mb-4">
                    {selectedDoctor.image}
                  </div>
                  <h3 className="text-xl font-semibold">{selectedDoctor.name}</h3>
                  <p className="text-gray-300">{selectedDoctor.specialization}</p>
                </div>
              </div>

              {/* User's Video */}
              <div className="bg-gray-700 relative">
                {videoEnabled ? (
                  <Webcam
                    ref={webcamRef}
                    className="w-full h-full object-cover"
                    mirrored={true}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <VideoOff className="w-16 h-16 mx-auto mb-4" />
                      <p>Camera is off</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Call Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4 bg-gray-800 rounded-full px-6 py-3">
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`p-3 rounded-full transition-colors ${
                    audioEnabled ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {audioEnabled ? (
                    <Mic className="w-5 h-5 text-white" />
                  ) : (
                    <MicOff className="w-5 h-5 text-white" />
                  )}
                </button>
                
                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`p-3 rounded-full transition-colors ${
                    videoEnabled ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {videoEnabled ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <VideoOff className="w-5 h-5 text-white" />
                  )}
                </button>
                
                <button
                  onClick={endCall}
                  className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                >
                  <PhoneOff className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">TeleMedicine Consultations</h2>
        <p className="text-lg text-gray-600">Connect with certified Ayurvedic practitioners from anywhere</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">50+</h3>
          <p className="text-sm text-gray-600">Certified Doctors</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Video className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
          <p className="text-sm text-gray-600">Consultations</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">4.8/5</h3>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
          <p className="text-sm text-gray-600">Availability</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      {appointments.filter(apt => apt.status === 'scheduled').length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {appointments
              .filter(apt => apt.status === 'scheduled')
              .map(appointment => (
                <div key={appointment.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                      👨‍⚕️
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{appointment.doctorName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{appointment.date.toLocaleDateString()}</span>
                        <span>{appointment.date.toLocaleTimeString()}</span>
                        <span>{appointment.duration} min</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                      Join Call
                    </button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Available Doctors */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Doctors</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {doctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Book Appointment</h3>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                {selectedDoctor.image}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{selectedDoctor.name}</h4>
                <p className="text-emerald-600">{selectedDoctor.specialization}</p>
                <p className="text-lg font-bold text-gray-900">₹{selectedDoctor.consultationFee}</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="video">Video Call</option>
                  <option value="audio">Audio Call</option>
                  <option value="chat">Chat Only</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe your health concern..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200">
                Book Appointment
              </button>
              <button
                onClick={() => {
                  setShowBooking(false);
                  setSelectedDoctor(null);
                }}
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