
export type UserRole = 'admin' | 'scorer' | 'team_manager' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type TournamentFormat = 'T20' | 'ODI' | 'Test' | 'T10' | 'Custom';

export interface Tournament {
  id: string;
  name: string;
  format: TournamentFormat;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  logoUrl?: string;
  teams: Team[];
  matches: Match[];
  createdBy: string; // User ID
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  players: Player[];
  captain?: string; // Player ID
  coach?: string;
  tournamentId: string;
}

export type PlayerRole = 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
export type BattingStyle = 'right-handed' | 'left-handed';
export type BowlingStyle = 
  | 'right-arm fast' 
  | 'right-arm medium' 
  | 'right-arm off-spin' 
  | 'right-arm leg-spin' 
  | 'left-arm fast' 
  | 'left-arm medium' 
  | 'left-arm orthodox' 
  | 'left-arm unorthodox';

export interface Player {
  id: string;
  name: string;
  jerseyNumber: number;
  role: PlayerRole;
  battingStyle: BattingStyle;
  bowlingStyle?: BowlingStyle;
  dateOfBirth?: string;
  avatarUrl?: string;
  teamId: string;
  stats?: PlayerStats;
}

export interface PlayerStats {
  matches: number;
  runs: number;
  highestScore: number;
  average: number;
  strikeRate: number;
  fifties: number;
  hundreds: number;
  wickets: number;
  bestBowling: string;
  bowlingAverage?: number;
  economy?: number;
}

export interface Match {
  id: string;
  tournamentId: string;
  team1Id: string;
  team2Id: string;
  venue: string;
  date: string;
  time: string;
  status: 'scheduled' | 'live' | 'completed' | 'abandoned';
  tossWinner?: string; // Team ID
  tossDecision?: 'bat' | 'bowl';
  result?: string;
  winnerTeamId?: string;
  umpires?: string[];
  referee?: string;
  innings: Innings[];
  manOfTheMatch?: string; // Player ID
}

export interface Innings {
  id: string;
  matchId: string;
  teamId: string;
  number: 1 | 2;
  totalRuns: number;
  totalWickets: number;
  totalOvers: number;
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
    penalty: number;
  };
  batting: BattingPerformance[];
  bowling: BowlingPerformance[];
  fallOfWickets: FallOfWicket[];
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface BattingPerformance {
  playerId: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  dismissalType?: 'bowled' | 'caught' | 'lbw' | 'run out' | 'stumped' | 'hit wicket' | 'retired hurt' | 'not out';
  bowlerId?: string;
  fielderId?: string;
  strikeRate: number;
}

export interface BowlingPerformance {
  playerId: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  wides: number;
  noBalls: number;
}

export interface FallOfWicket {
  wicketNumber: number;
  score: number;
  overs: number;
  playerId: string;
}

export interface BallByBall {
  id: string;
  matchId: string;
  inningsId: string;
  over: number;
  ball: number;
  batsmanId: string;
  bowlerId: string;
  runs: number;
  isExtra: boolean;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'penalty';
  extraRuns?: number;
  isWicket: boolean;
  wicketType?: 'bowled' | 'caught' | 'lbw' | 'run out' | 'stumped' | 'hit wicket';
  playerId?: string; // Out batsman ID
  fielderId?: string;
  commentary?: string;
}

export interface Commentary {
  id: string;
  matchId: string;
  inningsId: string;
  over: number;
  ball: number;
  text: string;
  timestamp: string;
  isWicket: boolean;
  isBoundary: boolean;
  isSix: boolean;
}

export interface Notification {
  id: string;
  tournamentId?: string;
  matchId?: string;
  type: 'match_start' | 'wicket' | 'boundary' | 'milestone' | 'innings_end' | 'match_end' | 'match_update';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
