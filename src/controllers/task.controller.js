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

        const totalPages = Math.ceil(result.totalTasks / limit);

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

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            task
        });
    }
};