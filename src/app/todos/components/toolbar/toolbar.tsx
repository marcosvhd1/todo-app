"use client";

import { upsert } from "@/app/todos/actions/actions";
import { TodoModal } from "@/app/todos/components/modal/todo-modal";
import { priorities, statuses } from "@/app/todos/data/data";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export function Toolbar() {
  const form = useForm<Todo>();
  const filterForm = useForm<Todo>();
  const { toast } = useToast();

  const pathname = usePathname();
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const mutation = useMutation({
    mutationFn: (data: Todo) => upsert(data),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const handleCreate = async (data: Todo) => {
    data.id = -1;

    mutation.mutate(data);

    toast({
      description: "The register has been created!",
    });
  };

  const handleFilter = async (data: Todo) => {
    const params = new URLSearchParams(searchParams);

    if (data.title !== "") params.set("title", data.title);
    else params.delete("title");

    if (data.status !== " ") params.set("status", data.status);
    else params.delete("status");

    if (data.priority !== " ") params.set("priority", data.priority);
    else params.delete("priority");

    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center space-x-3">
      <form
        onSubmit={filterForm.handleSubmit(handleFilter)}
        className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 w-full"
      >
        <Input
          className="max-w-52 sm:max-w-80"
          placeholder="Filter tasks..."
          defaultValue={searchParams.get("title") ?? ""}
          {...filterForm.register("title")}
        />
        <FormField
          name="status"
          control={filterForm.control}
          defaultValue={" "}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="max-w-52">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Select status</SelectItem>
                {statuses.map((status) => {
                  return (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        <FormField
          name="priority"
          control={filterForm.control}
          defaultValue={" "}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="max-w-52">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Select priority</SelectItem>
                {priorities.map((priority) => {
                  return (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        <Button type="submit" variant="secondary" className="max-w-52">
          <Search className="size-4 mr-2" />
          Search
        </Button>
      </form>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>
            <PlusCircle className="size-4 mr-2" />
            Create
          </Button>
        </AlertDialogTrigger>
        <TodoModal form={form} onSubmit={handleCreate} />
      </AlertDialog>
    </div>
  );
}
