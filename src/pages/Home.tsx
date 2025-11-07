import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Flag, Zap, Gauge, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Flag className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Formula 1 Car Database</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-racing bg-clip-text text-transparent">
              The Ultimate F1 Manager
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore, manage, and discover the most advanced racing machines in Formula 1. 
              From technical specifications to performance data.
            </p>

            <div className="flex gap-4 justify-center">
              {isAuthenticated ? (
                <Button variant="racing" size="lg" asChild>
                  <Link to="/cars">
                    <Zap className="mr-2 h-5 w-5" />
                    View Cars
                  </Link>
                </Button>
              ) : (
                <Button variant="racing" size="lg" asChild>
                  <Link to="/auth">
                    Get Started
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-carbon">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors">
                <Gauge className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Data</h3>
              <p className="text-muted-foreground">
                Access detailed specs including top speed, acceleration, and downforce metrics
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 mb-4 group-hover:bg-secondary/20 transition-colors">
                <Zap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Technical Specs</h3>
              <p className="text-muted-foreground">
                Explore engine types, chassis materials, and aerodynamic configurations
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-4 group-hover:bg-accent/20 transition-colors">
                <Trophy className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Complete Management</h3>
              <p className="text-muted-foreground">
                Add, edit, and manage F1 cars with a comprehensive database system
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
