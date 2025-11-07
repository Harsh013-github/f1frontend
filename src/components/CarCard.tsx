import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car } from '@/lib/api';
import { ChevronRight, Gauge, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Card className="group overflow-hidden bg-gradient-carbon border-border hover:border-primary/50 transition-all duration-300 hover:shadow-racing">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {car.car_name}
            </h3>
            <p className="text-muted-foreground">{car.constructor}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">#{car.car_number}</div>
            <div className="text-sm text-muted-foreground">{car.season}</div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Driver</span>
            <span className="font-semibold text-foreground">{car.driver}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Engine</span>
            <span className="font-semibold text-foreground">{car.engine_supplier}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-background/50 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 text-secondary mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs text-muted-foreground">Top Speed</span>
            </div>
            <div className="text-lg font-bold text-foreground">{car.top_speed_kmh} km/h</div>
          </div>
          <div className="bg-background/50 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 text-accent mb-1">
              <Gauge className="h-4 w-4" />
              <span className="text-xs text-muted-foreground">0-100</span>
            </div>
            <div className="text-lg font-bold text-foreground">{car.acceleration_0_100_kmh}s</div>
          </div>
        </div>

        <Button variant="racing" className="w-full group" asChild>
          <Link to={`/cars/${car.car_id}`}>
            View Details
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
