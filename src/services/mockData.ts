
import { 
  Tournament, 
  Team, 
  Player, 
  Match, 
  Innings, 
  User,
  UserRole
} from '../types/cricket';

// Generate unique IDs
let idCounter = 1;
const generateId = () => `id-${idCounter++}`;

// Mock Users
export const mockUsers: User[] = [
  {
    id: generateId(),
    name: 'Admin User',
    email: 'admin@cricketarena.com',
    role: 'admin',
    avatar: '/avatar-admin.jpg'
  },
  {
    id: generateId(),
    name: 'Scorer User',
    email: 'scorer@cricketarena.com',
    role: 'scorer',
    avatar: '/avatar-scorer.jpg'
  },
  {
    id: generateId(),
    name: 'Team Manager',
    email: 'manager@cricketarena.com',
    role: 'team_manager',
    avatar: '/avatar-manager.jpg'
  }
];

// Mock Players
const createPlayer = (name: string, teamId: string, role: string, jerseyNumber: number): Player => {
  return {
    id: generateId(),
    name,
    jerseyNumber,
    role: role as any,
    battingStyle: Math.random() > 0.5 ? 'right-handed' : 'left-handed',
    bowlingStyle: role === 'bowler' || role === 'all-rounder' 
      ? (Math.random() > 0.5 ? 'right-arm fast' : 'left-arm medium') as any 
      : undefined,
    teamId,
    stats: {
      matches: Math.floor(Math.random() * 100),
      runs: Math.floor(Math.random() * 3000),
      highestScore: Math.floor(Math.random() * 150),
      average: parseFloat((Math.random() * 50).toFixed(2)),
      strikeRate: parseFloat((Math.random() * 150).toFixed(2)),
      fifties: Math.floor(Math.random() * 20),
      hundreds: Math.floor(Math.random() * 10),
      wickets: role === 'bowler' || role === 'all-rounder' ? Math.floor(Math.random() * 200) : 0,
      bestBowling: role === 'bowler' || role === 'all-rounder' ? `${Math.floor(Math.random() * 6)}/${Math.floor(Math.random() * 60)}` : '0/0',
      bowlingAverage: role === 'bowler' || role === 'all-rounder' ? parseFloat((Math.random() * 30).toFixed(2)) : undefined,
      economy: role === 'bowler' || role === 'all-rounder' ? parseFloat((Math.random() * 10).toFixed(2)) : undefined,
    }
  };
};

// Mock Teams
const createTeam = (name: string, shortName: string, tournamentId: string): Team => {
  const teamId = generateId();
  const players: Player[] = [];
  
  // Create players for the team
  const roles = ['batsman', 'batsman', 'batsman', 'batsman', 'batsman', 'all-rounder', 'all-rounder', 'wicket-keeper', 'bowler', 'bowler', 'bowler'];
  
  roles.forEach((role, index) => {
    const playerName = `${name} Player ${index + 1}`;
    players.push(createPlayer(playerName, teamId, role, index + 1));
  });
  
  return {
    id: teamId,
    name,
    shortName,
    logoUrl: `/team-logos/${shortName.toLowerCase()}.png`,
    players,
    captain: players[0].id,
    coach: `${name} Coach`,
    tournamentId
  };
};

// Mock Tournament
export const mockTournaments: Tournament[] = [];

