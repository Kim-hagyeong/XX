import mysql from "mysql2/promise";
export const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "liberty",
  database: "todo_app",
  waitForConnections: true,
});
