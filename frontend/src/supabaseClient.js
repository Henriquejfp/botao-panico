import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://arlopfbacxnybkqywojs.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybG9wZmJhY3hueWJrcXl3b2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjM3NTAsImV4cCI6MjA5NTI5OTc1MH0.zENTsARa0-RDH2zZZa8fQ5kAPqPPaaD_aXlXqYvDkIA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
