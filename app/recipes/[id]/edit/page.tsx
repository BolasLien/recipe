import { supabase } from '../../../../lib/supabase';
import RecipeForm from '../../../../components/RecipeForm';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error(error);
    notFound();
  }

  return <RecipeForm mode="edit" recipe={data} />;
}
