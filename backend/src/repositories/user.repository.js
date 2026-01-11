import supabaseCnx from "../database/supabase.cnx.js";

export class userRepository {
    constructor() {
        this.supabase = supabaseCnx.connection();
    }

    async getSupaBase() {
        return this.supabase;
    }

    async getUserById(userId) {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('user_id', userId)
            .single(); 

        if (error) {
            throw new Error(error.message);
        }
        
        return data;
    }
}