const createTournament = (): Tournament => {
  const tournamentId = generateId();
  
  // Create teams
  const teamNames = [
    { name: 'Royal Challengers', short: 'RCB' },
    { name: 'Super Kings', short: 'CSK' },
    { name: 'Mumbai Indians', short: 'MI' },
    { name: 'Knight Riders', short: 'KKR' },
    { name: 'Sunrisers', short: 'SRH' },
    { name: 'Delhi Capitals', short: 'DC' },
    { name: 'Punjab Kings', short: 'PBKS' },
    { name: 'Rajasthan Royals', short: 'RR' }
  ];
  
  const teams = teamNames.map(team => createTeam(team.name, team.short, tournamentId));
  
  // Create matches
  const matches: Match[] = [];
  const today = new Date();
  
  // Generate matches between teams
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const matchDate = new Date(today);
      matchDate.setDate(today.getDate() + matches.length);
      
      const matchId = generateId();
      const innings: Innings[] = [];
      
      // If the match is in the past, create completed innings
      if (matches.length % 4 === 0) {
        // Create a completed match
        const team1Score = Math.floor(Math.random() * 100) + 120;
        const team1Wickets = Math.floor(Math.random() * 10);
        const team2Score = Math.floor(Math.random() * 100) + 100;
        const team2Wickets = Math.floor(Math.random() * 10);
        const winnerTeamId = team1Score > team2Score ? teams[i].id : teams[j].id;
        
        innings.push({
          id: generateId(),
          matchId,
          teamId: teams[i].id,
          number: 1,
          totalRuns: team1Score,
          totalWickets: team1Wickets,
          totalOvers: 20,
          extras: {
            wides: Math.floor(Math.random() * 10),
            noBalls: Math.floor(Math.random() * 5),
            byes: Math.floor(Math.random() * 5),
            legByes: Math.floor(Math.random() * 5),
            penalty: 0
          },
          batting: teams[i].players.slice(0, 6).map(player => ({
            playerId: player.id,
            runs: Math.floor(Math.random() * 60),
            balls: Math.floor(Math.random() * 40) + 10,
            fours: Math.floor(Math.random() * 5),
            sixes: Math.floor(Math.random() * 3),
            dismissalType: Math.random() > 0.5 ? 'caught' : 'bowled',
            bowlerId: teams[j].players.find(p => p.role === 'bowler')?.id,
            strikeRate: parseFloat((Math.random() * 150).toFixed(2))
          })),
          bowling: teams[j].players.filter(p => p.role === 'bowler' || p.role === 'all-rounder').map(player => ({
            playerId: player.id,
            overs: Math.floor(Math.random() * 4) + 1,
            maidens: Math.floor(Math.random() * 2),
            runs: Math.floor(Math.random() * 40),
            wickets: Math.floor(Math.random() * 3),
            economy: parseFloat((Math.random() * 10).toFixed(2)),
            wides: Math.floor(Math.random() * 3),
            noBalls: Math.floor(Math.random() * 2)
          })),
          fallOfWickets: Array(team1Wickets).fill(0).map((_, idx) => ({
            wicketNumber: idx + 1,
            score: Math.floor(Math.random() * team1Score),
            overs: parseFloat((Math.random() * 20).toFixed(1)),
            playerId: teams[i].players[idx % teams[i].players.length].id
          })),
          status: 'completed'
        });
        
        innings.push({
          id: generateId(),
          matchId,
          teamId: teams[j].id,
          number: 2,
          totalRuns: team2Score,
          totalWickets: team2Wickets,
          totalOvers: 20,
          extras: {
            wides: Math.floor(Math.random() * 10),
            noBalls: Math.floor(Math.random() * 5),
            byes: Math.floor(Math.random() * 5),
            legByes: Math.floor(Math.random() * 5),
            penalty: 0
          },
          batting: teams[j].players.slice(0, 6).map(player => ({
            playerId: player.id,
            runs: Math.floor(Math.random() * 60),
            balls: Math.floor(Math.random() * 40) + 10,
            fours: Math.floor(Math.random() * 5),
            sixes: Math.floor(Math.random() * 3),
            dismissalType: Math.random() > 0.5 ? 'caught' : 'bowled',
            bowlerId: teams[i].players.find(p => p.role === 'bowler')?.id,
            strikeRate: parseFloat((Math.random() * 150).toFixed(2))
          })),
          bowling: teams[i].players.filter(p => p.role === 'bowler' || p.role === 'all-rounder').map(player => ({
            playerId: player.id,
            overs: Math.floor(Math.random() * 4) + 1,
            maidens: Math.floor(Math.random() * 2),
            runs: Math.floor(Math.random() * 40),
            wickets: Math.floor(Math.random() * 3),
            economy: parseFloat((Math.random() * 10).toFixed(2)),
            wides: Math.floor(Math.random() * 3),
            noBalls: Math.floor(Math.random() * 2)
          })),
          fallOfWickets: Array(team2Wickets).fill(0).map((_, idx) => ({
            wicketNumber: idx + 1,
            score: Math.floor(Math.random() * team2Score),
            overs: parseFloat((Math.random() * 20).toFixed(1)),
            playerId: teams[j].players[idx % teams[j].players.length].id
          })),
          status: 'completed'
        });
        
        matches.push({
          id: matchId,
          tournamentId,
          team1Id: teams[i].id,
          team2Id: teams[j].id,
          venue: `Stadium ${matches.length + 1}`,
          date: matchDate.toISOString().split('T')[0],
          time: '14:00',
          status: 'completed',
          tossWinner: Math.random() > 0.5 ? teams[i].id : teams[j].id,
          tossDecision: Math.random() > 0.5 ? 'bat' : 'bowl',
          result: `${winnerTeamId === teams[i].id ? teams[i].name : teams[j].name} won by ${Math.abs(team1Score - team2Score)} runs`,
          winnerTeamId,
          umpires: ['Umpire A', 'Umpire B'],
          referee: 'Referee X',
          innings,
          manOfTheMatch: innings[0].batting[0].playerId
        });
      } else if (matches.length % 8 === 0) {
        // Create a live match
        const team1Score = Math.floor(Math.random() * 80) + 80;
        const team1Wickets = Math.floor(Math.random() * 5);
        
        innings.push({
          id: generateId(),
          matchId,
          teamId: teams[i].id,
          number: 1,
          totalRuns: team1Score,
          totalWickets: team1Wickets,
          totalOvers: 20,
          extras: {
            wides: Math.floor(Math.random() * 10),
            noBalls: Math.floor(Math.random() * 5),
            byes: Math.floor(Math.random() * 5),
            legByes: Math.floor(Math.random() * 5),
            penalty: 0
          },
          batting: teams[i].players.slice(0, 6).map(player => ({
            playerId: player.id,
            runs: Math.floor(Math.random() * 60),
            balls: Math.floor(Math.random() * 40) + 10,
            fours: Math.floor(Math.random() * 5),
            sixes: Math.floor(Math.random() * 3),
            dismissalType: Math.random() > 0.5 ? 'caught' : 'bowled',
            bowlerId: teams[j].players.find(p => p.role === 'bowler')?.id,
            strikeRate: parseFloat((Math.random() * 150).toFixed(2))
          })),
          bowling: teams[j].players.filter(p => p.role === 'bowler' || p.role === 'all-rounder').map(player => ({
            playerId: player.id,
            overs: Math.floor(Math.random() * 4) + 1,
            maidens: Math.floor(Math.random() * 2),
            runs: Math.floor(Math.random() * 40),
            wickets: Math.floor(Math.random() * 3),
            economy: parseFloat((Math.random() * 10).toFixed(2)),
            wides: Math.floor(Math.random() * 3),
            noBalls: Math.floor(Math.random() * 2)
          })),
          fallOfWickets: Array(team1Wickets).fill(0).map((_, idx) => ({
            wicketNumber: idx + 1,
            score: Math.floor(Math.random() * team1Score),
            overs: parseFloat((Math.random() * 20).toFixed(1)),
            playerId: teams[i].players[idx % teams[i].players.length].id
          })),
          status: 'completed'
        });
        
        // Second inning in progress
        const team2Score = Math.floor(Math.random() * 50) + 30;
        const team2Wickets = Math.floor(Math.random() * 3);
        const currentOver = parseFloat((Math.random() * 8 + 2).toFixed(1));
        
        innings.push({
          id: generateId(),
          matchId,
          teamId: teams[j].id,
          number: 2,
          totalRuns: team2Score,
          totalWickets: team2Wickets,
          totalOvers: currentOver,
          extras: {
            wides: Math.floor(Math.random() * 5),
            noBalls: Math.floor(Math.random() * 2),
            byes: Math.floor(Math.random() * 3),
            legByes: Math.floor(Math.random() * 3),
            penalty: 0
          },
          batting: teams[j].players.slice(0, 4).map(player => ({
            playerId: player.id,
            runs: Math.floor(Math.random() * 30),
            balls: Math.floor(Math.random() * 20) + 5,
            fours: Math.floor(Math.random() * 3),
            sixes: Math.floor(Math.random() * 2),
            dismissalType: player.id === teams[j].players[2].id ? (Math.random() > 0.5 ? 'caught' : 'bowled') : undefined,
            bowlerId: player.id === teams[j].players[2].id ? teams[i].players.find(p => p.role === 'bowler')?.id : undefined,
            strikeRate: parseFloat((Math.random() * 150).toFixed(2))
          })),
          bowling: teams[i].players.filter(p => p.role === 'bowler' || p.role === 'all-rounder').slice(0, 3).map(player => ({
            playerId: player.id,
            overs: Math.floor(Math.random() * 3) + 1,
            maidens: Math.floor(Math.random() * 1),
            runs: Math.floor(Math.random() * 25),
            wickets: Math.floor(Math.random() * 2),
            economy: parseFloat((Math.random() * 8).toFixed(2)),
            wides: Math.floor(Math.random() * 2),
            noBalls: Math.floor(Math.random() * 1)
          })),
          fallOfWickets: Array(team2Wickets).fill(0).map((_, idx) => ({
            wicketNumber: idx + 1,
            score: Math.floor(Math.random() * team2Score),
            overs: parseFloat((Math.random() * currentOver).toFixed(1)),
            playerId: teams[j].players[idx % teams[j].players.length].id
          })),
          status: 'ongoing'
        });
        
        matches.push({
          id: matchId,
          tournamentId,
          team1Id: teams[i].id,
          team2Id: teams[j].id,
          venue: `Stadium ${matches.length + 1}`,
          date: new Date().toISOString().split('T')[0],
          time: '14:00',
          status: 'live',
          tossWinner: teams[i].id,
          tossDecision: 'bat',
          innings,
          umpires: ['Umpire C', 'Umpire D'],
          referee: 'Referee Y'
        });
      } else {
        // Create upcoming match
        matches.push({
          id: matchId,
          tournamentId,
          team1Id: teams[i].id,
          team2Id: teams[j].id,
          venue: `Stadium ${matches.length + 1}`,
          date: matchDate.toISOString().split('T')[0],
          time: '14:00',
          status: 'scheduled',
          innings: [],
          umpires: ['Umpire E', 'Umpire F'],
          referee: 'Referee Z'
        });
      }
    }
  }
  
  // Create tournament
  return {
    id: tournamentId,
    name: 'Cricket Premier League 2025',
    format: 'T20',
    startDate: '2025-03-01',
    endDate: '2025-05-30',
    location: 'Multiple Venues',
    description: 'The premier T20 cricket tournament featuring the best teams and players from around the world.',
    status: 'ongoing',
    logoUrl: '/tournament-logo.png',
    teams,
    matches,
    createdBy: mockUsers[0].id
  };
};

