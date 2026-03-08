export interface SentimentResult {
  id: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  timestamp: number;
  feedback?: 'positive' | 'negative' | 'none';
}

export type ServiceStatus = 'checking' | 'online' | 'offline';

export interface FlaskStatus {
  status: 'online' | 'warning' | 'offline';
  message?: string;
}

export type FlaskState = FlaskStatus | { status: 'checking' };

