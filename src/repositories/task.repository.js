import Task from "../models/task.model.js";

export const taskRepository = {
    async create(taskData) {
        return await Task.create(taskData);
    },

    async findAllByUser(userId) {
        return await Task.find({ user: userId });
    },

    async findById(taskId, userId) {
        return await Task.findOne({
            _id: taskId,
            user: userId
        });
    },

    async update(taskId, userId, taskData) {
        return await Task.findOneAndUpdate(
            {
                _id: taskId,
                user: userId
            },
            taskData,
            {
                new: true
            }
        );
    },

    async delete(taskId, userId) {
        return await Task.findOneAndDelete({
            _id: taskId,
            user: userId
        });
    }
};