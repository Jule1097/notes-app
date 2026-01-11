import { authService } from "../services/authService.js";

export const userController = {
    userRegistered: async (req, res) => {

        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        try {
            const user = await authService.userLogin(email, password);

            return res.status(200).json({
                message: "User logged in successfully.",
                user
            })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }   
    }
}