
import { Database } from './types';

// Profiles table
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// Tournaments table
export type Tournament = Database['public']['Tables']['tournaments']['Row'];
export type TournamentInsert = Database['public']['Tables']['tournaments']['Insert'];
export type TournamentUpdate = Database['public']['Tables']['tournaments']['Update'];

// Teams table
export type Team = Database['public']['Tables']['teams']['Row'];
export type TeamInsert = Database['public']['Tables']['teams']['Insert'];
export type TeamUpdate = Database['public']['Tables']['teams']['Update'];

// Players table
export type Player = Database['public']['Tables']['players']['Row'];
export type PlayerInsert = Database['public']['Tables']['players']['Insert'];
export type PlayerUpdate = Database['public']['Tables']['players']['Update'];

// Matches table
export type Match = Database['public']['Tables']['matches']['Row'];
export type MatchInsert = Database['public']['Tables']['matches']['Insert'];
export type MatchUpdate = Database['public']['Tables']['matches']['Update'];

// Innings table
export type Innings = Database['public']['Tables']['innings']['Row'];
export type InningsInsert = Database['public']['Tables']['innings']['Insert'];
export type InningsUpdate = Database['public']['Tables']['innings']['Update'];

// Batting Performances table
export type BattingPerformance = Database['public']['Tables']['batting_performances']['Row'];
export type BattingPerformanceInsert = Database['public']['Tables']['batting_performances']['Insert'];
export type BattingPerformanceUpdate = Database['public']['Tables']['batting_performances']['Update'];

// Bowling Performances table
export type BowlingPerformance = Database['public']['Tables']['bowling_performances']['Row'];
export type BowlingPerformanceInsert = Database['public']['Tables']['bowling_performances']['Insert'];
export type BowlingPerformanceUpdate = Database['public']['Tables']['bowling_performances']['Update'];

// Fall of Wickets table
export type FallOfWicket = Database['public']['Tables']['fall_of_wickets']['Row'];
export type FallOfWicketInsert = Database['public']['Tables']['fall_of_wickets']['Insert'];
export type FallOfWicketUpdate = Database['public']['Tables']['fall_of_wickets']['Update'];

// Ball by Ball table
export type BallByBall = Database['public']['Tables']['ball_by_ball']['Row'];
export type BallByBallInsert = Database['public']['Tables']['ball_by_ball']['Insert'];
export type BallByBallUpdate = Database['public']['Tables']['ball_by_ball']['Update'];

// Notifications table
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert'];
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update'];

// Enum types
export type UserRole = Database['public']['Enums']['user_role'];
export type TournamentFormat = Database['public']['Enums']['tournament_format'];
export type TournamentStatus = Database['public']['Enums']['tournament_status'];
export type MatchStatus = Database['public']['Enums']['match_status'];
export type PlayerRole = Database['public']['Enums']['player_role'];
export type BattingStyle = Database['public']['Enums']['batting_style'];
export type BowlingStyle = Database['public']['Enums']['bowling_style'];
export type DismissalType = Database['public']['Enums']['dismissal_type'];
export type ExtraType = Database['public']['Enums']['extra_type'];
export type NotificationType = Database['public']['Enums']['notification_type'];
