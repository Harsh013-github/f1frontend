import { useEffect, useState } from 'react';
import { api, Car } from '@/lib/api';
import { calculateAverageStats } from '@/lib/analytics';
import { Card } from '@/components/ui/card';
import { Loader2, Trophy, Zap, Wind, Weight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

export default function Dashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const data = await api.getCars();
      setCars(data);
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

  const stats = calculateAverageStats(cars);

  const speedData = cars.map(car => ({
    name: car.car_name.split(' ').pop(),
    speed: car.top_speed_kmh,
  }));

  const radarData = cars.slice(0, 3).map(car => [
    { metric: 'Speed', value: (car.top_speed_kmh / 370) * 100, fullMark: 100 },
    { metric: 'Acceleration', value: (3 / car.acceleration_0_100_kmh) * 100, fullMark: 100 },
    { metric: 'Downforce', value: (car.downforce_kgf / 3500) * 100, fullMark: 100 },
    { metric: 'G-Force', value: (car.cornering_g_force / 7) * 100, fullMark: 100 },
    { metric: 'RPM', value: (car.rpm_limit / 16000) * 100, fullMark: 100 },
  ]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-racing bg-clip-text text-transparent">
          Performance Analytics
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Real-time insights and performance metrics
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-carbon border-border shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Cars</p>
                <p className="text-3xl font-bold text-foreground">{stats?.totalCars || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-carbon border-border shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Avg Top Speed</p>
                <p className="text-3xl font-bold text-foreground">{stats?.avgTopSpeed || 0} km/h</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-carbon border-border shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Wind className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Avg Downforce</p>
                <p className="text-3xl font-bold text-foreground">{stats?.avgDownforce || 0} kgf</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-carbon border-border shadow-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Weight className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Avg Weight</p>
                <p className="text-3xl font-bold text-foreground">{stats?.avgWeight || 0} kg</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-carbon border-border shadow-card p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Top Speed Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={speedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="speed" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-gradient-carbon border-border shadow-card p-6">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Performance Radar</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData[0]}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                <Radar name={cars[0]?.car_name} dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                {radarData[1] && (
                  <Radar name={cars[1]?.car_name} dataKey="value" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.6} />
                )}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}
