
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "../ui/badge-cricket";
import { Match, Team } from "@/types/cricket";
import { useCricket } from "@/context/CricketContext";
import { formatDate } from "@/lib/utils";

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const { tournaments } = useCricket();
  
  // Find tournament this match belongs to
  const tournament = tournaments.find(t => t.id === match.tournamentId);
  
  // Find teams
  const team1 = tournament?.teams.find(t => t.id === match.team1Id);
  const team2 = tournament?.teams.find(t => t.id === match.team2Id);
  
  if (!team1 || !team2) {
    return null;
  }
  
  const getMatchStatusBadge = () => {
    switch (match.status) {
      case 'scheduled':
        return <Badge variant="outline">Upcoming</Badge>;
      case 'live':
        return <Badge variant="live">LIVE</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'abandoned':
        return <Badge variant="warning">Abandoned</Badge>;
      default:
        return null;
    }
  };
  
  const getTeamScore = (team: Team) => {
    const innings = match.innings.find(i => i.teamId === team.id);
    if (!innings) return null;
    return (
      <div className="text-right">
        <span className="font-bold">{innings.totalRuns}/{innings.totalWickets}</span>
        <span className="ml-1 text-gray-500 text-xs">({innings.totalOvers} ov)</span>
      </div>
    );
  };
  
  const getMatchResult = () => {
    if (match.status === 'scheduled') {
      // Show match date and time for upcoming matches
      return (
        <p className="text-sm">
          {formatDate(match.date)}, {match.time}
        </p>
      );
    }
    
    if (match.status === 'live') {
      // Show match is live for live matches
      return <p className="text-sm text-cricket-700 font-medium">Match in progress</p>;
    }
    
    if (match.status === 'completed' && match.result) {
      // Show match result for completed matches
      return <p className="text-sm">{match.result}</p>;
    }
    
    return null;
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 flex flex-row justify-between items-center bg-gray-50">
        <div>
          {getMatchStatusBadge()}
          <p className="text-xs text-gray-600 mt-1">{match.venue}</p>
        </div>
        <Badge variant="outline" className="capitalize text-xs">
          {tournament?.format || "T20"} Match
        </Badge>
      </CardHeader>
      <CardContent className="py-3">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                {team1.logoUrl ? (
                  <img src={team1.logoUrl} alt={team1.name} className="w-6 h-6 object-contain" />
                ) : (
                  <span className="text-xs font-bold">{team1.shortName}</span>
                )}
              </div>
              <span className="text-base font-medium">{team1.name}</span>
            </div>
            {match.status !== 'scheduled' && getTeamScore(team1)}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                {team2.logoUrl ? (
                  <img src={team2.logoUrl} alt={team2.name} className="w-6 h-6 object-contain" />
                ) : (
                  <span className="text-xs font-bold">{team2.shortName}</span>
                )}
              </div>
              <span className="text-base font-medium">{team2.name}</span>
            </div>
            {match.status !== 'scheduled' && getTeamScore(team2)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 py-2 px-4 flex justify-between items-center">
        {getMatchResult()}
        <Link
          to={`/matches/${match.id}`}
          className="text-xs text-cricket-600 hover:text-cricket-700 font-medium"
        >
          View details →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
