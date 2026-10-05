import express from "express";
import { taskController } from "../controllers/task.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, taskController.create);

export default router;