
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/types/cricket";
import { Badge } from "../ui/badge-cricket";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="flex flex-col items-center pb-2 pt-4 space-y-0">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          {team.logoUrl ? (
            <img src={team.logoUrl} alt={team.name} className="w-12 h-12 object-contain" />
          ) : (
            <span className="text-2xl font-bold text-gray-400">{team.shortName}</span>
          )}
        </div>
        <CardTitle className="mt-2 text-center">{team.name}</CardTitle>
        <Badge variant="outline" className="mt-1">
          {team.shortName}
        </Badge>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-sm text-center text-gray-600">
          <p>{team.players.length} Players</p>
          {team.coach && <p>Coach: {team.coach}</p>}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 py-2 px-4 flex justify-center">
        <Link
          to={`/teams/${team.id}`}
          className="text-sm text-cricket-600 hover:text-cricket-700 font-medium"
        >
          View team profile
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
