'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import ConfirmModal from './ConfirmModal';
// 使用原生符號替代圖標

export default function DeleteRecipeButton({ recipeId }: { recipeId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmDelete = async () => {
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
      setIsModalOpen(false);
      return;
    }

    router.push('/');
    router.refresh(); // Refresh the page to reflect the deletion
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full sm:w-auto text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-300 transition-colors shadow-sm"
      >
        <span>🗑️</span>
        {loading ? '刪除中...' : '刪除'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="確認刪除"
        description="您確定要刪除這篇食譜嗎？此操作無法復原。"
        isLoading={loading}
      />
    </>
  );
}
