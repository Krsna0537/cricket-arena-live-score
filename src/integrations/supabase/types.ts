export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ball_by_ball: {
        Row: {
          ball_number: number
          batsman_id: string
          bowler_id: string
          commentary: string | null
          created_at: string
          extra_runs: number | null
          extra_type: Database["public"]["Enums"]["extra_type"] | null
          fielder_id: string | null
          id: string
          innings_id: string
          is_extra: boolean
          is_wicket: boolean
          over_number: number
          player_out_id: string | null
          runs: number
          wicket_type: Database["public"]["Enums"]["dismissal_type"] | null
        }
        Insert: {
          ball_number: number
          batsman_id: string
          bowler_id: string
          commentary?: string | null
          created_at?: string
          extra_runs?: number | null
          extra_type?: Database["public"]["Enums"]["extra_type"] | null
          fielder_id?: string | null
          id?: string
          innings_id: string
          is_extra?: boolean
          is_wicket?: boolean
          over_number: number
          player_out_id?: string | null
          runs?: number
          wicket_type?: Database["public"]["Enums"]["dismissal_type"] | null
        }
        Update: {
          ball_number?: number
          batsman_id?: string
          bowler_id?: string
          commentary?: string | null
          created_at?: string
          extra_runs?: number | null
          extra_type?: Database["public"]["Enums"]["extra_type"] | null
          fielder_id?: string | null
          id?: string
          innings_id?: string
          is_extra?: boolean
          is_wicket?: boolean
          over_number?: number
          player_out_id?: string | null
          runs?: number
          wicket_type?: Database["public"]["Enums"]["dismissal_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "ball_by_ball_batsman_id_fkey"
            columns: ["batsman_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ball_by_ball_bowler_id_fkey"
            columns: ["bowler_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ball_by_ball_fielder_id_fkey"
            columns: ["fielder_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ball_by_ball_innings_id_fkey"
            columns: ["innings_id"]
            isOneToOne: false
            referencedRelation: "innings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ball_by_ball_player_out_id_fkey"
            columns: ["player_out_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      batting_performances: {
        Row: {
          balls: number
          bowler_id: string | null
          created_at: string
          dismissal_type: Database["public"]["Enums"]["dismissal_type"] | null
          fielder_id: string | null
          fours: number
          id: string
          innings_id: string
          player_id: string
          runs: number
          sixes: number
          strike_rate: number
          updated_at: string
        }
        Insert: {
          balls?: number
          bowler_id?: string | null
          created_at?: string
          dismissal_type?: Database["public"]["Enums"]["dismissal_type"] | null
          fielder_id?: string | null
          fours?: number
          id?: string
          innings_id: string
          player_id: string
          runs?: number
          sixes?: number
          strike_rate?: number
          updated_at?: string
        }
        Update: {
          balls?: number
          bowler_id?: string | null
          created_at?: string
          dismissal_type?: Database["public"]["Enums"]["dismissal_type"] | null
          fielder_id?: string | null
          fours?: number
          id?: string
          innings_id?: string
          player_id?: string
          runs?: number
          sixes?: number
          strike_rate?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "batting_performances_bowler_id_fkey"
            columns: ["bowler_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batting_performances_fielder_id_fkey"
            columns: ["fielder_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batting_performances_innings_id_fkey"
            columns: ["innings_id"]
            isOneToOne: false
            referencedRelation: "innings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batting_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      bowling_performances: {
        Row: {
          created_at: string
          economy: number
          id: string
          innings_id: string
          maidens: number
          no_balls: number
          overs: number
          player_id: string
          runs: number
          updated_at: string
          wickets: number
          wides: number
        }
        Insert: {
          created_at?: string
          economy?: number
          id?: string
          innings_id: string
          maidens?: number
          no_balls?: number
          overs?: number
          player_id: string
          runs?: number
          updated_at?: string
          wickets?: number
          wides?: number
        }
        Update: {
          created_at?: string
          economy?: number
          id?: string
          innings_id?: string
          maidens?: number
          no_balls?: number
          overs?: number
          player_id?: string
          runs?: number
          updated_at?: string
          wickets?: number
          wides?: number
        }
        Relationships: [
          {
            foreignKeyName: "bowling_performances_innings_id_fkey"
            columns: ["innings_id"]
            isOneToOne: false
            referencedRelation: "innings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bowling_performances_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      fall_of_wickets: {
        Row: {
          created_at: string
          id: string
          innings_id: string
          overs: number
          player_id: string
          score: number
          wicket_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          innings_id: string
          overs: number
          player_id: string
          score: number
          wicket_number: number
        }
        Update: {
          created_at?: string
          id?: string
          innings_id?: string
          overs?: number
          player_id?: string
          score?: number
          wicket_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "fall_of_wickets_innings_id_fkey"
            columns: ["innings_id"]
            isOneToOne: false
            referencedRelation: "innings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fall_of_wickets_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      innings: {
        Row: {
          created_at: string
          extras_byes: number
          extras_leg_byes: number
          extras_no_balls: number
          extras_penalty: number
          extras_wides: number
          id: string
          innings_number: number
          match_id: string
          status: string
          team_id: string
          total_overs: number
          total_runs: number
          total_wickets: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          extras_byes?: number
          extras_leg_byes?: number
          extras_no_balls?: number
          extras_penalty?: number
          extras_wides?: number
          id?: string
          innings_number: number
          match_id: string
          status: string
          team_id: string
          total_overs?: number
          total_runs?: number
          total_wickets?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          extras_byes?: number
          extras_leg_byes?: number
          extras_no_balls?: number
          extras_penalty?: number
          extras_wides?: number
          id?: string
          innings_number?: number
          match_id?: string
          status?: string
          team_id?: string
          total_overs?: number
          total_runs?: number
          total_wickets?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "innings_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "innings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string
          id: string
          man_of_match: string | null
          match_date: string
          match_time: string
          referee: string | null
          result: string | null
          status: Database["public"]["Enums"]["match_status"]
          team1_id: string
          team2_id: string
          toss_decision: string | null
          toss_winner: string | null
          tournament_id: string
          umpires: string[] | null
          updated_at: string
          venue: string
          winner_team_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          man_of_match?: string | null
          match_date: string
          match_time: string
          referee?: string | null
          result?: string | null
          status?: Database["public"]["Enums"]["match_status"]
          team1_id: string
          team2_id: string
          toss_decision?: string | null
          toss_winner?: string | null
          tournament_id: string
          umpires?: string[] | null
          updated_at?: string
          venue: string
          winner_team_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          man_of_match?: string | null
          match_date?: string
          match_time?: string
          referee?: string | null
          result?: string | null
          status?: Database["public"]["Enums"]["match_status"]
          team1_id?: string
          team2_id?: string
          toss_decision?: string | null
          toss_winner?: string | null
          tournament_id?: string
          umpires?: string[] | null
          updated_at?: string
          venue?: string
          winner_team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_man_of_match_fkey"
            columns: ["man_of_match"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team1_id_fkey"
            columns: ["team1_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team2_id_fkey"
            columns: ["team2_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_toss_winner_fkey"
            columns: ["toss_winner"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_team_id_fkey"
            columns: ["winner_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          match_id: string | null
          message: string
          read: boolean
          title: string
          tournament_id: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          match_id?: string | null
          message: string
          read?: boolean
          title: string
          tournament_id?: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          created_at?: string
          id?: string
          match_id?: string | null
          message?: string
          read?: boolean
          title?: string
          tournament_id?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          avatar_url: string | null
          batting_style: Database["public"]["Enums"]["batting_style"]
          bowling_style: Database["public"]["Enums"]["bowling_style"] | null
          created_at: string
          date_of_birth: string | null
          id: string
          jersey_number: number
          name: string
          role: Database["public"]["Enums"]["player_role"]
          team_id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          batting_style: Database["public"]["Enums"]["batting_style"]
          bowling_style?: Database["public"]["Enums"]["bowling_style"] | null
          created_at?: string
          date_of_birth?: string | null
          id?: string
          jersey_number: number
          name: string
          role: Database["public"]["Enums"]["player_role"]
          team_id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          batting_style?: Database["public"]["Enums"]["batting_style"]
          bowling_style?: Database["public"]["Enums"]["bowling_style"] | null
          created_at?: string
          date_of_birth?: string | null
          id?: string
          jersey_number?: number
          name?: string
          role?: Database["public"]["Enums"]["player_role"]
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          coach: string | null
          created_at: string
          id: string
          logo_url: string | null
          name: string
          short_name: string
          tournament_id: string
          updated_at: string
        }
        Insert: {
          coach?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          short_name: string
          tournament_id: string
          updated_at?: string
        }
        Update: {
          coach?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          short_name?: string
          tournament_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_date: string
          format: Database["public"]["Enums"]["tournament_format"]
          id: string
          location: string
          logo_url: string | null
          name: string
          start_date: string
          status: Database["public"]["Enums"]["tournament_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_date: string
          format: Database["public"]["Enums"]["tournament_format"]
          id?: string
          location: string
          logo_url?: string | null
          name: string
          start_date: string
          status?: Database["public"]["Enums"]["tournament_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string
          format?: Database["public"]["Enums"]["tournament_format"]
          id?: string
          location?: string
          logo_url?: string | null
          name?: string
          start_date?: string
          status?: Database["public"]["Enums"]["tournament_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournaments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      batting_style: "right-handed" | "left-handed"
      bowling_style:
        | "right-arm fast"
        | "right-arm medium"
        | "right-arm off-spin"
        | "right-arm leg-spin"
        | "left-arm fast"
        | "left-arm medium"
        | "left-arm orthodox"
        | "left-arm unorthodox"
      dismissal_type:
        | "bowled"
        | "caught"
        | "lbw"
        | "run out"
        | "stumped"
        | "hit wicket"
        | "retired hurt"
        | "not out"
      extra_type: "wide" | "no-ball" | "bye" | "leg-bye" | "penalty"
      match_status: "scheduled" | "live" | "completed" | "abandoned"
      notification_type:
        | "match_start"
        | "wicket"
        | "boundary"
        | "milestone"
        | "innings_end"
        | "match_end"
        | "match_update"
      player_role: "batsman" | "bowler" | "all-rounder" | "wicket-keeper"
      tournament_format: "T20" | "ODI" | "Test" | "T10" | "Custom"
      tournament_status: "upcoming" | "ongoing" | "completed"
      user_role: "admin" | "scorer" | "team_manager" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      batting_style: ["right-handed", "left-handed"],
      bowling_style: [
        "right-arm fast",
        "right-arm medium",
        "right-arm off-spin",
        "right-arm leg-spin",
        "left-arm fast",
        "left-arm medium",
        "left-arm orthodox",
        "left-arm unorthodox",
      ],
      dismissal_type: [
        "bowled",
        "caught",
        "lbw",
        "run out",
        "stumped",
        "hit wicket",
        "retired hurt",
        "not out",
      ],
      extra_type: ["wide", "no-ball", "bye", "leg-bye", "penalty"],
      match_status: ["scheduled", "live", "completed", "abandoned"],
      notification_type: [
        "match_start",
        "wicket",
        "boundary",
        "milestone",
        "innings_end",
        "match_end",
        "match_update",
      ],
      player_role: ["batsman", "bowler", "all-rounder", "wicket-keeper"],
      tournament_format: ["T20", "ODI", "Test", "T10", "Custom"],
      tournament_status: ["upcoming", "ongoing", "completed"],
      user_role: ["admin", "scorer", "team_manager", "viewer"],
    },
  },
} as const
