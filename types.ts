export interface PlayerProfile {
  name: string;
  age: number;
  style: 'Aggressive' | 'Counter' | 'Defensive';
  level: 'Amateur' | 'Intermediate' | 'Pro';
  country: string;
}

export interface PlayerStats {
  aggressionIndex: number; // 0-100
  rallyPatience: number; // 0-100
  netCoverage: number; // 0-100
  ranking: number;
  improvementTime: string;
  aiSummary: string;
}

export interface MatchData {
  compatibility: number;
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme';
  balance: string;
  prediction: string;
}

export enum SectionId {
  INTRO = 'intro',
  PASSPORT = 'passport',
  MATCHMAKING = 'matchmaking',
  RANKING = 'ranking',
  COACHING = 'coaching',
  TIMELINE = 'timeline',
  REPORT = 'report',
  SOCIAL = 'social',
  FINAL = 'final'
}