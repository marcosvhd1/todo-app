"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TodoService } from "@/services/todo/todo-service";
import { Todo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function Content() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const { data, isLoading } = useQuery({
    queryKey: ["todos", title],
    queryFn: () => TodoService.getAll(title),
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
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
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
