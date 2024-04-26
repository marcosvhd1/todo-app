import { NextRequest } from "next/server";

export class TodoMapper {
  static async toPrisma(request: NextRequest) {
    const fields = await request.json();

    return {
      title: fields.title,
      status: fields.status,
      priority: fields.priority,
    };
  }
}
