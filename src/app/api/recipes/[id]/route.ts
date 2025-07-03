import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error }, { status: 404 });
  }

  return NextResponse.json(data);
}
