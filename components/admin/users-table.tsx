import { UserTableRow } from "@/components/admin/user-table-row";
import type { AdminUserWithLanding } from "@/lib/admin-user-display";

const TABLE_HEADERS = [
  "Usuario",
  "Plan",
  "Estado",
  "Próximo pago",
  "Sitio web",
  "Acceso",
  "Acciones",
] as const;

export function UsersTable({ users }: { users: AdminUserWithLanding[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-outline-variant bg-surface-container-lowest">
      <table className="w-full min-w-[880px] border-collapse">
        <thead>
          <tr className="border-b border-outline-variant bg-surface-container-low/70">
            {TABLE_HEADERS.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-label text-label-md uppercase text-on-surface-variant"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserTableRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
