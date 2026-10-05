import { taskRepository } from "../repositories/task.repository.js";

export const taskService = {
    async createTask(taskData, userId) {
        return await taskRepository.create({
            ...taskData,
            user: userId
        });
    }
};