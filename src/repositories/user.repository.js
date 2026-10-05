import User from "../models/user.model.js";

export const userRepository = {
    async findByEmail(email) {
        return await User.findOne({ email });
    },

    async create(userData) {
        return await User.create(userData);
    },

    async findById(id) {
        return await User.findById(id);
    }
};