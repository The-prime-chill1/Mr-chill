import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const adminAuthPersistenceKey = 'chill-tech-admin-auth-persistence';

function getPersistencePreference() {
  if (typeof window === 'undefined') return false;

  try {
    return window.localStorage.getItem(adminAuthPersistenceKey) === 'local';
  } catch {
    return false;
  }
}

function getAuthStorage() {
  if (typeof window === 'undefined') return undefined;

  const getStores = () => getPersistencePreference()
    ? [window.localStorage, window.sessionStorage]
    : [window.sessionStorage, window.localStorage];

  return {
    getItem(key) {
      const [preferredStore, fallbackStore] = getStores();
      try {
        return preferredStore.getItem(key) ?? fallbackStore.getItem(key);
      } catch {
        return null;
      }
    },
    setItem(key, value) {
      const [preferredStore, fallbackStore] = getStores();
      try {
        fallbackStore.removeItem(key);
        preferredStore.setItem(key, value);
      } catch {
        // The signed-in session can still live in memory when storage is blocked.
      }
    },
    removeItem(key) {
      try {
        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
      } catch {
        // Nothing else to clear when browser storage is unavailable.
      }
    },
  };
}

export function getAdminAuthPersistence() {
  return getPersistencePreference();
}

export function setAdminAuthPersistence(remember) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(adminAuthPersistenceKey, remember ? 'local' : 'session');
  } catch {
    // Supabase will still authenticate for the current page if storage is unavailable.
  }
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: getAuthStorage(),
      },
    })
  : null;

export async function insertSupabaseRow(table, payload) {
  if (!supabase) throw new Error('Supabase environment variables are not configured.');

  const { error } = await supabase.from(table).insert(payload);

  if (error) throw error;
  return null;
}

export async function sendEnquiryAcknowledgement(payload) {
  if (!supabase) throw new Error('Supabase environment variables are not configured.');
  const { data, error } = await supabase.functions.invoke('enquiry-autoreply', { body: payload });
  if (error) throw error;
  return data;
}
