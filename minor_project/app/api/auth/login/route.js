'use server';

import supabase from '@/lib/supabaseClient';

export async function POST(req) {
  const { email, password } = await req.json(); // Get email and password from the request body

  // Sign in with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // If there's an authentication error, return a 401 response
  if (authError) {
    return new Response(JSON.stringify({ error: authError.message }), { status: 401 });
  }

  // After successful authentication, fetch user data from the 'users' table
  const { data: userData, error: userError } = await supabase
    .from('users') // Change 'users' to the correct table name
    .select('*') // Select the fields you want, e.g., 'id', 'email', 'name', etc.
    .eq('email', email)
    .single();
  // Handle error in fetching user data
  if (userError) {
    // console.log("------\n",userError.message);
    return new Response(JSON.stringify({ error: userError.message }), { status: 500 });
  }

  // Return the user data as a response
  return new Response(JSON.stringify({ authData, userData }), { status: 200 });
}
