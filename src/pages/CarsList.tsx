import { useEffect, useState } from 'react';
import { api, Car } from '@/lib/api';
import CarCard from '@/components/CarCard';
import { Loader2 } from 'lucide-react';

export default function CarsList() {
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

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-racing bg-clip-text text-transparent">
            F1 Cars Collection
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore the finest racing machines in Formula 1
          </p>
        </div>

        {cars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No cars found. Add your first car to get started!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car.car_id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
