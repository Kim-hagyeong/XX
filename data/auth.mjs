import { db } from "./db.mjs";
import bcrypt from "bcrypt";

export async function createUser(userid, password, name, email) {
  const hashed = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    `INSERT INTO users (userid, password, name, email) VALUES (?, ?, ?, ?)`,
    [userid, hashed, name, email]
  );
  return { id: result.insertId, userid, name, email };
}

export async function login(userid, password) {
  const [rows] = await db.execute(`SELECT * FROM users WHERE userid = ?`, [
    userid,
  ]);
  const user = rows[0];
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
}
