import { ReactNode, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  LogOut,
  LayoutDashboard,
  Users,
  Globe,
  Menu,
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  DollarSign,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/leads', label: 'Leads', icon: Users },
  { path: '/portales', label: 'Portales', icon: Globe },
  { path: '/ventas', label: 'Ventas', icon: ShoppingBag },
  { path: '/comisiones', label: 'Comisiones', icon: DollarSign },
  { path: '/agenda', label: 'Agenda', icon: Calendar },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 hidden lg:flex flex-col",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-full shrink-0">
                <img src="/logo.png" alt="Multicentros Logo" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h1 className="text-sidebar-foreground font-semibold">Multicentros</h1>
                <p className="text-xs text-sidebar-foreground/60">CRM</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Province Badge */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-b border-sidebar-border">
            <div className="flex items-center gap-2 text-sidebar-foreground/80 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Provincia: {currentUser.province}</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                  sidebarCollapsed && "justify-center"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-sidebar-foreground font-medium">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {currentUser.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-sidebar-foreground hover:text-red-500 hover:bg-sidebar-accent"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Multicentros Logo" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-foreground">Multicentros</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4" />
          <span>{currentUser.province}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="ml-1 text-muted-foreground hover:text-red-500"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden bottom-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn("bottom-nav-item", isActive && "active")}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          "pt-16 pb-24 lg:pt-0 lg:pb-0",
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"
        )}
      >
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
