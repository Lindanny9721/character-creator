import { createClient } from '@supabase/supabase-js'
const url = "https://gqnlbgoicbyxkbvbwnba.supabase.co";
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
export const supabase = createClient(url, API_KEY);


