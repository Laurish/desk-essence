import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://schgcawfirvzlemwdoqf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaGdjYXdmaXJ2emxlbXdkb3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMDIyMzcsImV4cCI6MjA5MzU3ODIzN30.6HYHPlZF3gXlFoR30qVJjJ6-zVYyKEv8P-MTrNBOjYo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);