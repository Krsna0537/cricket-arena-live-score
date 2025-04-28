
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge-cricket";
import { Tournament } from "@/types/cricket";
import { CalendarCheck, Flag, MapPin, Trophy } from "lucide-react";

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  const getTournamentStatusBadge = () => {
    switch (tournament.status) {
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      case "ongoing":
        return <Badge variant="cricket">Ongoing</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              {tournament.logoUrl ? (
                <img
                  src={tournament.logoUrl}
                  alt={tournament.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <Trophy className="h-5 w-5 text-cricket-600" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{tournament.name}</CardTitle>
              <p className="text-xs text-gray-500">{tournament.format}</p>
            </div>
          </div>
          {getTournamentStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-gray-500" />
            <span>
              {tournament.startDate} to {tournament.endDate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{tournament.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-gray-500" />
            <span>{tournament.teams.length} Teams</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 py-2 px-4 flex justify-between items-center">
        <div className="text-xs">
          <span className="font-medium">{tournament.matches.length}</span> matches
        </div>
        <Link
          to={`/tournaments/${tournament.id}`}
          className="text-sm text-cricket-600 hover:text-cricket-700 font-medium"
        >
          View tournament
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TournamentCard;
