import { NextRequest } from "next/server";

interface TodoBodyMapperProps {
  title: string;
  status: string;
  priority: string;
}

export class TodoBodyMapper {
  static async toPrisma(request: NextRequest) {
    const fields = await request.json();

    return <TodoBodyMapperProps>{
      title: fields.title,
      status: fields.status,
      priority: fields.priority,
    };
  }
}
