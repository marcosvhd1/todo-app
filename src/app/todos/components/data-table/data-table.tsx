"use client";

import { getAll, remove } from "@/app/todos/actions/actions";
import { priorities, statuses } from "@/app/todos/data/data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Todo } from "@prisma/client";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Ellipsis,
  Loader,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

const headers: { key: string; label: string }[] = [
  { key: "id", label: "Task" },
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "actions", label: "" },
];

export function DataTable() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const { data, isLoading } = useQuery({
    queryKey: ["todos", title],
    queryFn: () => getAll(title),
  });

  const mutation = useMutation({
    mutationFn: (todoId: number) => remove(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", title] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-5">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((row) => {
                return <TableHead key={row.key}>{row.label}</TableHead>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(data) ? (
              data.map((todo: Todo) => {
                return (
                  <TableRow key={todo.id}>
                    <TableCell>TASK-{todo.id}</TableCell>
                    <TableCell className="font-semibold text-base sm:max-w-[20rem] sm:whitespace-nowrap sm:truncate">
                      {todo.title}
                    </TableCell>
                    <TableCell>
                      {statuses.map((status) => {
                        if (status.value === todo.status) {
                          const Icon = status.icon;
                          return (
                            <Label
                              key={status.value}
                              className="flex items-center"
                            >
                              <Icon className="size-4 mr-2" />
                              {status.label}
                            </Label>
                          );
                        }
                      })}
                    </TableCell>
                    <TableCell>
                      {priorities.map((priority) => {
                        if (priority.value === todo.priority) {
                          const Icon = priority.icon;
                          return (
                            <Label
                              key={priority.value}
                              className="flex items-center"
                            >
                              <Icon className="size-4 mr-2" />
                              {priority.label}
                            </Label>
                          );
                        }
                      })}
                    </TableCell>
                    <TableCell className="w-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <Ellipsis className="size-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-2 space-y-2">
                          <DropdownMenuItem
                            onClick={() => mutation.mutate(todo.id)}
                          >
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
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell>No data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center pt-5">
        <div className="flex items-center text-nowrap space-x-3">
          <Label className="text-base font-semibold">Rows per page</Label>
          <Select>
            <SelectTrigger className="px-4 w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-nowrap">
          <Label className="text-base font-semibold">Page 1 of 10</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="h-8 w-8 p-0">
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
