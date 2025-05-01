import express from "express";
import * as todoController from "../controller/todo.mjs";
import { authMiddleware } from "../middleware/auth.mjs";

const router = express.Router();
router.use(authMiddleware);
router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
export default router;
