import type { AdminUsersStats } from "@/lib/admin-user-display";
import { UsersStatCard } from "@/components/admin/users-stat-card";

export function UsersStatsBar({ stats }: { stats: AdminUsersStats }) {
  const activePercent =
    stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0;
  const trialPercent =
    stats.total > 0 ? Math.round((stats.trial / stats.total) * 100) : 0;
  const expiredPercent =
    stats.total > 0 ? Math.round((stats.expired / stats.total) * 100) : 0;
  const manualPercent =
    stats.total > 0 ? Math.round((stats.manual / stats.total) * 100) : 0;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      <UsersStatCard label="Clientes" value={stats.total} />
      <UsersStatCard
        detail={`${activePercent}%`}
        label="Activos"
        value={stats.active}
      />
      <UsersStatCard
        detail={`${trialPercent}%`}
        label="Trial"
        value={stats.trial}
      />
      <UsersStatCard
        detail={`${expiredPercent}%`}
        label="Vencidos"
        value={stats.expired}
      />
      <UsersStatCard
        detail={`${manualPercent}%`}
        label="Acceso manual"
        value={stats.manual}
      />
      <UsersStatCard
        detail="total"
        label="Landings publicadas"
        value={stats.publishedLandings}
      />
    </div>
  );
}
