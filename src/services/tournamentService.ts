
import { supabase } from '@/integrations/supabase/client';
import { 
  Tournament, 
  TournamentInsert, 
  TournamentUpdate,
  Team,
  Player,
  Match 
} from '@/integrations/supabase/database.types';

// Fetch all tournaments
export const fetchTournaments = async (): Promise<Tournament[]> => {
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching tournaments:', error);
    throw error;
  }

  return data || [];
};

// Fetch a tournament by ID
export const fetchTournamentById = async (id: string): Promise<Tournament> => {
  const { data, error } = await supabase
    .from('tournaments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching tournament by ID:', error);
    throw error;
  }

  return data;
};

// Create a new tournament
export const createTournament = async (tournament: TournamentInsert): Promise<Tournament> => {
  const { data, error } = await supabase
    .from('tournaments')
    .insert(tournament)
    .select()
    .single();

  if (error) {
    console.error('Error creating tournament:', error);
    throw error;
  }

  return data;
};

// Update a tournament
export const updateTournament = async (id: string, updates: TournamentUpdate): Promise<Tournament> => {
  const { data, error } = await supabase
    .from('tournaments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating tournament:', error);
    throw error;
  }

  return data;
};

// Delete a tournament
export const deleteTournament = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('tournaments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting tournament:', error);
    throw error;
  }
};

// Fetch teams for a specific tournament
export const fetchTeamsByTournament = async (tournamentId: string): Promise<Team[]> => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('tournament_id', tournamentId);

  if (error) {
    console.error('Error fetching teams by tournament:', error);
    throw error;
  }

  return data || [];
};

// Fetch matches for a specific tournament
export const fetchMatchesByTournament = async (tournamentId: string): Promise<Match[]> => {
  const { data, error } = await supabase
    .from('matches')
    .select('*, team1:team1_id(*), team2:team2_id(*)')
    .eq('tournament_id', tournamentId);

  if (error) {
    console.error('Error fetching matches by tournament:', error);
    throw error;
  }

  return data || [];
};

// Fetch players for a specific tournament
export const fetchPlayersByTournament = async (tournamentId: string): Promise<Player[]> => {
  const { data, error } = await supabase
    .from('players')
    .select('*, team:team_id(*)')
    .eq('team_id.tournament_id', tournamentId);

  if (error) {
    console.error('Error fetching players by tournament:', error);
    throw error;
  }

  return data || [];
};
