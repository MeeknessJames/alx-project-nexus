'use client';

import { useState } from 'react';
import { X, Upload, User, Mail, Phone, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const JobApplicationModal = ({ job, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      setErrors(prev => ({
        ...prev,
        resume: ''
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        resume: 'Please upload a PDF file'
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = 'Cover letter must be at least 50 characters';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const application = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resumeFileName: formData.resume?.name || null,
        appliedAt: new Date().toISOString()
      };

      const result = await onSubmit(application);
      
      if (result && result.success) {
        setIsSubmitted(true);
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            coverLetter: '',
            resume: null
          });
          setIsSubmitted(false);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null
      });
      setErrors({});
      setIsSubmitted(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto focus-trap">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200" id="modal-header">
          <div>
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900">Apply for Position</h2>
            <p className="text-gray-600">{job.title} at {job.company}</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="p-6 bg-green-50 border-b border-green-200">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-green-800">Application Submitted!</h3>
                <p className="text-green-700">Thank you for your interest. We&apos;ll review your application and get back to you soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {errors.submit && (
          <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Submission Error</h3>
                <p className="text-sm text-red-700 mt-1">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.firstName ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-invalid={errors.firstName ? 'true' : 'false'}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              />
              {errors.firstName && (
                <p id="firstName-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.lastName ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-invalid={errors.lastName ? 'true' : 'false'}
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              />
              {errors.lastName && (
                <p id="lastName-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Resume Upload */}
          <div className="mb-6">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="h-4 w-4 inline mr-1" />
              Resume (PDF only) *
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={handleFileChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.resume ? 'border-red-300' : 'border-gray-300'
              }`}
              aria-invalid={errors.resume ? 'true' : 'false'}
              aria-describedby={errors.resume ? 'resume-error' : undefined}
            />
            {errors.resume && (
              <p id="resume-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.resume}
              </p>
            )}
            {formData.resume && (
              <p className="mt-1 text-sm text-green-600">
                Selected: {formData.resume.name}
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div className="mb-6">
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              Cover Letter *
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={6}
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.coverLetter ? 'border-red-300' : 'border-gray-300'
              }`}
              aria-invalid={errors.coverLetter ? 'true' : 'false'}
              aria-describedby={errors.coverLetter ? 'coverLetter-error' : undefined}
            />
            {errors.coverLetter && (
              <p id="coverLetter-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.coverLetter}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.coverLetter.length}/50 characters minimum
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationModal;

