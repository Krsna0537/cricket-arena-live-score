
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  Tournament, 
  Team, 
  Player, 
  Match, 
  User 
} from '../types/cricket';
import { 
  getTournaments, 
  getTournamentById, 
  getTeams, 
  getTeamById,
  getMatches,
  getMatchById,
  getLiveMatches,
  getUpcomingMatches,
  getCompletedMatches,
  getPlayers,
  getPlayerById,
  getTopBatsmen,
  getTopBowlers,
  getCurrentUser
} from '../services/mockData';
import { toast } from '@/components/ui/use-toast';

interface CricketContextProps {
  // Current user
  currentUser: User | null;
  
  // Tournament data
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  setCurrentTournament: (tournament: Tournament | null) => void;
  
  // Team data
  teams: Team[];
  
  // Match data
  matches: Match[];
  liveMatches: Match[];
  upcomingMatches: Match[];
  completedMatches: Match[];
  currentMatch: Match | null;
  setCurrentMatch: (match: Match | null) => void;
  refreshLiveMatches: () => void;
  
  // Player data
  players: Player[];
  topBatsmen: Player[];
  topBowlers: Player[];
  
  // Loading states
  loading: boolean;
  
  // Data fetch methods
  fetchTournaments: () => Promise<Tournament[]>;
  fetchTournamentById: (id: string) => Promise<Tournament | undefined>;
  fetchTeams: (tournamentId: string) => Promise<Team[]>;
  fetchTeamById: (tournamentId: string, teamId: string) => Promise<Team | undefined>;
  fetchMatches: (tournamentId: string) => Promise<Match[]>;
  fetchMatchById: (tournamentId: string, matchId: string) => Promise<Match | undefined>;
  fetchPlayers: (tournamentId: string, teamId?: string) => Promise<Player[]>;
  fetchPlayerById: (tournamentId: string, playerId: string) => Promise<Player | undefined>;
}

const CricketContext = createContext<CricketContextProps | undefined>(undefined);

export const CricketProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [currentTournament, setCurrentTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [completedMatches, setCompletedMatches] = useState<Match[]>([]);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [topBatsmen, setTopBatsmen] = useState<Player[]>([]);
  const [topBowlers, setTopBowlers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Initialize context on first load
  useEffect(() => {
    const initContext = async () => {
      try {
        // Get current user
        const user = getCurrentUser();
        setCurrentUser(user);
        
        // Fetch tournaments
        const tournamentsData = await fetchTournaments();
        
        if (tournamentsData.length > 0) {
          // Set current tournament to first available
          const firstTournament = tournamentsData[0];
          setCurrentTournament(firstTournament);
          
          // Fetch teams for this tournament
          const teamsData = await fetchTeams(firstTournament.id);
          setTeams(teamsData);
          
          // Fetch matches for this tournament
          const matchesData = await fetchMatches(firstTournament.id);
          setMatches(matchesData);
          
          // Fetch players for this tournament
          const playersData = await fetchPlayers(firstTournament.id);
          setPlayers(playersData);
          
          // Set top players
          setTopBatsmen(getTopBatsmen(firstTournament.id));
          setTopBowlers(getTopBowlers(firstTournament.id));
        }
        
        // Get live, upcoming, and completed matches
        setLiveMatches(getLiveMatches());
        setUpcomingMatches(getUpcomingMatches());
        setCompletedMatches(getCompletedMatches());
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize cricket context:', error);
        toast({
          title: 'Error',
          description: 'Failed to load data. Please try again later.',
          variant: 'destructive',
        });
        setLoading(false);
      }
    };
    
    initContext();
  }, []);
  
  // Set up a refresh interval for live matches
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (liveMatches.length > 0) {
        refreshLiveMatches();
      }
    }, 10000); // Refresh every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [liveMatches]);
  
  // Method to refresh live match data
  const refreshLiveMatches = () => {
    setLiveMatches(getLiveMatches());
  };
  
  // Data fetch methods
  const fetchTournaments = async (): Promise<Tournament[]> => {
    const data = getTournaments();
    setTournaments(data);
    return data;
  };
  
  const fetchTournamentById = async (id: string): Promise<Tournament | undefined> => {
    return getTournamentById(id);
  };
  
  const fetchTeams = async (tournamentId: string): Promise<Team[]> => {
    const data = getTeams(tournamentId);
    return data;
  };
  
  const fetchTeamById = async (tournamentId: string, teamId: string): Promise<Team | undefined> => {
    return getTeamById(tournamentId, teamId);
  };
  
  const fetchMatches = async (tournamentId: string): Promise<Match[]> => {
    const data = getMatches(tournamentId);
    return data;
  };
  
  const fetchMatchById = async (tournamentId: string, matchId: string): Promise<Match | undefined> => {
    return getMatchById(tournamentId, matchId);
  };
  
  const fetchPlayers = async (tournamentId: string, teamId?: string): Promise<Player[]> => {
    const data = getPlayers(tournamentId, teamId);
    return data;
  };
  
  const fetchPlayerById = async (tournamentId: string, playerId: string): Promise<Player | undefined> => {
    return getPlayerById(tournamentId, playerId);
  };
  
  const value = {
    currentUser,
    tournaments,
    currentTournament,
    setCurrentTournament,
    teams,
    matches,
    liveMatches,
    upcomingMatches,
    completedMatches,
    currentMatch,
    setCurrentMatch,
    refreshLiveMatches,
    players,
    topBatsmen,
    topBowlers,
    loading,
    fetchTournaments,
    fetchTournamentById,
    fetchTeams,
    fetchTeamById,
    fetchMatches,
    fetchMatchById,
    fetchPlayers,
    fetchPlayerById
  };
  
  return (
    <CricketContext.Provider value={value}>
      {children}
    </CricketContext.Provider>
  );
};

export const useCricket = (): CricketContextProps => {
  const context = useContext(CricketContext);
  if (!context) {
    throw new Error('useCricket must be used within a CricketProvider');
  }
  return context;
};
