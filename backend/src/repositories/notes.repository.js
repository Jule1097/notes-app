import supabaseCnx from '../database/supabase.cnx.js';

export class notesRepository {
    constructor() {
        this.supabase = supabaseCnx.connection();
    }

    async getSupaBase() {
        return this.supabase;
    }

    async getNotesByUserId(userId) {
        const { data, error } = await this.supabase.from('notes').select('*, note_categories(categories(name)))').eq('user_id', userId);

        if(error) {
            throw new Error(error.message);
        }

        return {
            notes: data
        };
    }

    async createNote(noteData) {
        const { categories, ...notePayload } = noteData;

        const { data, error } = await this.supabase
            .from('notes')
            .insert([notePayload])
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async updateNote(noteId, noteData) {
        const { categories, ...notePayload } = noteData;

        const { data, error } = await this.supabase
            .from('notes')
            .update(notePayload)
            .eq('id', noteId)
            .select()
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }       

    async deleteNote(noteId) {
        const { data, error } = await this.supabase
            .from('notes')
            .delete()
            .eq('id', noteId)
            .select()
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}