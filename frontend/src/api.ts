export function getApiBaseUrl(): string {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://codeflow-192p.onrender.com';
  }
  return 'http://localhost:8080';
}

export async function executeCode(code: string, language: string = 'python', inputs: string[] = []): Promise<{
  steps?: Array<{
    line: number;
    code: string;
    variables: Record<string, unknown>;
  }>;
  error?: string;
}> {
  const token = localStorage.getItem('codeflow_token');
  const primaryUrl = getApiBaseUrl();
  const fallbackUrl = 'https://codeflow-192p.onrender.com';

  const urlsToTry = [primaryUrl];
  if (primaryUrl !== fallbackUrl) {
    urlsToTry.push(fallbackUrl);
  }

  let lastError = '';

  for (const baseUrl of urlsToTry) {
    try {
      const response = await fetch(`${baseUrl}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ code, language, inputs }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        if (response.status >= 500) {
          throw new Error('Backend server is restarting on Render. Please click Run again in a few seconds.');
        }
        throw new Error('Received unexpected response from server. Please try again.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to execute code');
      }

      return data;
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Failed to connect to the server';
      // If it's a code/server error response rather than a network connection failure, don't try fallback
      if (lastError !== 'Failed to fetch' && !lastError.includes('NetworkError') && !lastError.includes('fetch')) {
        return { error: lastError };
      }
    }
  }

  return {
    error: 'Failed to connect to backend server. Please make sure the backend is running (run run-backend.bat or "cd backend && go run .") or try again in a few seconds.',
  };
}
