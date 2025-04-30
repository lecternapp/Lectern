'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Database } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function EmbeddingStatus() {
  const [status, setStatus] = useState({
    server: null,
    local: null,
    loading: true,
    error: null,
    isDbError: false
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Check server status
        const serverResponse = await fetch('/api/status');
        const serverData = await serverResponse.json();
        
        // Check local status (using the same endpoint but with a different URL)
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
          });
          
          localActive = localResponse.ok;
        } catch (localError) {
          console.error('Local embedding service check failed:', localError);
        }
        
        setStatus({
          server: serverData.embedding_service_active,
          local: localActive,
          loading: false,
          error: serverData.error,
          isDbError: serverData.is_db_error
        });
      } catch (error) {
        console.error('Error checking embedding service status:', error);
        setStatus({
          server: false,
          local: false,
          loading: false,
          error: error.message,
          isDbError: false
        });
      }
    };

    checkStatus();
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (status.loading) {
    return null;
  }

  // If either server or local is active, don't show any warning
  if (status.server || status.local) {
    return null;
  }

  // If there's a database error, show a specific warning
  if (status.isDbError) {
    return (
      <Alert variant="destructive" className="mb-4">
        <Database className="h-4 w-4" />
        <AlertTitle>Database Connection Error</AlertTitle>
        <AlertDescription>
          There is an issue connecting to the database. The embedding service may not work properly. Please contact support if this persists.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Note: Embedding Service Not Active</AlertTitle>
      <AlertDescription>
        Some features such as chat and recommendations may be affected. Coming soon!
      </AlertDescription>
    </Alert>
  );
} 