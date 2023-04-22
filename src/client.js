import { createClient } from '@supabase/supabase-js'
const URL = 'https://wumrvhqhyrxprdinsehs.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bXJ2aHFoeXJ4cHJkaW5zZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2NTY1MDYsImV4cCI6MTk5NjIzMjUwNn0.kV3I8pt9Tczx5J7LkQiwgLrCLFdvA0hI0fGN3dYTrSI';
export const supabase = createClient(URL, API_KEY);
