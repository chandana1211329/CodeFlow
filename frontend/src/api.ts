export function getApiBaseUrl(): string {
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (import.meta.env.VITE_API_URL) {
    const envUrl = import.meta.env.VITE_API_URL;
    const isEnvLocalhost = envUrl.includes('localhost') || envUrl.includes('127.0.0.1');
    // If not running locally, ignore localhost VITE_API_URL so deployed sites hit Render backend
    if (!isEnvLocalhost || isLocalhost) {
      return envUrl;
    }
  }

  if (!isLocalhost) {
    return 'https://codeflow-192p.onrender.com';
  }

  return 'http://localhost:8080';
}

export async function executeCode(
  code: string,
  language: string = 'python',
  inputs: string[] = []
): Promise<{
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
    // Try up to 2 attempts per URL (in case Render is sleeping/waking up)
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await fetch(`${baseUrl}/execute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
        const isNetworkErr = lastError === 'Failed to fetch' || lastError.includes('NetworkError') || lastError.includes('fetch');

        // If it's a server response error (not network error), return it immediately
        if (!isNetworkErr) {
          return { error: lastError };
        }

        // If network error on attempt 1, wait 2 seconds before retrying (Render cold start)
        if (attempt === 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    }
  }

  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocalhost) {
    return {
      error: 'Failed to connect to local backend server (http://localhost:8080). Please ensure backend is running via run-backend.bat.',
    };
  }

  return {
    error: 'Backend server is waking up on Render (free tier takes 15-30s to start from sleep). Please wait a few seconds and click Run again.',
  };
}
