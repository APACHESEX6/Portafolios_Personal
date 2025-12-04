import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('⚠️  SUPABASE_URL or SUPABASE_KEY is not set in environment. Supabase client will be created but likely fail at runtime.');
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_KEY || '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'x-client-info': 'portfolio-backend/1.0.0',
    },
  },
});

/**
 * testConnection - realiza una verificación ligera de que la URL de Supabase responde.
 * No asume tablas o funciones concretas en la base de datos, solo comprueba que la URL base responde.
 * Esto evita depender de permisos o esquemas específicos.
 */
export const testConnection = async (timeout = 4000) => {
  if (!SUPABASE_URL) return false;
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(SUPABASE_URL, { method: 'GET', signal: controller.signal });
    clearTimeout(id);
    return res.ok;
  } catch (err) {
    return false;
  }
};

export default supabase;
