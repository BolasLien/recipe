import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabaseClient';

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const supabase = createClient();
  const { data: recipe, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(recipe);
}
