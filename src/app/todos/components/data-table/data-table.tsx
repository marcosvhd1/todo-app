"use client";

import { getAll } from "@/app/todos/actions/actions";
import { DataTableActionsCell } from "@/app/todos/components/data-table/components/data-table-actions-cell";
import { DataTablePagination } from "@/app/todos/components/data-table/components/data-table-pagination";
import { DataTablePriorityCell } from "@/app/todos/components/data-table/components/data-table-priority-cell";
import { DataTableStatusCell } from "@/app/todos/components/data-table/components/data-table-status-cell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Todo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";

const headers: { key: string; label: string }[] = [
  { key: "id", label: "Task" },
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
  { key: "actions", label: "" },
];

export function DataTable() {
  const limit = 30;
  const searchParams = useSearchParams();

  const title = searchParams.get("title") ?? "";
  const status = searchParams.get("status") ?? "";
  const priority = searchParams.get("priority") ?? "";
  const page = Number(searchParams.get("page")) ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ["todos", title, status, priority, page],
    queryFn: () => getAll(title, status, priority, page, limit),
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
            {data && Array.isArray(data.todos) && data.todos.length > 0 ? (
              data.todos.map((todo: Todo) => {
                return (
                  <TableRow key={todo.id}>
                    <TableCell>TASK-{todo.id}</TableCell>
                    <TableCell className="font-semibold text-base sm:max-w-[20rem] sm:whitespace-nowrap sm:truncate">
                      {todo.title}
                    </TableCell>
                    <DataTableStatusCell todoStatus={todo.status} />
                    <DataTablePriorityCell todoPriority={todo.priority} />
                    <DataTableActionsCell todoId={todo.id} />
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
        totalData={data !== undefined ? data.count : 0}
        limit={limit}
      />
    </>
  );
}
