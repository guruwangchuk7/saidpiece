import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY; // using service role

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSelect() {
  console.log("Attempting to query with service role...");
  const { data, error } = await supabase.from('career_applications').select('*').limit(1);
  
  if (error) {
    console.error("Select failed:", error);
  } else {
    console.log("Select succeeded!", data);
  }
}

testSelect();
