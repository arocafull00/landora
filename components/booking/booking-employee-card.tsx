import { RadioGroupItem } from "@/components/ui/radio-group";

export function BookingEmployeeCard({
  employee,
}: {
  employee: { id: string; name: string };
}) {
  return (
    <RadioGroupItem value={employee.id}>
      {employee.name}
    </RadioGroupItem>
  );
}
