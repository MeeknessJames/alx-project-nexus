import { NextResponse } from 'next/server';
import { mockJobs } from '@/data/mockJobs';

export async function GET(request) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const experienceLevel = searchParams.get('experienceLevel');
    const remote = searchParams.get('remote');
    const search = searchParams.get('search');

    let filteredJobs = [...mockJobs];

    // Apply filters
    if (category && category !== 'All Categories') {
      filteredJobs = filteredJobs.filter(job => job.category === category);
    }

    if (location && location !== 'All Locations') {
      if (location === 'Remote') {
        filteredJobs = filteredJobs.filter(job => job.remote === true);
      } else {
        filteredJobs = filteredJobs.filter(job => job.location === location);
      }
    }

    if (experienceLevel && experienceLevel !== 'All Levels') {
      filteredJobs = filteredJobs.filter(job => job.experienceLevel === experienceLevel);
    }

    if (remote === 'true') {
      filteredJobs = filteredJobs.filter(job => job.remote === true);
    }

    if (search && search.trim()) {
      const searchTerm = search.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredJobs,
      total: filteredJobs.length
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Failed to fetch jobs' 
      },
      { status: 500 }
    );
  }
}
