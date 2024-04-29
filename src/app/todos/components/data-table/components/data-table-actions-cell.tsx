import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { Ellipsis, SquarePen, Trash2 } from "lucide-react";

interface DataTableActionsCellProps {
  todoId: number;
  removeFunction: Function;
  editFunction: Function;
}

export function DataTableActionsCell({
  todoId,
  removeFunction,
  editFunction,
}: DataTableActionsCellProps) {
  return (
    <TableCell className="w-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Ellipsis className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 space-y-2">
          <DropdownMenuItem onClick={() => removeFunction(todoId)}>
            <Trash2 className="text-red-500 size-4 mr-2" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SquarePen className="text-amber-500 size-4 mr-2" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
}
