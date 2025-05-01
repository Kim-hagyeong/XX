import { db } from "./db.mjs";

export async function getByUserId(user_id) {
  const [rows] = await db.execute("SELECT * FROM todos WHERE user_id = ?", [
    user_id,
  ]);
  return rows;
}

export async function create(user_id, content) {
  const [result] = await db.execute(
    "INSERT INTO todos (user_id, content) VALUES (?, ?)",
    [user_id, content]
  );
  return { id: result.insertId, content };
}

export async function update(id, content, is_done) {
  await db.execute("UPDATE todos SET content = ?, is_done = ? WHERE id = ?", [
    content,
    is_done,
    id,
  ]);
  return { id, content, is_done };
}

export async function remove(id) {
  await db.execute("DELETE FROM todos WHERE id = ?", [id]);
}
