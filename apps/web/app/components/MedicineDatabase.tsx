// import React, { useState, useMemo } from 'react';
// import { Search, Filter, Grid, List } from 'lucide-react';
// import { RecommendationEngine } from '../utils/recommendation';
// import { Medicine } from '../types';
// import { MedicineCard } from './MedicineCard';

// export const MedicineDatabase: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [selectedType, setSelectedType] = useState<string>('');
//   const [selectedBodySystem, setSelectedBodySystem] = useState<string>('');
//   const [selectedSeverity, setSelectedSeverity] = useState<string>('');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

//   const categories = [...new Set(medicines.map(m => m.category))];
//   const types = [...new Set(medicines.map(m => m.type))];
//   const bodySystems = [...new Set(medicines.flatMap(m => m.bodySystem))];
//   const severities = [...new Set(medicines.map(m => m.severity))];

//   const filteredMedicines = useMemo(() => {
//     let filtered = medicines;

//     // Text search
//     if (searchTerm) {
//       filtered = RecommendationEngine.searchMedicines(searchTerm);
//     }

//     // Category filter
//     if (selectedCategory) {
//       filtered = filtered.filter(m => m.category === selectedCategory);
//     }

//     // Type filter
//     if (selectedType) {
//       filtered = filtered.filter(m => m.type === selectedType);
//     }

//     // Body system filter
//     if (selectedBodySystem) {
//       filtered = filtered.filter(m => m.bodySystem.includes(selectedBodySystem));
//     }

//     // Severity filter
//     if (selectedSeverity) {
//       filtered = filtered.filter(m => m.severity === selectedSeverity);
//     }

//     return filtered;
//   }, [searchTerm, selectedCategory, selectedType, selectedBodySystem, selectedSeverity]);

//   const clearFilters = () => {
//     setSearchTerm('');
//     setSelectedCategory('');
//     setSelectedType('');
//     setSelectedBodySystem('');
//     setSelectedSeverity('');
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">
//           Ayurvedic Medicine Database
//         </h2>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//           Explore our comprehensive collection of traditional Ayurvedic medicines with detailed information about their uses, ingredients, and benefits.
//         </p>
//       </div>

//       {/* Search and Filters */}
//       <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Search */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Search Medicines
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search by name, ingredient, or condition..."
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               />
//               <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
//             </div>
//           </div>

//           {/* View Mode Toggle */}
//           <div className="flex items-end justify-between">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 View Mode
//               </label>
//               <div className="flex rounded-lg border border-gray-300 overflow-hidden">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
//                     viewMode === 'grid'
//                       ? 'bg-emerald-600 text-white'
//                       : 'bg-white text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Grid className="w-4 h-4" />
//                   <span>Grid</span>
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
//                     viewMode === 'list'
//                       ? 'bg-emerald-600 text-white'
//                       : 'bg-white text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <List className="w-4 h-4" />
//                   <span>List</span>
//                 </button>
//               </div>
//             </div>
            
//             <div className="text-sm text-gray-600">
//               {filteredMedicines.length} of {medicines.length} medicines
//             </div>
//           </div>
//         </div>

//         {/* Advanced Filters */}
//         <div className="mt-6 pt-6 border-t border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//               <Filter className="w-5 h-5 mr-2" />
//               Advanced Filters
//             </h3>
//             <button
//               onClick={clearFilters}
//               className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
//             >
//               Clear All Filters
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               >
//                 <option value="">All Categories</option>
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Type
//               </label>
//               <select
//                 value={selectedType}
//                 onChange={(e) => setSelectedType(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               >
//                 <option value="">All Types</option>
//                 {types.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Body System
//               </label>
//               <select
//                 value={selectedBodySystem}
//                 onChange={(e) => setSelectedBodySystem(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               >
//                 <option value="">All Systems</option>
//                 {bodySystems.map(system => (
//                   <option key={system} value={system}>{system}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Severity
//               </label>
//               <select
//                 value={selectedSeverity}
//                 onChange={(e) => setSelectedSeverity(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//               >
//                 <option value="">All Severities</option>
//                 {severities.map(severity => (
//                   <option key={severity} value={severity}>{severity}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results */}
//       <div className={
//         viewMode === 'grid'
//           ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
//           : 'space-y-4'
//       }>
//         {filteredMedicines.map(medicine => (
//           <MedicineCard
//             key={medicine.id}
//             medicine={medicine}
//           />
//         ))}
//       </div>

//       {filteredMedicines.length === 0 && (
//         <div className="text-center py-12">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Search className="w-8 h-8 text-gray-400" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">No medicines found</h3>
//           <p className="text-gray-600 mb-4">
//             Try adjusting your search terms or filters to find what you're looking for.
//           </p>
//           <button
//             onClick={clearFilters}
//             className="text-emerald-600 hover:text-emerald-700 font-medium"
//           >
//             Clear all filters
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };