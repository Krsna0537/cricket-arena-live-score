import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle, Filter, Search, RefreshCcw } from 'lucide-react';
import { fetchTournaments } from '@/services/tournamentService';
import { Tournament as TournamentType } from '@/integrations/supabase/database.types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
// Import the Badge from badge-cricket instead of the default badge
import { Badge } from "@/components/ui/badge-cricket";
import { format } from 'date-fns';
import { CreateTournamentDialog } from '@/components/tournaments/CreateTournamentDialog';
import { useAuth } from '@/hooks/useAuth';

const Tournaments = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Fetch tournaments
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['tournaments'],
    queryFn: fetchTournaments,
  });

  // Filter tournaments
  const filteredTournaments = data
    ?.filter((tournament) => {
      // Search by name or location
      if (searchQuery && !tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !tournament.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Filter by status
      if (statusFilter !== 'all' && tournament.status !== statusFilter) {
        return false;
      }

      // Filter by format
      if (formatFilter !== 'all' && tournament.format !== formatFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by status (upcoming first, then ongoing, then completed)
      const statusOrder = { upcoming: 1, ongoing: 2, completed: 3 };
      const statusA = statusOrder[a.status as keyof typeof statusOrder];
      const statusB = statusOrder[b.status as keyof typeof statusOrder];
      
      if (statusA !== statusB) {
        return statusA - statusB;
      }
      
      // Then sort by start_date (newest first)
      return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
          <p className="text-muted-foreground">
            View all cricket tournaments or create a new one
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => refetch()}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            disabled={!user}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Create Tournament
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tournaments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Status</span>
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger className="w-[140px]">
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Format</span>
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Formats</SelectItem>
              <SelectItem value="T20">T20</SelectItem>
              <SelectItem value="ODI">ODI</SelectItem>
              <SelectItem value="Test">Test</SelectItem>
              <SelectItem value="T10">T10</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tournament list */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-4/5 mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-10">
          <p className="text-red-500">Error loading tournaments</p>
          <Button onClick={() => refetch()} className="mt-2">
            Retry
          </Button>
        </div>
      ) : filteredTournaments && filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament: TournamentType) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No tournaments found</p>
        </div>
      )}

      {showCreateDialog && (
        <CreateTournamentDialog 
          open={showCreateDialog} 
          onOpenChange={setShowCreateDialog} 
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
};

const TournamentCard = ({ tournament }: { tournament: TournamentType }) => {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'secondary';
      case 'ongoing':
        return 'success';
      case 'completed':
        return 'outline';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{tournament.name}</CardTitle>
            <CardDescription>{tournament.location}</CardDescription>
          </div>
          <Badge variant={getBadgeVariant(tournament.status)}>
            {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Format:</span>
            <span className="text-sm font-medium">{tournament.format}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Start Date:</span>
            <span className="text-sm">{formatDate(tournament.start_date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">End Date:</span>
            <span className="text-sm">{formatDate(tournament.end_date)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full" asChild>
          <a href={`/tournaments/${tournament.id}`}>View Details</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Tournaments;
