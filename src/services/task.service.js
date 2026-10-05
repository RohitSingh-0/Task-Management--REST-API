import { taskRepository } from "../repositories/task.repository.js";

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
        return await taskRepository.findById(taskId, userId);
    },

    async updateTask(taskId, userId, taskData) {
        return await taskRepository.update(
            taskId,
            userId,
            taskData
        );
    },

    async deleteTask(taskId, userId) {
        return await taskRepository.delete(
            taskId,
            userId
        );
    }

};