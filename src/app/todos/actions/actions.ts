"use server";

import { TodoBodyMapper } from "@/app/todos/actions/mappers/todo-body-mapper";
import { prisma } from "@/services/database";
import { Todo } from "@prisma/client";

export async function getAll(title: string, page: number, limit: number) {
  const where = {
    title: {
      contains: title,
    },
  };

  const [count, todos] = await prisma.$transaction([
    prisma.todo.count({ where }),
    prisma.todo.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    count,
    todos,
  };
}

export async function upsert(fields: Todo) {
  try {
    const data = await TodoBodyMapper.toPrisma(fields);
    const todo = await prisma.todo.upsert({
      update: data,
      create: data,
      where: {
        id: fields.id,
      },
    });

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
