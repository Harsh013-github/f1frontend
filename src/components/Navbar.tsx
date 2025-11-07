import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Flag, LogOut, Plus } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Flag className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold bg-gradient-racing bg-clip-text text-transparent">
            F1 Manager
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/cars">Cars</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/leaderboard">Leaderboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/compare">Compare</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/circuits">Circuits</Link>
              </Button>
              <Button variant="racing" asChild>
                <Link to="/cars/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Car
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="racing" asChild>
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
