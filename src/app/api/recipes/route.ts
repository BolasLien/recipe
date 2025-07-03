import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const ingredients = formData.get('ingredients') as string;
  const steps = formData.get('steps') as string;
  const file = formData.get('image') as File | null;

  let imageUrl = '';

  if (file) {
    const { data, error } = await supabase.storage
      .from('recipe-images')
      .upload(`${Date.now()}-${file.name}`, file, {
        cacheControl: '3600',
      });

    if (error || !data) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    const { data: urlData } = await supabase.storage
      .from('recipe-images')
      .getPublicUrl(data.path);
    imageUrl = urlData.publicUrl;
  }

  const { data: insertData, error: insertError } = await supabase
    .from('recipes')
    .insert({ name, ingredients, steps, imageUrl })
    .select()
    .single();

  if (insertError || !insertData) {
    return NextResponse.json({ success: false, error: insertError }, { status: 500 });
  }

  return NextResponse.json({ success: true, recipeId: insertData.id });
}

export async function GET() {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}
