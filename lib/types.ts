/**
 * 應用程式共用型別定義
 * 只包含在多個組件間共用的型別
 */

// 食譜相關型別 - 在多個頁面和組件中使用
export type Recipe = {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
};
