import { userService } from "../services/auth.service.js";

export const userController = {
    async register(req, res) {
        const user = await userService.registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    },

    async login(req, res) {
        const result = await userService.loginUser(req.body);

        res.status(200).json({
            message: "Login successful",
            ...result
        });
    },

    async profile(req, res) {
        const user = await userService.getProfile(req.user.userId);

        res.status(200).json({
            user
        });
    }
}