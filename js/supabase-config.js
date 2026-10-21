const SUPABASE_URL = 'https://xqyhcbojviconlfdiloj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_l-HZ2Dp4idCp4AYxBVW0iw_h4tkvtzY'; // Replace with key from Supabase Dashboard > Settings > API

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window._supabase = _supabase; // Makes it accessible everywhere in your app