import { taskRepository } from "../repositories/task.repository.js";
import AppError from "../utils/AppError.js";

export const taskService = {
    async createTask(taskData, userId) {
        return await taskRepository.create({
            ...taskData,
            user: userId
        });
    },

    async getAllTasks(userId, search, status, priority, page, limit) {
        return await taskRepository.findAllByUser(
            userId,
            search,
            status,
            priority,
            page,
            limit
        );
    },

    async getTaskById(taskId, userId) {
        const task = await taskRepository.findById(
            taskId,
            userId
        );

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        return task;
    },

    async updateTask(taskId, userId, taskData) {
        const task = await taskRepository.update(
            taskId,
            userId,
            taskData
        );

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        return task;
    },

    async deleteTask(taskId, userId) {
        const task = await taskRepository.delete(
            taskId,
            userId
        );

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        return task;
    }
};