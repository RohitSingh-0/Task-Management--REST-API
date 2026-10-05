import Task from "../models/task.model.js";

export const taskRepository = {
    async create(taskData) {
        return await Task.create(taskData);
    },

    async findAllByUser(userId, search, status, priority, page, limit) {
        const query = {
            user: userId
        };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        const skip = (page - 1) * limit;

        const tasks = await Task.find(query)
            .skip(skip)
            .limit(limit);

        const totalTasks = await Task.countDocuments(query);

        return {
            tasks,
            totalTasks
        };
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