import { priorities } from "@/app/todos/data/data";
import { Label } from "@/components/ui/label";
import { TableCell } from "@/components/ui/table";

interface DataTablePriorityCellProps {
  todoPriority: string;
}

export function DataTablePriorityCell({
  todoPriority,
}: DataTablePriorityCellProps) {
  return (
    <TableCell>
      {priorities.map((priority) => {
        if (priority.value === todoPriority) {
          const Icon = priority.icon;
          return (
            <Label key={priority.value} className="flex items-center">
              <Icon className="size-4 mr-2" />
              {priority.label}
            </Label>
          );
        }
      })}
    </TableCell>
  );
}
