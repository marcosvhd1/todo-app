import { prisma } from "@/services/database";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import { TodoNotFound } from "../errors/todo-not-found";
import { TodoBodyMapper } from "../mappers/todo-body-mapper";

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(params.todoId),
      },
    });

    if (!todo) return TodoNotFound();

    return NextResponse.json({ message: "OK", todo });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(params.todoId),
      },
    });

    if (!todo) return TodoNotFound();

    const data = await TodoBodyMapper.toPrisma(request);

    const updatedTodo = await prisma.todo.update({
      data,
      where: {
        id: Number(params.todoId),
      },
    });

    return NextResponse.json({ message: "OK", updatedTodo });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(params.todoId),
      },
    });

    if (!todo) return TodoNotFound();

    await prisma.todo.delete({
      where: {
        id: Number(params.todoId),
      },
    });

    return NextResponse.json({ message: "OK", todo });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
