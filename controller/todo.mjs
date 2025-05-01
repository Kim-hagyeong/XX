import * as todoRepository from "../data/todo.mjs";

export async function getTodos(req, res) {
  const todos = await todoRepository.getByUserId(req.user.id);
  res.status(200).json({ todos });
}

export async function createTodo(req, res) {
  const { content } = req.body;
  const todo = await todoRepository.create(req.user.id, content);
  res.status(201).json(todo);
}

export async function updateTodo(req, res) {
  const id = req.params.id;
  const { content, is_done } = req.body;
  const updated = await todoRepository.update(id, content, is_done);
  res.status(200).json(updated);
}

export async function deleteTodo(req, res) {
  const id = req.params.id;
  await todoRepository.remove(id);
  res.sendStatus(204);
}
