
import { supabase } from '@/integrations/supabase/client';
import { Match } from '@/types/cricket';
import { useCricket } from '@/context/CricketContext'; 

// Fetch live matches from Supabase
export const fetchLiveMatches = async (): Promise<Match[]> => {
  // Try to fetch live matches from Supabase
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      team1:team1_id(*),
      team2:team2_id(*)
    `)
    .eq('status', 'live');

  if (error) {
    console.error('Error fetching live matches:', error);
    throw error;
  }

  // If we get data from Supabase, transform it to match our app's Match type
  if (data && data.length > 0) {
    return data.map((match) => transformMatchData(match));
  }
  
  // If no data or empty array, use mock data from CricketContext
  // This is a fallback for development or when database is empty
  return getLiveMatchesFromContext();
};

// Helper function to transform database matches to our app's Match type
const transformMatchData = (dbMatch: any): Match => {
  return {
    id: dbMatch.id,
    tournamentId: dbMatch.tournament_id,
    team1Id: dbMatch.team1_id,
    team2Id: dbMatch.team2_id,
    venue: dbMatch.venue,
    date: dbMatch.match_date,
    time: dbMatch.match_time,
    status: dbMatch.status,
    tossWinner: dbMatch.toss_winner,
    tossDecision: dbMatch.toss_decision,
    result: dbMatch.result,
    winnerTeamId: dbMatch.winner_team_id,
    umpires: dbMatch.umpires,
    referee: dbMatch.referee,
    innings: [], // This would need to be populated separately
    manOfTheMatch: dbMatch.man_of_match
  };
};

// Fallback function to get live matches from context if DB fetch fails
const getLiveMatchesFromContext = (): Match[] => {
  // Note: This is a hack since we can't use hooks outside of components
  // In a real app, you might want to handle this differently or use a global store
  try {
    // Access the mock data directly from the services
    const { getLiveMatches } = require('@/services/mockData');
    return getLiveMatches();
  } catch (error) {
    console.error('Error getting mock live matches:', error);
    return [];
  }
};
