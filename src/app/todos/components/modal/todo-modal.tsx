import { ModalContent } from "@/app/todos/components/modal/components/modal-content";
import { ModalFooter } from "@/app/todos/components/modal/components/modal-footer";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { Todo } from "../../../../../prisma/generated/client";

interface TodoModalProps {
  form: UseFormReturn<Todo, any, undefined>;
  onSubmit: Function;
}

export function TodoModal({ form, onSubmit }: TodoModalProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Todo Form</AlertDialogTitle>
      </AlertDialogHeader>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
          <ModalContent />
          <ModalFooter />
        </form>
      </FormProvider>
    </AlertDialogContent>
  );
}
