import { userService } from "../services/auth.service.js";

export const userController = { 
    async register  (req, res) {
    const user = await userService.registerUser(req.body);

    res.status(201).json({
        message: "User registered successfully",
        user
    });
}
}