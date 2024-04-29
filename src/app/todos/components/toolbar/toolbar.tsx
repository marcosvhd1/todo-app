"use client";

import { TodoModal } from "@/app/todos/components/modal/todo-modal";
import { Filter } from "@/app/todos/components/toolbar/components/filter";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { create } from "../../actions/actions";

export function Toolbar() {
  const form = useForm<Todo>();

  const pathname = usePathname();
  const { replace } = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const mutation = useMutation({
    mutationFn: (data: Todo) => create(data),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const handleFilter = async (data: Todo) => {
    const params = new URLSearchParams(searchParams);

    if (data.title !== "") params.set("title", data.title);
    else params.delete("title");

    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center space-x-3">
      <form
        onSubmit={form.handleSubmit(handleFilter)}
        className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3"
      >
        <Input
          placeholder="Filter tasks..."
          defaultValue={searchParams.get("title") ?? ""}
          {...form.register("title")}
        />
        <Filter title="Status" />
        <Filter title="Priority" />
        <Button type="submit">
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
        <TodoModal onSubmit={mutation.mutate} />
      </AlertDialog>
    </div>
  );
}
