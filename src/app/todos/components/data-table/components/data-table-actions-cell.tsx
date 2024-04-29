import { getById, upsert } from "@/app/todos/actions/actions";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ellipsis, SquarePen, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { TodoModal } from "../../modal/todo-modal";

interface DataTableActionsCellProps {
  todoId: number;
  removeFunction: Function;
}

export function DataTableActionsCell({
  todoId,
  removeFunction,
}: DataTableActionsCellProps) {
  const form = useForm<Todo>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: Todo) => upsert(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  async function setModalFieldsData() {
    const todo = await getById(todoId);

    if (todo) {
      form.setValue("id", todo.id);
      form.setValue("title", todo.title);
      form.setValue("status", todo.status);
      form.setValue("priority", todo.priority);

      document.getElementById("edit")?.click();
    }
  }

  function handleEdit(data: any) {
    updateMutation.mutate(data);

    toast({
      description: "The register has been updated!",
    });
  }

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
          <DropdownMenuItem onClick={setModalFieldsData}>
            <SquarePen className="text-amber-500 size-4 mr-2" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog>
        <AlertDialogTrigger>
          <span id="edit"></span>
        </AlertDialogTrigger>
        <TodoModal form={form} onSubmit={handleEdit} />
      </AlertDialog>
    </TableCell>
  );
}
