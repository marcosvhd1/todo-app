import { Todo } from "@prisma/client";

const getAll = async (title: string | null): Promise<Todo[] | Error> => {
  let url = title !== null ? `/todos?title=${title}` : "/todos";

  const response = await fetch("/api" + url);
  if (!response.ok) return new Error("Failed to fetch data");

  const responseJson = await response.json();

  return responseJson.todos;
};

export const TodoService = {
  getAll,
};
