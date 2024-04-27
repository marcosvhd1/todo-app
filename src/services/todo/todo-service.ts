import { Todo } from "@prisma/client";

const getAllTodos = async (title: string | null): Promise<Todo[] | Error> => {
  let url = title !== null ? `/todos?title=${title}` : "/todos";

  const response = await fetch("/api" + url);
  if (!response.ok) return new Error("Failed to fetch data");

  const responseJson = await response.json();

  return responseJson.todos;
};

const deleteTodo = async (todoId: number): Promise<void | Error> => {
  const response = await fetch(`/api/todos/${todoId}`, {
    method: "DELETE",
  });

  if (!response.ok) return new Error("Failed to fetch data");

  const responseJson = await response.json();

  return responseJson;
};

export const TodoService = {
  getAllTodos,
  deleteTodo,
};
