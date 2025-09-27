'use client';

import { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Calendar, ExternalLink } from 'lucide-react';

const JobCard = ({ job, onApply }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCompactDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getExperienceColor = (level) => {
    switch (level) {
      case 'Entry-Level':
        return 'bg-green-100 text-green-800';
      case 'Mid-Level':
        return 'bg-blue-100 text-blue-800';
      case 'Senior':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              <span className="sr-only">Job Title: </span>
              {job.title}
            </h3>
            <p className="text-lg text-gray-600 mb-2">
              <span className="sr-only">Company: </span>
              {job.company}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getExperienceColor(job.experienceLevel)}`} aria-label={`Experience level: ${job.experienceLevel}`}>
              {job.experienceLevel}
            </span>
            {job.remote && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full" aria-label="Remote work available">
                Remote
              </span>
            )}
          </div>
        </div>

        {/* Job Details */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
          <div className="flex items-center text-gray-600 text-sm min-w-0">
            <dt className="sr-only">Location</dt>
            <dd className="flex items-center min-w-0">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{job.location}</span>
            </dd>
          </div>
          <div className="flex items-center text-gray-600 text-sm min-w-0">
            <dt className="sr-only">Salary</dt>
            <dd className="flex items-center min-w-0">
              <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{job.salary}</span>
            </dd>
          </div>
          <div className="flex items-center text-gray-600 text-sm min-w-0">
            <dt className="sr-only">Job Type</dt>
            <dd className="flex items-center min-w-0">
              <Clock className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{job.type}</span>
            </dd>
          </div>
          <div className="flex items-center text-gray-600 text-sm min-w-0">
            <dt className="sr-only">Posted Date</dt>
            <dd className="flex items-center min-w-0">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
              <span className="truncate overflow-hidden" style={{ maxWidth: '100%' }}>
                {formatCompactDate(job.postedDate)}
              </span>
            </dd>
          </div>
        </dl>

        {/* Description */}
        <p className="text-gray-700 mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Category */}
        <div className="mb-4">
          <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full" aria-label={`Job category: ${job.category}`}>
            {job.category}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center text-sm"
            aria-expanded={showDetails}
            aria-controls={`job-details-${job.id}`}
            aria-describedby={`${job.id}-toggle-help`}
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          <div id={`${job.id}-toggle-help`} className="sr-only">
            Toggle detailed job information including requirements and benefits
          </div>
          <button
            onClick={() => onApply(job)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center text-sm font-medium"
            aria-describedby={`${job.id}-apply-help`}
          >
            <ExternalLink className="h-4 w-4 mr-2 sm:mr-1" aria-hidden="true" />
            Apply Now
          </button>
          <div id={`${job.id}-apply-help`} className="sr-only">
            Apply for {job.title} at {job.company}
          </div>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div id={`job-details-${job.id}`} className="mt-6 pt-6 border-t border-gray-200" role="region" aria-label="Detailed job information">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Requirements */}
              <section>
                <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                <ul className="space-y-2" role="list">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2" aria-hidden="true">•</span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Benefits */}
              <section>
                <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                <ul className="space-y-2" role="list">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2" aria-hidden="true">•</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Application Deadline */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md" role="complementary" aria-label="Application deadline information">
              <p className="text-sm text-yellow-800">
                <strong>Application Deadline:</strong> <time dateTime={job.applicationDeadline}>{formatDate(job.applicationDeadline)}</time>
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default JobCard;

