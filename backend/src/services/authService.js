import { userRepository } from "../repositories/user.repository.js";

const userRepositoryInstance = new userRepository();
const supabaseCnx = await userRepositoryInstance.getSupaBase();

export const authService = {

  async userLogin(email, password) {
    const { data, error } = await supabaseCnx.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (error) {
      throw new Error(error.message);
    }

    const userToken = data.session?.access_token;

    return {
      token: userToken,
    };
  },
};
