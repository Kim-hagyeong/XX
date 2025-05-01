import express from "express";
import authRouter from "./router/auth.mjs";
import todoRouter from "./router/todo.mjs";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/todos", todoRouter);
app.use(express.static("public"));

app.listen(8080, () => console.log("http://127.0.0.1:8080 서버 실행 중"));
