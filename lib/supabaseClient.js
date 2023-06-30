// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yfzehetlohzcenorunze.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabaseKey);
