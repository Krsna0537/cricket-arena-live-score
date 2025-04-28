
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLiveMatches } from '@/services/matchService';
import { Match } from '@/types/cricket';
import LiveScoreCard from '@/components/cricket/LiveScoreCard';
import { Button } from "@/components/ui/button";
import { RefreshCcw } from 'lucide-react';
import cricketMatchImg from "/cricket-match-live.jpg";

const LiveMatches = () => {
  const { data: liveMatches, isLoading, isError, refetch } = useQuery({
    queryKey: ['liveMatches'],
    queryFn: fetchLiveMatches,
    refetchInterval: 60000, // Refetch every 60 seconds
  });

  if (isLoading) {
    return <div>Loading live matches...</div>;
  }

  if (isError) {
    return <div>Error loading live matches.</div>;
  }

  const matches = liveMatches as Match[] || [];

  return (
    <div className="space-y-6">
      {/* Hero Image Section */}
      <div className="relative h-48 md:h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
        <img
          src={cricketMatchImg}
          alt="Live Cricket Match"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
          <div className="p-6 h-full flex flex-col justify-end">
            <h1 className="text-3xl font-bold tracking-tight text-white">Live Matches</h1>
            <p className="text-gray-200">
              Follow live cricket matches in real-time
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Matches</h1>
          <p className="text-muted-foreground">
            View all live cricket matches in real-time
          </p>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => refetch()}
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match: Match) => (
            <LiveScoreCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No live matches found</p>
        </div>
      )}
    </div>
  );
};

export default LiveMatches;
