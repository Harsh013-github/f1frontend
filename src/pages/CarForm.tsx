import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api, Car } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function CarForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCar, setIsLoadingCar] = useState(!!id && id !== 'new');
  const [formData, setFormData] = useState<Partial<Car>>({});

  useEffect(() => {
    if (id && id !== 'new') {
      loadCar();
    }
  }, [id]);

  const loadCar = async () => {
    try {
      const data = await api.getCar(id!);
      setFormData(data);
    } catch (error) {
      toast.error('Failed to load car');
      navigate('/cars');
    } finally {
      setIsLoadingCar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id && id !== 'new') {
        await api.updateCar(id, formData);
        toast.success('Car updated successfully');
      } else {
        await api.createCar(formData);
        toast.success('Car created successfully');
      }
      navigate('/cars');
    } catch (error) {
      toast.error('Failed to save car');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof Car, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoadingCar) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/cars">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Link>
        </Button>

        <Card className="bg-gradient-carbon border-border shadow-card p-8">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-racing bg-clip-text text-transparent">
            {id && id !== 'new' ? 'Edit Car' : 'Add New Car'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Car ID"
                  value={formData.car_id || ''}
                  onChange={(v) => handleChange('car_id', v)}
                  required
                />
                <FormField
                  label="Car Name"
                  value={formData.car_name || ''}
                  onChange={(v) => handleChange('car_name', v)}
                  required
                />
                <FormField
                  label="Constructor"
                  value={formData.constructor || ''}
                  onChange={(v) => handleChange('constructor', v)}
                  required
                />
                <FormField
                  label="Season"
                  value={formData.season || ''}
                  onChange={(v) => handleChange('season', v)}
                  required
                />
                <FormField
                  label="Driver"
                  value={formData.driver || ''}
                  onChange={(v) => handleChange('driver', v)}
                  required
                />
                <FormField
                  label="Car Number"
                  type="number"
                  value={formData.car_number || ''}
                  onChange={(v) => handleChange('car_number', Number(v))}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-secondary">Technical Specifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Chassis Code"
                  value={formData.chassis_code || ''}
                  onChange={(v) => handleChange('chassis_code', v)}
                />
                <FormField
                  label="Engine Supplier"
                  value={formData.engine_supplier || ''}
                  onChange={(v) => handleChange('engine_supplier', v)}
                />
                <FormField
                  label="Engine Type"
                  value={formData.engine_type || ''}
                  onChange={(v) => handleChange('engine_type', v)}
                />
                <FormField
                  label="RPM Limit"
                  type="number"
                  value={formData.rpm_limit || ''}
                  onChange={(v) => handleChange('rpm_limit', Number(v))}
                />
                <FormField
                  label="Tyre Supplier"
                  value={formData.tyre_supplier || ''}
                  onChange={(v) => handleChange('tyre_supplier', v)}
                />
                <FormField
                  label="Chassis Material"
                  value={formData.chassis_material || ''}
                  onChange={(v) => handleChange('chassis_material', v)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-accent">Performance</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Top Speed (km/h)"
                  type="number"
                  value={formData.top_speed_kmh || ''}
                  onChange={(v) => handleChange('top_speed_kmh', Number(v))}
                />
                <FormField
                  label="0-100 km/h (seconds)"
                  type="number"
                  step="0.1"
                  value={formData.acceleration_0_100_kmh || ''}
                  onChange={(v) => handleChange('acceleration_0_100_kmh', Number(v))}
                />
                <FormField
                  label="Downforce (kgf)"
                  type="number"
                  value={formData.downforce_kgf || ''}
                  onChange={(v) => handleChange('downforce_kgf', Number(v))}
                />
                <FormField
                  label="Cornering G-Force"
                  type="number"
                  step="0.1"
                  value={formData.cornering_g_force || ''}
                  onChange={(v) => handleChange('cornering_g_force', Number(v))}
                />
              </div>
            </div>

            <Button variant="racing" type="submit" size="lg" disabled={isLoading}>
              {isLoading ? 'Saving...' : id && id !== 'new' ? 'Update Car' : 'Create Car'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = 'text',
  step,
  required = false,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  step?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}
