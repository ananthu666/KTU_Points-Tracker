// fetch the data 
//
'use server';

import { supabase } from '@/lib/supabaseClient';

export async function GET(req) {
    const { email } = await req.json();
    
    console.log("Hoe are u",email);
    // const { data, error } = await supabase
    //     .from('students')
    //     .select('*')
    //     .eq('email', 'student1@gmail.com')
    //     .single();
    
    if (error) {
        return {
        status: 500,
        body: { error: error.message },
        };
    }
    
    if (!data) {
        return {
        status: 404,
        body: { error: 'Student not found' },
        };
    }
    
    return {
        status: 200,
        body: data,
    };
    }