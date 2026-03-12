import type { FlaskStatus, SentimentResult } from '../types';
import { supabase } from './supabase';

const API_URL = import.meta.env.EXPRESS_API_URL;

export const API_BASE_URL = `${API_URL}`;


// Generic request builder
const requestBuilder = async <T>(
  endpoint: string,
  options: RequestInit = {},
  errorMessage = 'An error occurred'
): Promise<T> => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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

export const updateHistoryItem = async (
  id: string,
  updates: Partial<SentimentResult>
): Promise<SentimentResult> => {
  return requestBuilder<SentimentResult>(
    `/history/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(updates),
    },
    'Failed to update history item'
  );
};

export const clearHistory = async (): Promise<void> => {
  return requestBuilder<void>(
    '/history',
    { method: 'DELETE' },
    'Failed to clear history'
  );
};

export const checkExpressApiStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const checkFlaskApiStatus = async (): Promise<FlaskStatus> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health/analyzer`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'warning') {
        return { status: 'warning', message: data.message };
      }
      return { status: 'online' };
    }
    return { status: 'offline' };
  } catch {
    return { status: 'offline' };
  }
};

export const checkSupabaseStatus = async (): Promise<boolean> => {
  try {
    // A lightweight check that doesn't strictly depend on user login
    const { error } = await supabase.auth.getSession();
    return !error;
  } catch {
    return false;
  }
};

export const getInferenceMode = async (): Promise<{ mode: 'local' | 'huggingface' }> => {
  return requestBuilder<{ mode: 'local' | 'huggingface' }>(
    '/config/inference',
    {},
    'Failed to get inference mode'
  );
};

export const updateInferenceMode = async (mode: 'local' | 'huggingface'): Promise<{ status: string, mode: string }> => {
  return requestBuilder<{ status: string, mode: string }>(
    '/config/inference',
    {
      method: 'POST',
      body: JSON.stringify({ mode }),
    },
    'Failed to update inference mode'
  );
};
