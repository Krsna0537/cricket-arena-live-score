
import { useCricket } from "@/context/CricketContext";
import LiveScoreCard from "@/components/cricket/LiveScoreCard";
import { Badge } from "@/components/ui/badge-cricket";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, MessageSquare, BarChart2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LiveMatches = () => {
  const { liveMatches, tournaments, loading } = useCricket();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid gap-4">
          {Array(2).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (liveMatches.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Matches</h1>
          <p className="text-gray-500">Real-time updates of ongoing matches</p>
        </div>
        
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">No Live Matches</h2>
            <p className="text-gray-500 mb-6">
              There are currently no matches in progress.
              <br />
              Check back later or view upcoming matches.
            </p>
            <Button asChild>
              <a href="/matches">View All Matches</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Matches</h1>
          <p className="text-gray-500">Real-time updates of ongoing matches</p>
        </div>
        <Badge variant="live" className="text-sm px-3 py-1">
          {liveMatches.length} Live{" "}
          {liveMatches.length === 1 ? "Match" : "Matches"}
        </Badge>
      </div>

      {liveMatches.map((match) => {
        // Find tournament
        const tournament = tournaments.find(t => t.id === match.tournamentId);
        
        // Find teams
        const team1 = tournament?.teams.find(t => t.id === match.team1Id);
        const team2 = tournament?.teams.find(t => t.id === match.team2Id);
        
        // Get innings data
        const firstInnings = match.innings.find(i => i.number === 1);
        const secondInnings = match.innings.find(i => i.number === 2);
        
        // If no teams found, skip this match
        if (!team1 || !team2) return null;
        
        return (
          <div key={match.id} className="grid gap-6 md:grid-cols-7">
            {/* Main live score card - Left column on desktop */}
            <div className="md:col-span-3 lg:col-span-2">
              <LiveScoreCard match={match} />
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button variant="outline" className="w-full">
                  <Award className="mr-2 h-4 w-4" /> Awards
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart2 className="mr-2 h-4 w-4" /> Statistics
                </Button>
              </div>
            </div>
            
            {/* Right column */}
            <div className="md:col-span-4 lg:col-span-5">
              <Tabs defaultValue="scorecard" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="scorecard" className="flex-1">Scorecard</TabsTrigger>
                  <TabsTrigger value="commentary" className="flex-1">Commentary</TabsTrigger>
                  <TabsTrigger value="info" className="flex-1">Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="scorecard">
                  {/* Batting Team 1 */}
                  {firstInnings && (
                    <Card>
                      <CardHeader className="py-2 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                              {team1.logoUrl ? (
                                <img src={team1.logoUrl} alt={team1.name} className="w-6 h-6 object-contain" />
                              ) : (
                                <span className="text-xs font-bold">{team1.shortName}</span>
                              )}
                            </div>
                            <span className="font-medium">{team1.name}</span>
                          </div>
                          <div className="font-bold">
                            {firstInnings.totalRuns}/{firstInnings.totalWickets} 
                            <span className="text-sm text-gray-500 ml-1">
                              ({firstInnings.totalOvers} ov)
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-0 py-0">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50">
                                <th className="py-2 px-4 text-left">Batter</th>
                                <th className="py-2 px-4 text-center">R</th>
                                <th className="py-2 px-4 text-center">B</th>
                                <th className="py-2 px-4 text-center">4s</th>
                                <th className="py-2 px-4 text-center">6s</th>
                                <th className="py-2 px-4 text-center">SR</th>
                              </tr>
                            </thead>
                            <tbody>
                              {firstInnings.batting.map((bat, index) => {
                                const player = tournament?.teams
                                  .flatMap(t => t.players)
                                  .find(p => p.id === bat.playerId);
                                  
                                if (!player) return null;
                                
                                return (
                                  <tr key={bat.playerId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="py-2 px-4">
                                      <div>
                                        <div className="font-medium">{player.name}</div>
                                        <div className="text-xs text-gray-500">
                                          {bat.dismissalType || 'not out'}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-2 px-4 text-center font-medium">{bat.runs}</td>
                                    <td className="py-2 px-4 text-center">{bat.balls}</td>
                                    <td className="py-2 px-4 text-center">{bat.fours}</td>
                                    <td className="py-2 px-4 text-center">{bat.sixes}</td>
                                    <td className="py-2 px-4 text-center">{bat.strikeRate}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                            <tfoot>
                              <tr className="border-t bg-gray-50">
                                <td className="py-2 px-4 font-medium">Extras</td>
                                <td className="py-2 px-4 text-center" colSpan={5}>
                                  {firstInnings.extras.wides + firstInnings.extras.noBalls + 
                                   firstInnings.extras.byes + firstInnings.extras.legByes + 
                                   firstInnings.extras.penalty} 
                                  <span className="text-xs text-gray-500">
                                    (w {firstInnings.extras.wides}, nb {firstInnings.extras.noBalls}, 
                                    b {firstInnings.extras.byes}, lb {firstInnings.extras.legByes})
                                  </span>
                                </td>
                              </tr>
                              <tr className="border-t font-bold bg-gray-100">
                                <td className="py-2 px-4">Total</td>
                                <td className="py-2 px-4 text-center">
                                  {firstInnings.totalRuns}/{firstInnings.totalWickets}
                                </td>
                                <td className="py-2 px-4 text-left" colSpan={4}>
                                  ({firstInnings.totalOvers} Overs, RR: {(firstInnings.totalRuns / firstInnings.totalOvers).toFixed(2)})
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                        
                        <div className="my-2 px-4 py-1 bg-gray-50 font-medium text-sm">
                          Bowling
                        </div>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50">
                                <th className="py-2 px-4 text-left">Bowler</th>
                                <th className="py-2 px-4 text-center">O</th>
                                <th className="py-2 px-4 text-center">M</th>
                                <th className="py-2 px-4 text-center">R</th>
                                <th className="py-2 px-4 text-center">W</th>
                                <th className="py-2 px-4 text-center">Econ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {firstInnings.bowling.map((bowl, index) => {
                                const player = tournament?.teams
                                  .flatMap(t => t.players)
                                  .find(p => p.id === bowl.playerId);
                                  
                                if (!player) return null;
                                
                                return (
                                  <tr key={bowl.playerId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="py-2 px-4 font-medium">{player.name}</td>
                                    <td className="py-2 px-4 text-center">{bowl.overs}</td>
                                    <td className="py-2 px-4 text-center">{bowl.maidens}</td>
                                    <td className="py-2 px-4 text-center">{bowl.runs}</td>
                                    <td className="py-2 px-4 text-center font-medium">{bowl.wickets}</td>
                                    <td className="py-2 px-4 text-center">{bowl.economy}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* Batting Team 2 */}
                  {secondInnings && (
                    <Card className="mt-4">
                      <CardHeader className="py-2 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                              {team2.logoUrl ? (
                                <img src={team2.logoUrl} alt={team2.name} className="w-6 h-6 object-contain" />
                              ) : (
                                <span className="text-xs font-bold">{team2.shortName}</span>
                              )}
                            </div>
                            <span className="font-medium">{team2.name}</span>
                          </div>
                          <div className="font-bold">
                            {secondInnings.totalRuns}/{secondInnings.totalWickets} 
                            <span className="text-sm text-gray-500 ml-1">
                              ({secondInnings.totalOvers} ov)
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-0 py-0">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50">
                                <th className="py-2 px-4 text-left">Batter</th>
                                <th className="py-2 px-4 text-center">R</th>
                                <th className="py-2 px-4 text-center">B</th>
                                <th className="py-2 px-4 text-center">4s</th>
                                <th className="py-2 px-4 text-center">6s</th>
                                <th className="py-2 px-4 text-center">SR</th>
                              </tr>
                            </thead>
                            <tbody>
                              {secondInnings.batting.map((bat, index) => {
                                const player = tournament?.teams
                                  .flatMap(t => t.players)
                                  .find(p => p.id === bat.playerId);
                                  
                                if (!player) return null;
                                
                                return (
                                  <tr key={bat.playerId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="py-2 px-4">
                                      <div>
                                        <div className="font-medium">{player.name}</div>
                                        <div className="text-xs text-gray-500">
                                          {bat.dismissalType || 'not out'}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-2 px-4 text-center font-medium">{bat.runs}</td>
                                    <td className="py-2 px-4 text-center">{bat.balls}</td>
                                    <td className="py-2 px-4 text-center">{bat.fours}</td>
                                    <td className="py-2 px-4 text-center">{bat.sixes}</td>
                                    <td className="py-2 px-4 text-center">{bat.strikeRate}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                            <tfoot>
                              <tr className="border-t bg-gray-50">
                                <td className="py-2 px-4 font-medium">Extras</td>
                                <td className="py-2 px-4 text-center" colSpan={5}>
                                  {secondInnings.extras.wides + secondInnings.extras.noBalls + 
                                   secondInnings.extras.byes + secondInnings.extras.legByes + 
                                   secondInnings.extras.penalty} 
                                  <span className="text-xs text-gray-500">
                                    (w {secondInnings.extras.wides}, nb {secondInnings.extras.noBalls}, 
                                    b {secondInnings.extras.byes}, lb {secondInnings.extras.legByes})
                                  </span>
                                </td>
                              </tr>
                              <tr className="border-t font-bold bg-gray-100">
                                <td className="py-2 px-4">Total</td>
                                <td className="py-2 px-4 text-center">
                                  {secondInnings.totalRuns}/{secondInnings.totalWickets}
                                </td>
                                <td className="py-2 px-4 text-left" colSpan={4}>
                                  ({secondInnings.totalOvers} Overs, RR: {(secondInnings.totalRuns / secondInnings.totalOvers).toFixed(2)})
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                        
                        <div className="my-2 px-4 py-1 bg-gray-50 font-medium text-sm">
                          Bowling
                        </div>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50">
                                <th className="py-2 px-4 text-left">Bowler</th>
                                <th className="py-2 px-4 text-center">O</th>
                                <th className="py-2 px-4 text-center">M</th>
                                <th className="py-2 px-4 text-center">R</th>
                                <th className="py-2 px-4 text-center">W</th>
                                <th className="py-2 px-4 text-center">Econ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {secondInnings.bowling.map((bowl, index) => {
                                const player = tournament?.teams
                                  .flatMap(t => t.players)
                                  .find(p => p.id === bowl.playerId);
                                  
                                if (!player) return null;
                                
                                return (
                                  <tr key={bowl.playerId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="py-2 px-4 font-medium">{player.name}</td>
                                    <td className="py-2 px-4 text-center">{bowl.overs}</td>
                                    <td className="py-2 px-4 text-center">{bowl.maidens}</td>
                                    <td className="py-2 px-4 text-center">{bowl.runs}</td>
                                    <td className="py-2 px-4 text-center font-medium">{bowl.wickets}</td>
                                    <td className="py-2 px-4 text-center">{bowl.economy}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="commentary">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" /> Live Commentary
                        </h3>
                        <Badge variant="live" className="text-xs">LIVE</Badge>
                      </div>
                      
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-3">
                          {/* Commentary items - normally would come from API */}
                          <div className="border-l-2 border-cricket-600 pl-3 py-1">
                            <div className="text-xs font-semibold text-gray-500">Over 8.2</div>
                            <p className="text-sm">
                              <span className="font-bold">FOUR!</span> Beautiful cover drive from the batsman, 
                              found the gap perfectly and the ball races to the boundary.
                            </p>
                          </div>
                          <div className="border-l-2 border-yellow-500 pl-3 py-1">
                            <div className="text-xs font-semibold text-gray-500">Over 8.1</div>
                            <p className="text-sm">
                              Good length delivery outside off stump, the batsman defends it carefully.
                            </p>
                          </div>
                          <div className="border-l-2 border-red-500 pl-3 py-1">
                            <div className="text-xs font-semibold text-gray-500">Over 8.0</div>
                            <p className="text-sm">
                              <span className="font-bold">WICKET!</span> The bowler has done it! 
                              Beautiful delivery that clips the top of off stump. The batsman is bowled!
                            </p>
                          </div>
                          <div className="border-l-2 border-yellow-500 pl-3 py-1">
                            <div className="text-xs font-semibold text-gray-500">Over 7.5</div>
                            <p className="text-sm">
                              Short delivery, pulled away but straight to the fielder at mid-wicket.
                            </p>
                          </div>
                          <div className="border-l-2 border-cricket-600 pl-3 py-1">
                            <div className="text-xs font-semibold text-gray-500">Over 7.4</div>
                            <p className="text-sm">
                              <span className="font-bold">SIX!</span> What a shot! The batsman steps down the track
                              and lofts it over long-on for a massive six!
                            </p>
                          </div>
                          <div className="border-l-2 border-yellow-500 pl-3 py-1">
                            <div className="text-xs font-semibold text-gray-500">Over 7.3</div>
                            <p className="text-sm">
                              Good yorker on the stumps, dug out to mid-on for no run.
                            </p>
                          </div>
                          <div className="border-l-2 border-blue-500 pl-3 py-1">
                            <div className="text-xs font-semibold text-gray-500">Over 7.2</div>
                            <p className="text-sm">
                              <span className="font-bold">WIDE!</span> The ball slips out of the bowler's hand
                              and goes way down the leg side.
                            </p>
                          </div>
                          <div className="border-l-2 border-yellow-500 pl-3 py-1">
                            <div className="text-xs font-semibold text-gray-500">Over 7.1</div>
                            <p className="text-sm">
                              Fullish delivery on middle stump, driven to mid-off for a quick single.
                            </p>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="info">
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Match Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-gray-50 p-2 rounded-md">
                            <span className="text-gray-500 block">Venue</span>
                            <span className="font-medium">{match.venue}</span>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-md">
                            <span className="text-gray-500 block">Date</span>
                            <span className="font-medium">{match.date}</span>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-md">
                            <span className="text-gray-500 block">Format</span>
                            <span className="font-medium">
                              {tournament?.format || 'T20'}
                            </span>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-md">
                            <span className="text-gray-500 block">Toss</span>
                            <span className="font-medium">
                              {match.tossWinner 
                                ? `${match.tossWinner === team1.id ? team1.name : team2.name}, elected to ${match.tossDecision || 'bat'}`
                                : 'Upcoming'}
                            </span>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-md">
                            <span className="text-gray-500 block">Umpires</span>
                            <span className="font-medium">
                              {match.umpires?.join(', ') || 'TBA'}
                            </span>
                          </div>
                          <div className="bg-gray-50 p-2 rounded-md">
                            <span className="text-gray-500 block">Referee</span>
                            <span className="font-medium">
                              {match.referee || 'TBA'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Playing XI</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                                {team1.logoUrl ? (
                                  <img src={team1.logoUrl} alt={team1.name} className="w-4 h-4 object-contain" />
                                ) : (
                                  <span className="text-xs font-bold">{team1.shortName}</span>
                                )}
                              </div>
                              <span className="font-medium">{team1.name}</span>
                            </div>
                            <ul className="space-y-1 text-sm">
                              {team1.players.slice(0, 11).map(player => (
                                <li key={player.id} className="flex items-center gap-2">
                                  <span className="w-6 text-right text-xs text-gray-500">{player.jerseyNumber}</span>
                                  <span className="flex-1">{player.name}</span>
                                  {team1.captain === player.id && (
                                    <span className="text-xs text-cricket-600">(C)</span>
                                  )}
                                  {player.role === 'wicket-keeper' && (
                                    <span className="text-xs text-blue-600">(WK)</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                                {team2.logoUrl ? (
                                  <img src={team2.logoUrl} alt={team2.name} className="w-4 h-4 object-contain" />
                                ) : (
                                  <span className="text-xs font-bold">{team2.shortName}</span>
                                )}
                              </div>
                              <span className="font-medium">{team2.name}</span>
                            </div>
                            <ul className="space-y-1 text-sm">
                              {team2.players.slice(0, 11).map(player => (
                                <li key={player.id} className="flex items-center gap-2">
                                  <span className="w-6 text-right text-xs text-gray-500">{player.jerseyNumber}</span>
                                  <span className="flex-1">{player.name}</span>
                                  {team2.captain === player.id && (
                                    <span className="text-xs text-cricket-600">(C)</span>
                                  )}
                                  {player.role === 'wicket-keeper' && (
                                    <span className="text-xs text-blue-600">(WK)</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveMatches;
