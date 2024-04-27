import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Todo } from "@prisma/client";
import { Ban, Check, PlusCircle } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContent } from "./components/modal-content";

export function TodoModal() {
  const form = useForm<Todo>();

  async function handleSubmit(data: Todo) {
    console.log(data);
  }

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
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ModalContent />
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Ban className="size-4 mr-2" />
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction type="submit">
                <Check className="size-4 mr-2" />
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
