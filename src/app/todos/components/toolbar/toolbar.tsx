"use client";

import { Filter } from "@/app/todos/components/toolbar/components/filter";
import { TodoModalContent } from "@/app/todos/components/toolbar/modal/todo-modal";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "@prisma/client";
import { PlusCircle, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function Toolbar() {
  const form = useForm<Todo>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  form.setValue("title", searchParams.get("title") ?? "");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "") params.delete(name);
      else params.set(name, value);

      params.set("page", "1");

      return params.toString();
    },
    [searchParams]
  );

  const handleFilter = async (data: Todo) => {
    router.push(pathname + "?" + createQueryString("title", data.title));
  };

  return (
    <div className="flex justify-between items-center space-x-3">
      <form
        onSubmit={form.handleSubmit(handleFilter)}
        className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3"
      >
        <Input placeholder="Filter tasks..." {...form.register("title")} />
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
        <TodoModalContent />
      </AlertDialog>
    </div>
  );
}
