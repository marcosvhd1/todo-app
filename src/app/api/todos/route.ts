import { prisma } from "@/services/database";
import { NextRequest, NextResponse } from "next/server";
import { TodoBodyMapper } from "./mappers/todo-body-mapper";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");

  try {
    const todos = await prisma.todo.findMany({
      where: {
        title: {
          contains: title ?? "",
        },
      },
    });

    return NextResponse.json({ todos });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await TodoBodyMapper.toPrisma(request);
    const todo = await prisma.todo.create({ data });

    return NextResponse.json({ todo });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
