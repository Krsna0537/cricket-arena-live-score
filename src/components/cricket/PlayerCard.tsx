
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "../ui/badge-cricket";
import { Player } from "@/types/cricket";
import { useCricket } from "@/context/CricketContext";

interface PlayerCardProps {
  player: Player;
  showTeam?: boolean;
}

const PlayerCard = ({ player, showTeam = true }: PlayerCardProps) => {
  const { tournaments } = useCricket();
  
  // Find team this player belongs to
  const team = tournaments
    .flatMap(t => t.teams)
    .find(t => t.id === player.teamId);
  
  const getRoleColor = () => {
    switch (player.role) {
      case "batsman":
        return "bg-blue-100 text-blue-800";
      case "bowler":
        return "bg-green-100 text-green-800";
      case "all-rounder":
        return "bg-purple-100 text-purple-800";
      case "wicket-keeper":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="flex flex-col items-center pt-4 pb-2 space-y-0">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          {player.avatarUrl ? (
            <img src={player.avatarUrl} alt={player.name} className="w-16 h-16 object-cover" />
          ) : (
            <span className="text-2xl font-bold text-gray-400">
              {player.name.charAt(0)}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-base mt-2">{player.name}</h3>
        <div className="flex gap-2 mt-1">
          <Badge className={`${getRoleColor()}`}>
            {player.role}
          </Badge>
          <Badge variant="outline">
            #{player.jerseyNumber}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Batting</p>
            <p className="font-medium">{player.battingStyle}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Bowling</p>
            <p className="font-medium">{player.bowlingStyle || "N/A"}</p>
          </div>
          
          {player.stats && (
            <>
              <div className="text-center">
                <p className="text-gray-500">Runs</p>
                <p className="font-bold">{player.stats.runs}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Wickets</p>
                <p className="font-bold">{player.stats.wickets}</p>
              </div>
            </>
          )}
        </div>
        
        {showTeam && team && (
          <div className="mt-2 pt-2 border-t flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              {team.logoUrl ? (
                <img src={team.logoUrl} alt={team.name} className="w-4 h-4 object-contain" />
              ) : (
                <span className="text-xs font-bold">{team.shortName}</span>
              )}
            </div>
            <p className="text-sm">{team.name}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 py-2 px-4 flex justify-center">
        <Link
          to={`/players/${player.id}`}
          className="text-sm text-cricket-600 hover:text-cricket-700 font-medium"
        >
          View full profile
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlayerCard;
