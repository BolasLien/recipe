'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function DeleteRecipeButton({ recipeId }: { recipeId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm('確定要刪除嗎？')) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', recipeId);

    if (error) {
      console.error(error);
      setError('刪除失敗');
      setLoading(false);
      return;
    }

    router.push('/');
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? '刪除中...' : '刪除'}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
