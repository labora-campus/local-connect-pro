import { mockPortals, currentUser } from '@/data/mockData';
import { PortalCard } from '@/components/portals/PortalCard';
import { Globe } from 'lucide-react';

export default function Portales() {
  const activePortals = mockPortals.filter(p => p.isActive);
  const inactivePortals = mockPortals.filter(p => !p.isActive);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-headline text-foreground">Portales</h1>
        <p className="text-muted-foreground">
          Portales activos en {currentUser.province}
        </p>
      </div>

      {/* Active Portals */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-title text-foreground">
            Portales activos ({activePortals.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activePortals.map((portal, index) => (
            <div
              key={portal.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PortalCard portal={portal} />
            </div>
          ))}
        </div>
      </div>

      {/* Inactive Portals */}
      {inactivePortals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-title text-muted-foreground">
            Próximamente ({inactivePortals.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inactivePortals.map((portal, index) => (
              <div
                key={portal.id}
                style={{ animationDelay: `${(activePortals.length + index) * 100}ms` }}
              >
                <PortalCard portal={portal} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total Stats */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Resumen de la provincia
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-3xl font-bold text-foreground">
              {mockPortals.reduce((acc, p) => acc + p.subscribersCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total suscriptores</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-3xl font-bold text-foreground">
              {activePortals.length}
            </div>
            <div className="text-sm text-muted-foreground">Portales activos</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-3xl font-bold text-foreground">
              {Math.round(mockPortals.reduce((acc, p) => acc + p.subscribersCount, 0) / activePortals.length)}
            </div>
            <div className="text-sm text-muted-foreground">Media por portal</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-3xl font-bold text-primary">
              {inactivePortals.length}
            </div>
            <div className="text-sm text-muted-foreground">Por activar</div>
          </div>
        </div>
      </div>
    </div>
  );
}
