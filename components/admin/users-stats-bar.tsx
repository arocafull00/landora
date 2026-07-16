import type { AdminUsersStats } from "@/lib/admin-user-display";
import { UsersStatCard } from "@/components/admin/users-stat-card";
import {
  CircleAlert,
  CircleCheck,
  Clock3,
  Globe2,
  KeyRound,
  Users,
} from "lucide-react";

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
    <section
      aria-label="Resumen de usuarios"
      className="grid overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest sm:grid-cols-2 xl:grid-cols-6 [&>*]:border-outline-variant [&>*:not(:last-child)]:border-b sm:[&>*:not(:last-child)]:border-b-0 sm:[&>*:not(:nth-child(2n))]:border-r xl:[&>*:not(:last-child)]:border-r xl:[&>*:nth-child(2n)]:border-r"
    >
      <UsersStatCard icon={Users} label="Clientes" value={stats.total} />
      <UsersStatCard
        detail={`${activePercent}%`}
        icon={CircleCheck}
        label="Activos"
        value={stats.active}
      />
      <UsersStatCard
        detail={`${trialPercent}%`}
        icon={Clock3}
        label="Trial"
        value={stats.trial}
      />
      <UsersStatCard
        detail={`${expiredPercent}%`}
        icon={CircleAlert}
        label="Vencidos"
        value={stats.expired}
      />
      <UsersStatCard
        detail={`${manualPercent}%`}
        icon={KeyRound}
        label="Acceso manual"
        value={stats.manual}
      />
      <UsersStatCard
        detail="total"
        icon={Globe2}
        label="Landings publicadas"
        value={stats.publishedLandings}
      />
    </section>
  );
}
