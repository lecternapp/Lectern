import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check server embedding service status
    let serverActive = false;
    let serverError = null;
    let isDbError = false;
    
    try {
      const serverResponse = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:8000'}/status`, {
        method: 'GET',
        timeout: 5000, // 5 second timeout
      });
      
      const serverData = await serverResponse.json();
      serverActive = serverData.embedding_service_active;
      serverError = serverData.error;
      isDbError = serverData.is_db_error;
    } catch (serverError) {
      console.error('Server embedding service check failed:', serverError);
    }
    
    // Check local embedding service status
    let localActive = false;
    try {
      const localResponse = await fetch(`${process.env.NEXT_PUBLIC_EMBEDDING_SERVICE_URL || 'http://localhost:11434'}/api/embeddings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'nomic-embed-text',
          prompt: 'test'
        }),
        timeout: 5000, // 5 second timeout
      });
      
      localActive = localResponse.ok;
    } catch (localError) {
      console.error('Local embedding service check failed:', localError);
    }

    return NextResponse.json({
      embedding_service_active: serverActive || localActive,
      server_active: serverActive,
      local_active: localActive,
      status: serverActive || localActive ? 'active' : 'inactive',
      error: serverError,
      is_db_error: isDbError
    });
  } catch (error) {
    console.error('Embedding service status check failed:', error);
    // If there's any error connecting to the embedding service, consider it inactive
    return NextResponse.json({
      embedding_service_active: false,
      server_active: false,
      local_active: false,
      status: 'inactive',
      error: error.message,
      is_db_error: false
    });
  }
} 