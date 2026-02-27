import type { SentimentResult } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export const analyzeText = async (text: string): Promise<SentimentResult> => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to analyze text');
  }

  return response.json();
};

export const getHistory = async (): Promise<SentimentResult[]> => {
  const response = await fetch(`${API_BASE_URL}/history`);

  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }

  return response.json();
};

export const deleteHistoryItem = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/history/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete history item');
  }
};

export const clearHistory = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/history`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to clear history');
  }
};
