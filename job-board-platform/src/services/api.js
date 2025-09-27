const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export class APIError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.response = response;
  }
}

export const apiService = {
  /**
   * Fetch all jobs from the API
   */
  async fetchJobs() {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new APIError(
          `Failed to fetch jobs: ${response.statusText}`,
          response.status,
          errorText
        );
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Network error: ${error.message}`, 0);
    }
  },

  /**
   * Apply for a job
   */
  async applyForJob(applicationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new APIError(
          `Failed to submit application: ${response.statusText}`,
          response.status,
          errorText
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Network error: ${error.message}`, 0);
    }
  }
};
