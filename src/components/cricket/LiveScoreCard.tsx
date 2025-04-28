
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "../ui/badge-cricket";
import { Match, Team } from "@/types/cricket";
import { useCricket } from "@/context/CricketContext";

interface LiveScoreCardProps {
  match: Match;
  minimal?: boolean;
}

const LiveScoreCard = ({ match, minimal = false }: LiveScoreCardProps) => {
  const { tournaments } = useCricket();

  // Find tournament this match belongs to
  const tournament = tournaments.find(t => t.id === match.tournamentId);

  // Find teams
  const team1 = tournament?.teams.find(t => t.id === match.team1Id);
  const team2 = tournament?.teams.find(t => t.id === match.team2Id);

  // Get innings data
  const firstInnings = match.innings.find(i => i.number === 1);
  const secondInnings = match.innings.find(i => i.number === 2);

  if (!team1 || !team2) {
    return null;
  }

  const getTeamScore = (team: Team) => {
    const innings = match.innings.find(i => i.teamId === team.id);
    if (!innings) return "-";
    return `${innings.totalRuns}/${innings.totalWickets}`;
  };

  const getTeamOvers = (team: Team) => {
    const innings = match.innings.find(i => i.teamId === team.id);
    if (!innings) return "-";
    return `(${innings.totalOvers} ov)`;
  };

  const getRequiredRuns = () => {
    if (!firstInnings || !secondInnings || secondInnings.status !== 'ongoing') {
      return null;
    }

    const required = firstInnings.totalRuns - secondInnings.totalRuns + 1;
    const ballsRemaining = 120 - (Math.floor(secondInnings.totalOvers) * 6 + (secondInnings.totalOvers % 1) * 10);
    
    if (required <= 0) {
      return "Match won";
    }
    
    return `Need ${required} runs from ${ballsRemaining} balls`;
  };

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${minimal ? 'border-cricket-200' : 'border-l-4 border-l-cricket-600'}`}>
      <CardHeader className={`${minimal ? 'p-3' : 'pb-2'} flex flex-row justify-between items-center bg-gray-50`}>
        <div>
          <Badge variant="live" className="mb-1">
            LIVE
          </Badge>
          <p className={`text-xs text-gray-600 ${minimal ? '' : 'mt-1'}`}>{match.venue}</p>
        </div>
        {!minimal && (
          <Badge variant="outline" className="capitalize text-xs">
            {tournament?.format || "T20"} Match
          </Badge>
        )}
      </CardHeader>
      <CardContent className={minimal ? 'p-3 pt-2' : 'py-3'}>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                {team1.logoUrl ? (
                  <img src={team1.logoUrl} alt={team1.name} className="w-6 h-6 object-contain" />
                ) : (
                  <span className="text-xs font-bold">{team1.shortName}</span>
                )}
              </div>
              <span className={minimal ? 'text-sm font-medium' : 'text-base font-medium'}>{minimal ? team1.shortName : team1.name}</span>
            </div>
            <div className="text-right">
              <span className={`font-bold ${minimal ? 'text-sm' : 'text-base'}`}>
                {getTeamScore(team1)}
              </span>
              <span className="ml-1 text-gray-500 text-xs">
                {getTeamOvers(team1)}
              </span>
            </div>
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
              <span className={minimal ? 'text-sm font-medium' : 'text-base font-medium'}>{minimal ? team2.shortName : team2.name}</span>
            </div>
            <div className="text-right">
              <span className={`font-bold ${minimal ? 'text-sm' : 'text-base'}`}>
                {getTeamScore(team2)}
              </span>
              <span className="ml-1 text-gray-500 text-xs">
                {getTeamOvers(team2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      {!minimal && (
        <CardFooter className="bg-gray-50 py-2 px-4 flex justify-between items-center">
          <p className="text-sm text-cricket-700 font-medium">
            {getRequiredRuns() || "Match in progress"}
          </p>
          <Link
            to={`/matches/${match.id}`}
            className="text-xs text-cricket-600 hover:text-cricket-700 font-medium"
          >
            View details →
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default LiveScoreCard;
