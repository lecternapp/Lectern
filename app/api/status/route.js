import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Try to connect to the embedding service
    const response = await fetch(`${process.env.EMBEDDING_SERVICE_URL}/health`, {
      method: 'GET',
      timeout: 5000, // 5 second timeout
    });
    
    const isActive = response.ok;

    return NextResponse.json({
      embedding_service_active: isActive,
      status: isActive ? 'active' : 'inactive'
    });
  } catch (error) {
    // If there's any error connecting to the embedding service, consider it inactive
    return NextResponse.json({
      embedding_service_active: false,
      status: 'inactive'
    });
  }
} 