import { create } from "@/app/todos/actions";
import { ModalContent } from "@/app/todos/components/toolbar/modal/components/modal-content";
import { ModalFooter } from "@/app/todos/components/toolbar/modal/components/modal-footer";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

export function TodoModal() {
  const form = useForm<Todo>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Todo) => create(data),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <PlusCircle className="size-4 mr-2" />
          Create
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Todo Form</AlertDialogTitle>
        </AlertDialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
            <ModalContent />
            <ModalFooter />
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
