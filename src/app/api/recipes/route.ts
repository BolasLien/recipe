import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabaseClient';
import { Recipe } from '@/types/recipe';

export async function POST(req: Request) {
  const supabase = createClient();
  const data: Recipe = await req.json();
  const { data: recipe, error } = await supabase
    .from('recipes')
    .insert({
      name: data.name,
      ingredients: data.ingredients,
      steps: data.steps,
      imageUrl: data.imageUrl,
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, recipeId: recipe.id });
}

export async function GET() {
  const supabase = createClient();
  const { data: recipes, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(recipes);
}
