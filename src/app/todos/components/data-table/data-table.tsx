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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Todo } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ellipsis, Loader, SquarePen, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(50);

  const { data, isLoading } = useQuery({
    queryKey: ["todos", title],
    queryFn: () => getAll(title),
  });

  const lastDataIndex = currentPage * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;

  const currentTodos = Array.isArray(data)
    ? data.slice(firstDataIndex, lastDataIndex)
    : [];

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
            {Array.isArray(currentTodos) ? (
              currentTodos.map((todo: Todo) => {
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
      <DataTablePagination
        totalData={data !== undefined ? data.length : 0}
        currentPage={currentPage}
        dataPerPage={dataPerPage}
        setCurrentPage={setCurrentPage}
        setDataPerPage={setDataPerPage}
      />
    </>
  );
}
