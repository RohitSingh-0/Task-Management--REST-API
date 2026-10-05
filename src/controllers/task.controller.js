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
    },

    async getAll(req, res) {
        const { search, status, priority } = req.query;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await taskService.getAllTasks(
            req.user.userId,
            search,
            status,
            priority,
            page,
            limit
        );

        const totalPages = Math.ceil(
            result.totalTasks / limit
        );

        res.status(200).json({
            tasks: result.tasks,
            page,
            limit,
            totalTasks: result.totalTasks,
            totalPages
        });
    },

    async getById(req, res) {
        const task = await taskService.getTaskById(
            req.params.id,
            req.user.userId
        );

        res.status(200).json({
            task
        });
    },

    async update(req, res) {
        const task = await taskService.updateTask(
            req.params.id,
            req.user.userId,
            req.body
        );

        res.status(200).json({
            message: "Task updated successfully",
            task
        });
    },

    async delete(req, res) {
        await taskService.deleteTask(
            req.params.id,
            req.user.userId
        );

        res.status(200).json({
            message: "Task deleted successfully"
        });
    }

};
