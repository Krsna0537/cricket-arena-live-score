import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge-cricket";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCricket } from "@/context/CricketContext";
import LiveScoreCard from "@/components/cricket/LiveScoreCard";
import MatchCard from "@/components/cricket/MatchCard";
import StatsCard from "@/components/cricket/StatsCard";
import { CalendarCheck, Calendar, Users, Trophy, Award, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import cricketStadiumImg from "/public/cricket-stadium-dashboard.jpg";

const Dashboard = () => {
  const { 
    currentTournament,
    liveMatches, 
    upcomingMatches, 
    completedMatches,
    topBatsmen,
    topBowlers,
    loading
  } = useCricket();

  if (loading) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="h-[300px]">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, j) => (
                    <Skeleton key={j} className="h-16 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Image Section */}
      <div className="relative h-48 md:h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
        <img
          src={cricketStadiumImg}
          alt="Cricket Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
          <div className="p-6 h-full flex flex-col justify-end">
            <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
            <p className="text-gray-200">
              Welcome to Cricket Arena - Manage your cricket tournaments with ease.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">
            Welcome to Cricket Arena - Manage your cricket tournaments with ease.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {currentTournament && (
            <Badge variant="cricket" className="text-sm px-3 py-1">
              {currentTournament.name}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Live Matches"
          value={liveMatches.length}
          subtitle="Matches in progress"
          trend="neutral"
          icon={<div className="h-4 w-4 rounded-full bg-red-500 animate-live-pulse" />}
        />
        <StatsCard
          title="Upcoming Matches"
          value={upcomingMatches.length}
          subtitle="Scheduled matches"
          icon={<CalendarCheck className="h-4 w-4" />}
        />
        <StatsCard
          title="Completed Matches"
          value={completedMatches.length}
          subtitle="Finished matches"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatsCard
          title="Teams"
          value={currentTournament?.teams.length || 0}
          subtitle="Participating teams"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      {liveMatches.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Matches</CardTitle>
                <CardDescription>Matches currently in progress</CardDescription>
              </div>
              <Link to="/live">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {liveMatches.map((match) => (
                <LiveScoreCard key={match.id} match={match} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Matches</CardTitle>
                <CardDescription>Next scheduled matches</CardDescription>
              </div>
              <Link to="/matches?status=scheduled">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMatches.slice(0, 3).map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
              {upcomingMatches.length === 0 && (
                <p className="text-center py-6 text-gray-500">No upcoming matches</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Results</CardTitle>
                <CardDescription>Latest match results</CardDescription>
              </div>
              <Link to="/matches?status=completed">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedMatches.slice(0, 3).map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
              {completedMatches.length === 0 && (
                <p className="text-center py-6 text-gray-500">No completed matches</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:row-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Players</CardTitle>
                <CardDescription>Leading performers</CardDescription>
              </div>
              <Link to="/statistics">
                <Button variant="outline" size="sm">
                  Full Stats
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" /> 
                  Top Run Scorers
                </h3>
                <ul className="mt-2 space-y-2">
                  {topBatsmen.slice(0, 3).map((player, index) => (
                    <li key={player.id} className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs">{index + 1}</span>
                        <Link to={`/players/${player.id}`} className="font-medium hover:text-cricket-700">
                          {player.name}
                        </Link>
                      </div>
                      <div className="font-semibold">{player.stats?.runs || 0}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Award className="h-4 w-4 text-cricket-700" /> 
                  Top Wicket Takers
                </h3>
                <ul className="mt-2 space-y-2">
                  {topBowlers.slice(0, 3).map((player, index) => (
                    <li key={player.id} className="flex items-center justify-between py-1 px-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs">{index + 1}</span>
                        <Link to={`/players/${player.id}`} className="font-medium hover:text-cricket-700">
                          {player.name}
                        </Link>
                      </div>
                      <div className="font-semibold">{player.stats?.wickets || 0}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link to="/statistics" className="flex items-center justify-center gap-1 text-cricket-600 hover:text-cricket-700 font-medium text-sm">
                  <BarChart2 className="h-4 w-4" />
                  <span>View All Statistics</span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
