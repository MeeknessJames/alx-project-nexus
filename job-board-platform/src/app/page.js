'use client';

import { useState } from 'react';
import { useJobs } from '@/contexts/JobContext';
import FilterBar from '@/components/FilterBar';
import JobCard from '@/components/JobCard';
import JobApplicationModal from '@/components/JobApplicationModal';
import { 
  Briefcase, 
  Search, 
  AlertCircle, 
  Loader2, 
  Users, 
  TrendingUp, 
  Star, 
  Building2, 
  Heart, 
  Zap,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  Globe,
  ChevronDown,
  Target,
  Award,
  Shield,
  Check,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const { 
    jobs, 
    filteredJobs, 
    loading, 
    error, 
    filters, 
    setFilters, 
    clearFilters, 
    addApplication 
  } = useJobs();

  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get featured jobs (first 6 for landing)
  const featuredJobs = jobs.slice(0, 6);
  const recentJobs = jobs.slice(0, 3);

  // Company data for hiring section
  const hiringCompanies = [
    {
      name: "TechCorp Inc.",
      logo: "🏢",
      description: "Leading technology company focused on innovation",
      location: "San Francisco, CA",
      positions: 12,
      specialties: ["Frontend Development", "Backend Development"]
    },
    {
      name: "StartupXYZ",
      logo: "🚀",
      description: "Fast-growing startup making waves in tech",
      location: "New York, NY", 
      positions: 8,
      specialties: ["Full Stack Development", "DevOps"]
    },
    {
      name: "DesignStudio",
      logo: "🎨",
      description: "Creative design studio specializing in UX/UI",
      location: "Austin, TX",
      positions: 5,
      specialties: ["Design", "Product Management"]
    },
    {
      name: "CloudTech Solutions",
      logo: "☁️",
      description: "Cloud infrastructure and DevOps specialists",
      location: "Seattle, WA",
      positions: 10,
      specialties: ["DevOps", "Cloud Architecture"]
    },
    {
      name: "DataInsights Co.",
      logo: "📊",
      description: "Data-driven company revolutionizing analytics", 
      location: "Boston, MA",
      positions: 6,
      specialties: ["Data Science", "Analytics"]
    },
    {
      name: "WebAgency",
      logo: "🌐",
      description: "Full-service web development agency",
      location: "Chicago, IL",
      positions: 4,
      specialties: ["Frontend Development", "Design"]
    }
  ];

  const stats = [
    { number: "500+", label: "Active Jobs", icon: Briefcase },
    { number: "50+", label: "Hiring Companies", icon: Building2 },
    { number: "1000+", label: "Successful Hires", icon: Award },
    { number: "99%", label: "User Satisfaction", icon: Heart }
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSubmitApplication = async (application) => {
    try {
      const result = await addApplication(application);
      if (result && result.success) {
        return result;
      }
      throw new Error(result?.message || 'Application failed');
    } catch (error) {
      console.error('Application error:', error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip Links */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600 mr-3 flex-shrink-0" aria-hidden="true" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">JobBoard</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
              <button
                onClick={() => document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Browse Jobs
              </button>
              <button
                onClick={() => document.getElementById('companies')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Companies
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                About
              </button>
            </nav>

            {/* Search/Filter CTA & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search Jobs Button */}
              <button
                onClick={() => {
                  setShowAllJobs(true);
                  setTimeout(() => {
                    document.getElementById('all-jobs')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 pt-4">
              <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
                <button
                  onClick={() => {
                    document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Browse Jobs
                </button>
                <button
                  onClick={() => {
                    document.getElementById('companies')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  Companies
                </button>
                <button
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  About
                </button>
                <button
                  onClick={() => {
                    setShowAllJobs(true);
                    setTimeout(() => {
                      document.getElementById('all-jobs')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  Search Jobs
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Connect with top companies and discover amazing career opportunities 
              in tech, design, marketing, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <button
                onClick={() => {
                  setShowAllJobs(true);
                  setTimeout(() => {
                    document.getElementById('all-jobs')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Browse Jobs
              </button>
              <button
                onClick={() => document.getElementById('companies')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Explore Companies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" aria-hidden="true" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">What We&apos;re About</h2>
              <p className="text-lg text-gray-600 mb-6">
                JobBoard is your gateway to discovering the perfect career opportunity. 
                We connect talented professionals with innovative companies who are 
                looking to build amazing things together.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether you&apos;re starting your career journey or looking for your next 
                big role, we make job hunting simple, transparent, and rewarding.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Target className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Smart Matching</h3>
                    <p className="text-gray-600 text-sm">
                      Our algorithm connects you with the best matching opportunities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Trusted Platform</h3>
                    <p className="text-gray-600 text-sm">
                      All companies are verified and background-checked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-first lg:visible order-last">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose JobBoard?</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">AI-powered job recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Direct application, no middleman</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Real-time job updates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Company culture insights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="bg-white py-16" id="job-listings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
            <p className="text-lg text-gray-600">
              Discover exciting opportunities from top companies
            </p>
          </div>
          
          {loading && (
            <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" aria-hidden="true" />
                <p className="text-gray-600">Loading job opportunities...</p>
              </div>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {featuredJobs.map((job) => (
                  <div key={job.id} role="listitem">
                    <JobCard job={job} onApply={handleApply} />
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowAllJobs(true);
                    setTimeout(() => {
                      document.getElementById('all-jobs')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  See All Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4" role="alert" aria-live="assertive">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error loading jobs</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hiring Companies Section */}
      <section className="bg-gray-50 py-16" id="companies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hiring Companies</h2>
            <p className="text-lg text-gray-600">
              Top companies actively looking for talented professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {hiringCompanies.map((company, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{company.logo}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {company.location}
                      </p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {company.positions} open
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{company.description}</p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {company.specialties.map((specialty, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Job Listings Section */}
      {showAllJobs && (
        <section className="bg-gray-50 py-16" id="all-jobs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse & Search Jobs</h2>
              <p className="text-lg text-gray-600">Use filters to find your perfect role. Search by category, location, experience level, and more.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Filters */}
              <aside className="lg:col-span-1 order-1 lg:order-1" aria-label="Job Filters">
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
              </aside>

          {/* Main Content - Job Listings */}
              <section className="lg:col-span-3 order-2 lg:order-2" aria-label="Job Search Results">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" aria-hidden="true" />
                  <p className="text-gray-600">
                    <span className="sr-only">Loading</span>
                    Loading job opportunities...
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6" role="alert" aria-live="assertive">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Error loading jobs</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* No Jobs Found */}
            {!loading && !error && filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms to find more opportunities.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  aria-describedby="no-jobs-help"
                >
                  Clear All Filters
                </button>
                <div id="no-jobs-help" className="sr-only">
                  Click this button to clear all current filters and see all available job listings.
                </div>
              </div>
            )}

            {/* Job Listings */}
            {!loading && !error && filteredJobs.length > 0 && (
              <div className="space-y-6" role="list" aria-live="polite">
                {filteredJobs.map((job) => (
                  <div key={job.id} role="listitem">
                  <JobCard
                    job={job}
                    onApply={handleApply}
                  />
                  </div>
                ))}
              </div>
            )}
          </section>
            </div>
          </div>
        </section>
      )}

      {/* Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitApplication}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 JobBoard Platform. Built with Next.js and Tailwind CSS.</p>
            <p className="mt-2 text-sm">
              Find your dream job with our interactive job board platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}