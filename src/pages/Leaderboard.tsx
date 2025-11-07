import { useEffect, useState } from 'react';
import { api, Car } from '@/lib/api';
import { generateLeaderboard, LeaderboardEntry } from '@/lib/analytics';
import { Card } from '@/components/ui/card';
import { Loader2, Medal, Trophy, Award } from 'lucide-react';

export default function Leaderboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const data = await api.getCars();
      setCars(data);
      const rankings = generateLeaderboard(data);
      setLeaderboard(rankings);
    } catch (error) {
      console.error('Failed to load cars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-700" />;
    return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-racing bg-clip-text text-transparent">
          Championship Leaderboard
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Rankings based on overall performance scores
        </p>

        <div className="space-y-4">
          {leaderboard.map((entry) => (
            <Card 
              key={entry.carId} 
              className={`bg-gradient-carbon border-border shadow-card p-6 hover:shadow-racing transition-all ${
                entry.rank <= 3 ? 'border-primary/50' : ''
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-16 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-1">{entry.carName}</h3>
                  <p className="text-muted-foreground">{entry.constructor}</p>
                </div>

                <div className="grid grid-cols-4 gap-4 flex-1">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Speed</p>
                    <p className="text-lg font-bold text-primary">{entry.speedScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Acceleration</p>
                    <p className="text-lg font-bold text-secondary">{entry.accelerationScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Aero</p>
                    <p className="text-lg font-bold text-accent">{entry.aerodynamicsScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Efficiency</p>
                    <p className="text-lg font-bold text-primary">{entry.efficiencyScore}</p>
                  </div>
                </div>

                <div className="flex-shrink-0 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Overall</p>
                  <p className="text-4xl font-bold bg-gradient-racing bg-clip-text text-transparent">
                    {entry.overallScore}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
