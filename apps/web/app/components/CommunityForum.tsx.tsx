"use client"

import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Reply, Plus, Search, Filter, Clock, User, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  category: string;
  tags: string[];
  likes: number;
  replies: number;
  timestamp: Date;
  isExpert: boolean;
  solved: boolean;
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  avatar: string;
  likes: number;
  timestamp: Date;
  isExpert: boolean;
}

export const CommunityForum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'Best Ayurvedic remedies for chronic insomnia?',
      content: 'I have been struggling with sleep issues for months. Tried Ashwagandha but looking for more comprehensive approach. Any suggestions?',
      author: 'SleeplessInSeattle',
      avatar: '👤',
      category: 'Sleep & Stress',
      tags: ['insomnia', 'ashwagandha', 'sleep'],
      likes: 12,
      replies: 8,
      timestamp: new Date(Date.now() - 3600000),
      isExpert: false,
      solved: false
    },
    {
      id: '2',
      title: 'Triphala vs individual herbs - which is better?',
      content: 'As an Ayurvedic practitioner, I often get asked about using Triphala versus taking Amalaki, Bibhitaki, and Haritaki separately. Here\'s my perspective...',
      author: 'Dr. Priya Sharma',
      avatar: '👩‍⚕️',
      category: 'Medicine Discussion',
      tags: ['triphala', 'herbs', 'expert-advice'],
      likes: 24,
      replies: 15,
      timestamp: new Date(Date.now() - 7200000),
      isExpert: true,
      solved: true
    },
    {
      id: '3',
      title: 'Prakriti assessment confusion - Vata-Pitta or Pitta-Vata?',
      content: 'I took multiple prakriti tests and getting mixed results. Sometimes Vata-Pitta, sometimes Pitta-Vata. How do I determine my true constitution?',
      author: 'ConfusedConstitution',
      avatar: '🤔',
      category: 'Prakriti & Constitution',
      tags: ['prakriti', 'vata', 'pitta', 'assessment'],
      likes: 8,
      replies: 6,
      timestamp: new Date(Date.now() - 10800000),
      isExpert: false,
      solved: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const categories = [
    'General Discussion',
    'Medicine Discussion',
    'Sleep & Stress',
    'Digestive Health',
    'Prakriti & Constitution',
    'Lifestyle & Diet',
    'Success Stories',
    'Expert Q&A'
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const PostCard: React.FC<{ post: ForumPost }> = ({ post }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
            {post.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900">{post.author}</h4>
              {post.isExpert && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Expert
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{post.timestamp.toLocaleString()}</span>
              <span>•</span>
              <span className="text-emerald-600">{post.category}</span>
            </div>
          </div>
        </div>
        {post.solved && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            ✓ Solved
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-emerald-600 cursor-pointer">
        {post.title}
      </h3>
      
      <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600 transition-colors">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.replies} replies</span>
          </button>
        </div>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          View Discussion
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h2>
          <p className="text-lg text-gray-600">Connect with fellow Ayurveda enthusiasts and experts</p>
        </div>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Post</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search discussions, topics, or tags..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1,247</h3>
          <p className="text-sm text-gray-600">Total Discussions</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3,892</h3>
          <p className="text-sm text-gray-600">Active Members</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">127</h3>
          <p className="text-sm text-gray-600">Verified Experts</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Reply className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">8,934</h3>
          <p className="text-sm text-gray-600">Total Replies</p>
        </div>
      </div>

      {/* Featured Experts */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Featured Experts This Week</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Dr. Priya Sharma', specialty: 'Panchakarma Specialist', replies: 23 },
            { name: 'Vaidya Rajesh Kumar', specialty: 'Herbal Medicine Expert', replies: 18 },
            { name: 'Dr. Meera Patel', specialty: 'Women\'s Health', replies: 15 }
          ].map(expert => (
            <div key={expert.name} className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                👨‍⚕️
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{expert.name}</h4>
                <p className="text-sm text-gray-600">{expert.specialty}</p>
                <p className="text-xs text-emerald-600">{expert.replies} helpful replies this week</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No discussions found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or browse different categories.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
            }}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Create New Discussion</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="What would you like to discuss?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  rows={6}
                  placeholder="Share your question, experience, or knowledge..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  placeholder="Add tags separated by commas (e.g., triphala, digestion, herbs)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200">
                Post Discussion
              </button>
              <button
                onClick={() => setShowNewPostForm(false)}
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