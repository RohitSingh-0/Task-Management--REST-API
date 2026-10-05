import express from "express";
import { taskController } from "../controllers/task.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, taskController.create);
router.get("/", authenticate, taskController.getAll);
router.get("/:id", authenticate, taskController.getById);
router.put("/:id", authenticate, taskController.update);

export default router;