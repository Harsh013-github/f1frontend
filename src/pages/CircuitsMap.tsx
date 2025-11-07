import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const F1_CIRCUITS = [
  { name: 'Bahrain International Circuit', country: 'Bahrain', length: '5.412 km', turns: 15 },
  { name: 'Jeddah Corniche Circuit', country: 'Saudi Arabia', length: '6.174 km', turns: 27 },
  { name: 'Albert Park Circuit', country: 'Australia', length: '5.278 km', turns: 14 },
  { name: 'Suzuka Circuit', country: 'Japan', length: '5.807 km', turns: 18 },
  { name: 'Shanghai International Circuit', country: 'China', length: '5.451 km', turns: 16 },
  { name: 'Miami International Autodrome', country: 'USA', length: '5.410 km', turns: 19 },
  { name: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', length: '4.909 km', turns: 19 },
  { name: 'Circuit de Monaco', country: 'Monaco', length: '3.337 km', turns: 19 },
  { name: 'Circuit de Barcelona-Catalunya', country: 'Spain', length: '4.675 km', turns: 16 },
  { name: 'Circuit Gilles Villeneuve', country: 'Canada', length: '4.361 km', turns: 14 },
  { name: 'Red Bull Ring', country: 'Austria', length: '4.318 km', turns: 10 },
  { name: 'Silverstone Circuit', country: 'UK', length: '5.891 km', turns: 18 },
  { name: 'Hungaroring', country: 'Hungary', length: '4.381 km', turns: 14 },
  { name: 'Circuit de Spa-Francorchamps', country: 'Belgium', length: '7.004 km', turns: 19 },
  { name: 'Circuit Zandvoort', country: 'Netherlands', length: '4.259 km', turns: 14 },
  { name: 'Autodromo Nazionale di Monza', country: 'Italy', length: '5.793 km', turns: 11 },
  { name: 'Marina Bay Street Circuit', country: 'Singapore', length: '4.940 km', turns: 19 },
  { name: 'Circuit of the Americas', country: 'USA', length: '5.513 km', turns: 20 },
  { name: 'Autódromo Hermanos Rodríguez', country: 'Mexico', length: '4.304 km', turns: 17 },
  { name: 'Autódromo José Carlos Pace', country: 'Brazil', length: '4.309 km', turns: 15 },
  { name: 'Las Vegas Street Circuit', country: 'USA', length: '6.201 km', turns: 17 },
  { name: 'Yas Marina Circuit', country: 'UAE', length: '5.281 km', turns: 16 },
];

export default function CircuitsMap() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-racing bg-clip-text text-transparent">
          F1 Circuits Gallery
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Explore Formula 1 race tracks around the world
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {F1_CIRCUITS.map((circuit, index) => (
            <Card key={`${circuit.name}-${index}`} className="overflow-hidden hover:shadow-racing transition-shadow">
              <div className="aspect-video bg-gradient-carbon relative flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-full h-32 flex items-center justify-center mb-4">
                    <svg viewBox="0 0 200 120" className="w-full h-full">
                      <path
                        d={`M ${20 + Math.random() * 20} ${60 + Math.random() * 20} Q ${50 + Math.random() * 30} ${20 + Math.random() * 20}, ${100 + Math.random() * 30} ${40 + Math.random() * 20} T ${180 - Math.random() * 20} ${60 + Math.random() * 20} Q ${150 + Math.random() * 20} ${100 - Math.random() * 20}, ${100 - Math.random() * 30} ${80 + Math.random() * 20} T ${20 + Math.random() * 20} ${60 + Math.random() * 20}`}
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle cx={20 + Math.random() * 20} cy={60 + Math.random() * 20} r="5" fill="hsl(var(--primary))" />
                    </svg>
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    {circuit.turns} Turns
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-foreground mb-2">{circuit.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{circuit.country}</span>
                  <Badge variant="outline">{circuit.length}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
