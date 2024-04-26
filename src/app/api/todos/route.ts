import { prisma } from "@/services/database";
import { NextRequest, NextResponse } from "next/server";
import { TodoMapper } from "./mappers/todo-body-mapper";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();

    return NextResponse.json({ todos });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  const data = await TodoMapper.toPrisma(request);

  try {
    const todo = await prisma.todo.create({ data });
    return NextResponse.json({ todo });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
