import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository.js";

export const userService = {
    async registerUser({ name, email, password }) {
        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    },

    async loginUser({ email, password }) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        };
    }
};