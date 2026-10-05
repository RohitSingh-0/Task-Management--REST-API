import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            required: true,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },

        priority: {
            type: String,
            required: true,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        dueDate: {
            type: Date,
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        createdDate: {
            type: Date,
            default: Date.now
        }
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;