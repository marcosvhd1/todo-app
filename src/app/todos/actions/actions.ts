"use server";

import { TodoBodyMapper } from "@/app/todos/mappers/todo-body-mapper";
import { prisma } from "@/services/database";
import { Todo } from "@prisma/client";

export async function getAll(title: string | null) {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        title: {
          contains: title ?? "",
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return todos;
  } catch (error) {
    return error;
  }
}

export async function create(fields: Todo) {
  try {
    const data = await TodoBodyMapper.toPrisma(fields);
    const todo = await prisma.todo.create({ data });

    return todo;
  } catch (error) {
    return error;
  }
}

export async function remove(todoId: number) {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) return "Todo Not Found";

    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    return todo;
  } catch (error) {
    return error;
  }
}
