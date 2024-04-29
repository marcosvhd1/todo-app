import { create } from "@/app/todos/actions/actions";
import { ModalContent } from "@/app/todos/components/toolbar/modal/components/modal-content";
import { ModalFooter } from "@/app/todos/components/toolbar/modal/components/modal-footer";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

export function TodoModalContent() {
  const form = useForm<Todo>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Todo) => create(data),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return (
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
  );
}
