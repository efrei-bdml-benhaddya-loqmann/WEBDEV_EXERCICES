import type { SentimentResult } from '../types';

const API_BASE_URL = 'http://localhost:3000';


// Generic request builder
const requestBuilder = async <T>(
  endpoint: string,
  options: RequestInit = {},
  errorMessage = 'An error occurred'
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      // Fallback if response is not JSON
    }
    throw new Error(errorData?.error || errorMessage);
  }

  if (response.status === 204) { // nothing content to send
    return undefined as T; // keep the promise type
  }

  return response.json();
};

export const analyzeText = async (text: string): Promise<SentimentResult> => {
  return requestBuilder<SentimentResult>(
    '/analyze',
    {
      method: 'POST',
      body: JSON.stringify({ text }),
    },
    'Failed to analyze text'
  );
};

export const getHistory = async (): Promise<SentimentResult[]> => {
  return requestBuilder<SentimentResult[]>('/history', {}, 'Failed to fetch history');
};

export const deleteHistoryItem = async (id: string): Promise<void> => {
  return requestBuilder<void>(
    `/history/${id}`,
    { method: 'DELETE' },
    'Failed to delete history item'
  );
};

export const clearHistory = async (): Promise<void> => {
  return requestBuilder<void>(
    '/history',
    { method: 'DELETE' },
    'Failed to clear history'
  );
};
