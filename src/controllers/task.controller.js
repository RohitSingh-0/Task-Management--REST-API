import { taskService } from "../services/task.service.js";

export const taskController = {
    async create(req, res) {
        const task = await taskService.createTask(
            req.body,
            req.user.userId
        );

        res.status(201).json({
            message: "Task created successfully",
            task
        });
    }
};