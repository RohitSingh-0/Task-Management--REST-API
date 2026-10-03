import User from "../models/user.model.js";

export const userService = {
     async registerUser  ({ name, email, password }) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    return user;
}
}