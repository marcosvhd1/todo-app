import { statuses } from "@/app/todos/data/data";
import { Label } from "@/components/ui/label";
import { TableCell } from "@/components/ui/table";

interface DataTableStatusCellProps {
  todoStatus: string;
}

export function DataTableStatusCell({ todoStatus }: DataTableStatusCellProps) {
  return (
    <TableCell>
      {statuses.map((status) => {
        if (status.value === todoStatus) {
          const Icon = status.icon;
          return (
            <Label key={status.value} className="flex items-center">
              <Icon className="size-4 mr-2" />
              {status.label}
            </Label>
          );
        }
      })}
    </TableCell>
  );
}
