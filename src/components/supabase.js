// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://eyxirpucxpgzloxoqtjj.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eGlycHVjeHBnemxveG9xdGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4Mzg3NDUsImV4cCI6MjAyMDQxNDc0NX0.dRupM9AJsqal6KLOML7E5kMfjrMEfR16_pwughoNZls';

// export const supabase = createClient(supabaseUrl, supabaseKey);


const supabaseUrl = 'https://vrkrxuzxtdbtcwyhcaiq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZya3J4dXp4dGRidGN3eWhjYWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4NDE3NzIsImV4cCI6MjAyMDQxNzc3Mn0.wV5u-vapo96l-qs59WKtbhYgtofOtr89MxBkYM4oEoY'
export const supabase = createClient(supabaseUrl, supabaseKey);