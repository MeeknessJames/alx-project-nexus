import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const applicationData = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'coverLetter', 'jobId'];
    for (const field of requiredFields) {
      if (!applicationData[field] || applicationData[field].trim() === '') {
        return NextResponse.json(
          { 
            success: false, 
            error: `${field} is required` 
          },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Validate cover letter length
    if (applicationData.coverLetter.length < 50) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Cover letter must be at least 50 characters' 
        },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate application ID
    const applicationId = `APP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const response = {
      success: true,
      applicationId,
      message: 'Application submitted successfully',
      data: {
        id: applicationId,
        ...applicationData,
        appliedAt: new Date().toISOString(),
        status: 'pending'
      }
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Failed to submit application' 
      },
      { status: 500 }
    );
  }
}
