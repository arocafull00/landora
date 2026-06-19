import { DashboardSectionLoadingSkeleton } from "@/components/dashboard/dashboard-section-loading-skeleton";

export default function EmployeesLoading() {
  return (
    <DashboardSectionLoadingSkeleton
      title="Empleados"
      description="Gestiona profesionales, horarios y servicios asignados."
    />
  );
}
