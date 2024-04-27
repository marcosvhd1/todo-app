import { Todo } from "@prisma/client";

interface TodoBodyMapperProps {
  title: string;
  status: string;
  priority: string;
}

export class TodoBodyMapper {
  static async toPrisma(todo: Todo) {
    return <TodoBodyMapperProps>{
      title: todo.title,
      status: todo.status,
      priority: todo.priority,
      updatedAt: todo.updatedAt,
    };
  }
}
