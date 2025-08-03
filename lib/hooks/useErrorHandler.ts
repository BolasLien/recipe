import { useCallback } from 'react';

type ErrorHandler = {
  handleError: (error: unknown, context?: string) => void;
  formatErrorMessage: (error: unknown) => string;
};

/**
 * 統一錯誤處理 Hook
 */
export const useErrorHandler = (): ErrorHandler => {
  const formatErrorMessage = useCallback((error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    if (error && typeof error === 'object' && 'message' in error) {
      return String((error as { message: unknown }).message);
    }

    return '發生未知錯誤';
  }, []);

  const handleError = useCallback(
    (error: unknown, context?: string) => {
      const errorMessage = formatErrorMessage(error);
      const fullMessage = context
        ? `${context}: ${errorMessage}`
        : errorMessage;

      // 記錄錯誤到控制台
      console.error(fullMessage, error);

      // 在開發環境中額外記錄錯誤詳情
      if (process.env.NODE_ENV === 'development') {
        console.error('錯誤詳情:', error);
      }
    },
    [formatErrorMessage]
  );

  return {
    handleError,
    formatErrorMessage,
  };
};
