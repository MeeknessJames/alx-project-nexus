'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { jobCategories, experienceLevels, locations } from '@/data/mockJobs';

const FilterBar = ({ filters, onFiltersChange, onClearFilters }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    onFiltersChange({ [key]: value });
  };

  const handleSearchChange = (e) => {
    onFiltersChange({ searchTerm: e.target.value });
  };

  const FilterSection = () => (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-black placeholder-opacity-70"
          aria-label="Search jobs"
          style={{ color: '#000000' }}
        />
      </div>

      {/* Category Filter */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          style={{ color: '#000000' }}
        >
          {jobCategories.map((category) => (
            <option key={category} value={category} style={{ color: '#000000' }}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-900 mb-2">
          Location
        </label>
        <select
          id="location"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          style={{ color: '#000000' }}
        >
          {locations.map((location) => (
            <option key={location} value={location} style={{ color: '#000000' }}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Experience Level Filter */}
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-900 mb-2">
          Experience Level
        </label>
        <select
          id="experience"
          value={filters.experienceLevel}
          onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          style={{ color: '#000000' }}
        >
          {experienceLevels.map((level) => (
            <option key={level} value={level} style={{ color: '#000000' }}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Remote Filter */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="remote"
          checked={filters.remote}
          onChange={(e) => handleFilterChange('remote', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="remote" className="ml-2 block text-sm text-gray-900">
          Remote only
        </label>
      </div>

      {/* Clear Filters */}
      <button
        onClick={onClearFilters}
        className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Jobs</h2>
        <FilterSection />
      </div>

      {/* Mobile/Tablet Filters */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Filter Jobs</h2>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center px-2 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-expanded={showMobileFilters}
            aria-controls="mobile-filters"
          >
            <Filter className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">{showMobileFilters ? 'Hide' : 'Show'} Filters</span>
            <span className="sm:hidden">Filter</span>
          </button>
        </div>

        {showMobileFilters && (
          <div id="mobile-filters" className="border-t border-gray-200 pt-4">
            <FilterSection />
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {filters.category !== 'All Categories' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              Category: {filters.category}
              <button
                onClick={() => handleFilterChange('category', 'All Categories')}
                className="ml-2 text-blue-600 hover:text-blue-800"
                aria-label={`Remove category filter: ${filters.category}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.location !== 'All Locations' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Location: {filters.location}
              <button
                onClick={() => handleFilterChange('location', 'All Locations')}
                className="ml-2 text-green-600 hover:text-green-800"
                aria-label={`Remove location filter: ${filters.location}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.experienceLevel !== 'All Levels' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              Level: {filters.experienceLevel}
              <button
                onClick={() => handleFilterChange('experienceLevel', 'All Levels')}
                className="ml-2 text-purple-600 hover:text-purple-800"
                aria-label={`Remove experience level filter: ${filters.experienceLevel}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.remote && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
              Remote Only
              <button
                onClick={() => handleFilterChange('remote', false)}
                className="ml-2 text-orange-600 hover:text-orange-800"
                aria-label="Remove remote filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
              Search: &ldquo;{filters.searchTerm}&rdquo;
              <button
                onClick={() => handleFilterChange('searchTerm', '')}
                className="ml-2 text-gray-600 hover:text-gray-800"
                aria-label={`Remove search filter: ${filters.searchTerm}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

