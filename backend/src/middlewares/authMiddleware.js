import { userRepository } from "../repositories/user.repository.js";

const userRepositoryInstance = new userRepository();
const supabase = await userRepositoryInstance.getSupaBase();

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const { data , error } = await supabase.auth.getUser(token);
    const user = data?.user;

    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, ok: false, message: error.message });
  }
}
