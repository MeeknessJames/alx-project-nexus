'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { apiService } from '@/services/api';
import { mockJobs } from '@/data/mockJobs';

// Initial state
const initialState = {
  jobs: [],
  filteredJobs: [],
  loading: false,
  error: null,
  filters: {
    category: 'All Categories',
    location: 'All Locations',
    experienceLevel: 'All Levels',
    searchTerm: '',
    remote: false
  },
  applications: []
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_JOBS: 'SET_JOBS',
  SET_ERROR: 'SET_ERROR',
  SET_FILTERS: 'SET_FILTERS',
  FILTER_JOBS: 'FILTER_JOBS',
  ADD_APPLICATION: 'ADD_APPLICATION',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
const jobReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ActionTypes.SET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        filteredJobs: action.payload,
        loading: false
        // Don't clear error here as we may want to keep warning messages
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case ActionTypes.FILTER_JOBS:
      const { jobs, filters } = state;
      let filtered = [...jobs];

      // Filter by category
      if (filters.category !== 'All Categories') {
        filtered = filtered.filter(job => job.category === filters.category);
      }

      // Filter by location
      if (filters.location !== 'All Locations') {
        if (filters.location === 'Remote') {
          filtered = filtered.filter(job => job.remote === true);
        } else {
          filtered = filtered.filter(job => job.location === filters.location);
        }
      }

      // Filter by experience level
      if (filters.experienceLevel !== 'All Levels') {
        filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
      }

      // Filter by search term
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
        );
      }

      // Filter by remote preference
      if (filters.remote) {
        filtered = filtered.filter(job => job.remote === true);
      }

      return {
        ...state,
        filteredJobs: filtered
      };

    case ActionTypes.ADD_APPLICATION:
      return {
        ...state,
        applications: [...state.applications, action.payload]
      };

    case ActionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        filteredJobs: state.jobs
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Create context
const JobContext = createContext();

// Provider component
export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  // Load jobs on component mount
  useEffect(() => {
    const loadJobs = async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      
      try {
        // Try to fetch from API first
        const response = await apiService.fetchJobs();
        if (response.success) {
          dispatch({ type: ActionTypes.SET_JOBS, payload: response.data });
        } else {
          throw new Error(response.error || 'Failed to fetch jobs');
        }
      } catch (error) {
        console.warn('API error, falling back to mock data:', error);
        // Fallback to mock data if API fails
        dispatch({ type: ActionTypes.SET_JOBS, payload: mockJobs });
        // Optionally show a user-friendly warning about cached data
        dispatch({ 
          type: ActionTypes.SET_ERROR, 
          payload: 'Unable to fetch live data. Showing cached job listings.' 
        });
      }
    };

    loadJobs();
  }, []);

  // Filter jobs whenever filters change and fetch new data
  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filters = state.filters;
        const queryParams = new URLSearchParams();
        
        if (filters.category && filters.category !== 'All Categories') {
          queryParams.append('category', filters.category);
        }
        if (filters.location && filters.location !== 'All Locations') {
          queryParams.append('location', filters.location);
        }
        if (filters.experienceLevel && filters.experienceLevel !== 'All Levels') {
          queryParams.append('experienceLevel', filters.experienceLevel);
        }
        if (filters.remote) {
          queryParams.append('remote', 'true');
        }
        if (filters.searchTerm && filters.searchTerm.trim()) {
          queryParams.append('search', filters.searchTerm.trim());
        }

        const queryString = queryParams.toString();
        const url = `/api/jobs${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          // Update filtered jobs with API response
          dispatch({ type: ActionTypes.SET_JOBS, payload: data.data });
        } else {
          // Fallback to local filtering if API fails
          dispatch({ type: ActionTypes.FILTER_JOBS });
        }
      } catch (error) {
        console.warn('Error fetching filtered jobs:', error);
        // Fallback undefined jobs with the API service
        dispatch({ type: ActionTypes.FILTER_JOBS });
      }
    };
    
    applyFilters();
  }, [state.filters]);

  // Action creators
  const setFilters = (filters) => {
    dispatch({ type: ActionTypes.SET_FILTERS, payload: filters });
  };

  const clearFilters = () => {
    dispatch({ type: ActionTypes.CLEAR_FILTERS });
  };

  const addApplication = async (application) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      
      const response = await apiService.applyForJob(application);
      
      if (response.success) {
        dispatch({ type: ActionTypes.ADD_APPLICATION, payload: response.data });
        return { success: true, message: response.message };
      } else {
        throw new Error(response.error || 'Application failed');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      throw error;
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  const value = {
    ...state,
    setFilters,
    clearFilters,
    addApplication
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};

// Custom hook to use the context
export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