// Create a tournament
mockTournaments.push(createTournament());

// Function to get tournament data
export const getTournaments = () => {
  return mockTournaments;
};

export const getTournamentById = (id: string) => {
  return mockTournaments.find(tournament => tournament.id === id);
};

export const getTeams = (tournamentId: string) => {
  const tournament = mockTournaments.find(t => t.id === tournamentId);
  return tournament ? tournament.teams : [];
};

export const getTeamById = (tournamentId: string, teamId: string) => {
  const teams = getTeams(tournamentId);
  return teams.find(team => team.id === teamId);
};

export const getMatches = (tournamentId: string) => {
  const tournament = mockTournaments.find(t => t.id === tournamentId);
  return tournament ? tournament.matches : [];
};

export const getMatchById = (tournamentId: string, matchId: string) => {
  const matches = getMatches(tournamentId);
  return matches.find(match => match.id === matchId);
};

export const getLiveMatches = () => {
  return mockTournaments.flatMap(tournament => 
    tournament.matches.filter(match => match.status === 'live')
  );
};

export const getUpcomingMatches = () => {
  return mockTournaments.flatMap(tournament => 
    tournament.matches.filter(match => match.status === 'scheduled')
  );
};

export const getCompletedMatches = () => {
  return mockTournaments.flatMap(tournament => 
    tournament.matches.filter(match => match.status === 'completed')
  );
};

export const getPlayers = (tournamentId: string, teamId?: string) => {
  const tournament = mockTournaments.find(t => t.id === tournamentId);
  if (!tournament) return [];
  
  if (teamId) {
    const team = tournament.teams.find(t => t.id === teamId);
    return team ? team.players : [];
  }
  
  return tournament.teams.flatMap(team => team.players);
};

export const getPlayerById = (tournamentId: string, playerId: string) => {
  const players = getPlayers(tournamentId);
  return players.find(player => player.id === playerId);
};

export const getTopBatsmen = (tournamentId: string, limit: number = 5) => {
  const players = getPlayers(tournamentId);
  return [...players]
    .sort((a, b) => (b.stats?.runs || 0) - (a.stats?.runs || 0))
    .slice(0, limit);
};

export const getTopBowlers = (tournamentId: string, limit: number = 5) => {
  const players = getPlayers(tournamentId);
  return [...players]
    .filter(player => player.stats?.wickets && player.stats.wickets > 0)
    .sort((a, b) => (b.stats?.wickets || 0) - (a.stats?.wickets || 0))
    .slice(0, limit);
};

export const getCurrentUser = (): User => {
  // Default to admin user for demo
  return mockUsers[0];
};
