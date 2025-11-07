import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api, Car } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCar();
    }
  }, [id]);

  const loadCar = async () => {
    try {
      const data = await api.getCar(id!);
      setCar(data);
    } catch (error) {
      toast.error('Failed to load car');
      navigate('/cars');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this car?')) {
      try {
        await api.deleteCar(id!);
        toast.success('Car deleted successfully');
        navigate('/cars');
      } catch (error) {
        toast.error('Failed to delete car');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!car) return null;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/cars">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Link>
        </Button>

        <Card className="bg-gradient-carbon border-border shadow-card p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">{car.car_name}</h1>
              <p className="text-xl text-muted-foreground">{car.constructor}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-primary mb-1">#{car.car_number}</div>
              <div className="text-muted-foreground">{car.season}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">General Info</h2>
              <div className="space-y-3">
                <InfoRow label="Driver" value={car.driver} />
                <InfoRow label="Chassis Code" value={car.chassis_code} />
                <InfoRow label="Engine Supplier" value={car.engine_supplier} />
                <InfoRow label="Engine Type" value={car.engine_type} />
                <InfoRow label="Tyre Supplier" value={car.tyre_supplier} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-secondary">Performance</h2>
              <div className="space-y-3">
                <InfoRow label="Top Speed" value={`${car.top_speed_kmh} km/h`} />
                <InfoRow label="0-100 km/h" value={`${car.acceleration_0_100_kmh}s`} />
                <InfoRow label="RPM Limit" value={car.rpm_limit.toLocaleString()} />
                <InfoRow label="Downforce" value={`${car.downforce_kgf} kgf`} />
                <InfoRow label="Cornering G-Force" value={`${car.cornering_g_force}g`} />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-accent">Aerodynamics</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <InfoRow label="Front Wing" value={car.front_wing} />
              <InfoRow label="Rear Wing" value={car.rear_wing} />
              <InfoRow label="Floor Design" value={car.floor_design} />
              <InfoRow label="Diffuser" value={car.diffuser} />
              <InfoRow label="Sidepods" value={car.sidepods} />
              <InfoRow label="Halo" value={car.halo} />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Dimensions & Weight</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <InfoRow label="Length" value={`${car.length_m}m`} />
              <InfoRow label="Width" value={`${car.width_m}m`} />
              <InfoRow label="Height" value={`${car.height_m}m`} />
              <InfoRow label="Wheelbase" value={`${car.wheelbase_m}m`} />
              <InfoRow label="Minimum Weight" value={`${car.minimum_weight_kg}kg`} />
              <InfoRow label="Fuel Capacity" value={`${car.fuel_capacity_kg}kg`} />
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="racing" asChild>
              <Link to={`/cars/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Car
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Car
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between py-2 border-b border-border">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
