import { useEffect, useState } from 'react';
import { api, Car } from '@/lib/api';
import { compareCars } from '@/lib/analytics';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export default function Compare() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar1, setSelectedCar1] = useState<string>('');
  const [selectedCar2, setSelectedCar2] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const data = await api.getCars();
      setCars(data);
      if (data.length >= 2) {
        setSelectedCar1(data[0].car_id);
        setSelectedCar2(data[1].car_id);
      }
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

  const car1 = cars.find(c => c.car_id === selectedCar1);
  const car2 = cars.find(c => c.car_id === selectedCar2);
  const compared = car1 && car2 ? compareCars([car1, car2]) : [];

  const ComparisonRow = ({ label, value1, value2, unit = '' }: { label: string; value1: number | string; value2: number | string; unit?: string }) => {
    const isNumeric = typeof value1 === 'number' && typeof value2 === 'number';
    const better1 = isNumeric && value1 > value2;
    const better2 = isNumeric && value2 > value1;

    return (
      <div className="grid grid-cols-3 gap-4 py-3 border-b border-border">
        <div className={`text-right font-semibold ${better1 ? 'text-primary' : 'text-foreground'}`}>
          {value1}{unit}
        </div>
        <div className="text-center text-muted-foreground">{label}</div>
        <div className={`text-left font-semibold ${better2 ? 'text-primary' : 'text-foreground'}`}>
          {value2}{unit}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-racing bg-clip-text text-transparent">
          Car Comparison
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Compare performance metrics side by side
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-carbon border-border shadow-card p-6">
            <label className="text-sm text-muted-foreground mb-2 block">Select First Car</label>
            <Select value={selectedCar1} onValueChange={setSelectedCar1}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cars.map(car => (
                  <SelectItem key={car.car_id} value={car.car_id}>
                    {car.car_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          <Card className="bg-gradient-carbon border-border shadow-card p-6">
            <label className="text-sm text-muted-foreground mb-2 block">Select Second Car</label>
            <Select value={selectedCar2} onValueChange={setSelectedCar2}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cars.map(car => (
                  <SelectItem key={car.car_id} value={car.car_id}>
                    {car.car_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>
        </div>

        {car1 && car2 && (
          <Card className="bg-gradient-carbon border-border shadow-card p-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <h2 className="text-2xl font-bold text-primary text-right">{car1.car_name}</h2>
              <div className="text-center text-muted-foreground">VS</div>
              <h2 className="text-2xl font-bold text-secondary text-left">{car2.car_name}</h2>
            </div>

            <div className="space-y-2">
              <ComparisonRow label="Top Speed" value1={car1.top_speed_kmh} value2={car2.top_speed_kmh} unit=" km/h" />
              <ComparisonRow label="0-100 km/h" value1={car1.acceleration_0_100_kmh} value2={car2.acceleration_0_100_kmh} unit="s" />
              <ComparisonRow label="Downforce" value1={car1.downforce_kgf} value2={car2.downforce_kgf} unit=" kgf" />
              <ComparisonRow label="G-Force" value1={car1.cornering_g_force} value2={car2.cornering_g_force} unit="g" />
              <ComparisonRow label="RPM Limit" value1={car1.rpm_limit} value2={car2.rpm_limit} />
              <ComparisonRow label="Weight" value1={car1.minimum_weight_kg} value2={car2.minimum_weight_kg} unit=" kg" />
              <ComparisonRow label="Wheelbase" value1={car1.wheelbase_m} value2={car2.wheelbase_m} unit="m" />
              <ComparisonRow label="Overall Score" value1={compared[0].performance.overallScore} value2={compared[1].performance.overallScore} />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
