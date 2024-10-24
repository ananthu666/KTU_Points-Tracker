import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bflnhszvnqylphbcrync.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmbG5oc3p2bnF5bHBoYmNyeW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjEwODEsImV4cCI6MjA0NTE5NzA4MX0.5NRBs5IS6C1SKcVt_1pOif-832iioaHxad5gw7i_Q80";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
