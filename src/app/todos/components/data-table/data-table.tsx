"use client";

import { getAll, remove } from "@/app/todos/actions";
import { headers } from "@/app/todos/components/data-table/headers";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="text-xs">
            {headers.map((row) => {
              return <TableHead key={row.key}>{row.label}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {Array.isArray(data) ? (
            data.map((todo: Todo) => {
              return (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>{todo.status}</TableCell>
                  <TableCell>{todo.priority}</TableCell>
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
  );
}
