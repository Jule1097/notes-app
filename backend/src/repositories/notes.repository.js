import supabaseCnx from '../database/supabase.cnx.js';

export class notesRepository {
    constructor() {
        this.supabase = supabaseCnx.connection();
    }

    async getSupaBase() {
        return this.supabase;
    }

    async getNotesByUserId(userId) {
        const { data, error } = await this.supabase.from('notes').select('*').eq('user_id', userId);

        if(error) {
            throw new Error(error.message);
        }

        return {
            notes: data
        };
    }
}