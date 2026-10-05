import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository.js";
import { generateToken } from "../utils/jwt.js"
import AppError from "../utils/AppError.js";

export const userService = {
    async registerUser({ name, email, password }) {
        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            throw new AppError("User already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return {
            id: user._id,
            name: user.name,
            email: user.email
        };
    },

    async loginUser({ email, password }) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401);
        }


        const token = generateToken(user._id);

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }
    },

    async getProfile(userId) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email
        };
    }
}