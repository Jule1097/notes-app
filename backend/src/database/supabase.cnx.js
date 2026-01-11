import { createClient } from '@supabase/supabase-js';
import config from '../config/config.js';

class supabaseCnx {
    static #instance = null;

    static connection() {
        if(!supabaseCnx.#instance) {
            supabaseCnx.#instance = createClient(
                config.SUPABASE_URL,
                config.SUPABASE_KEY
            );

            console.log('New Supabase connection established');
        };
        return supabaseCnx.#instance;
    }
}

export default supabaseCnx;