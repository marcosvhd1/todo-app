import { getById, remove, upsert } from "@/app/todos/actions/actions";
import { TodoModal } from "@/app/todos/components/modal/todo-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, Check, Ellipsis, SquarePen, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Todo } from "../../../../../../prisma/generated/client";

interface DataTableActionsCellProps {
  todoId: number;
}

export function DataTableActionsCell({ todoId }: DataTableActionsCellProps) {
  const form = useForm<Todo>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: (todoId: number) => remove(todoId),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Todo) => upsert(data),
    onSuccess: () => queryClient.invalidateQueries(),
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

  async function handleRemove() {
    removeMutation.mutate(todoId);

    toast({
      variant: "destructive",
      description: "The register has been deleted!",
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
          <DropdownMenuItem
            onClick={() => document.getElementById("remove")?.click()}
          >
            <Trash2 className="text-red-500 size-4 mr-2" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={setModalFieldsData}>
            <SquarePen className="text-amber-500 size-4 mr-2" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* MODAL DELETE */}
      <AlertDialog>
        <AlertDialogTrigger>
          <span id="remove"></span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the register?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-5">
            <AlertDialogCancel>
              <Ban className="size-4 mr-2" />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="bg-red-500 text-white"
            >
              <Check className="size-4 mr-2" />
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* MODAL EDIT */}
      <AlertDialog>
        <AlertDialogTrigger>
          <span id="edit"></span>
        </AlertDialogTrigger>
        <TodoModal form={form} onSubmit={handleEdit} />
      </AlertDialog>
    </TableCell>
  );
}
