# 專案分析： Recipe App

這是一個使用 Next.js 開發的食譜管理網站。它允許使用者建立、檢視、編輯和刪除食譜，並包含圖片上傳功能。

## 技術堆疊

- **前端框架**: [Next.js](https://nextjs.org/) (使用 App Router)
- **UI 函式庫**: [React](https://react.dev/)
- **程式語言**: [TypeScript](https://www.typescriptlang.org/)
- **後端 & 資料庫**: [Supabase](https://supabase.com/)
- **樣式**: [Tailwind CSS](https://tailwindcss.com/)
- **表單處理**: [React Hook Form](https://react-hook-form.com/)
- **Markdown 渲染**: [React Markdown](https://github.com/remarkjs/react-markdown)
- **套件管理器**: [pnpm](https://pnpm.io/)

## 專案結構

- `app/`: Next.js 的 App Router 核心目錄。
  - `layout.tsx`: 全域佈局。
  - `page.tsx`: 應用程式首頁，可能顯示所有食譜的列表。
  - `recipes/`: 包含與食譜相關的所有頁面。
    - `[id]/page.tsx`: 顯示單一食譜詳細資訊的動態路由頁面。
    - `[id]/edit/page.tsx`: 編輯現有食譜的頁面。
    - `new/page.tsx`: 新增食譜的頁面。
- `components/`: 可重複使用的 React 元件。
  - `DeleteRecipeButton.tsx`: 刪除食譜的按鈕。
  - `ImageUploader.tsx`: 處理圖片上傳的元件。
  - `SearchBox.tsx`: 搜尋框元件。
  - `SortToggle.tsx`: 用於排序的切換元件。
- `lib/`: 存放輔助函式和服務設定。
  - `supabase.ts`: Supabase 客戶端的初始化和設定。
  - `uploadImage.ts`: 處理圖片上傳到 Supabase Storage 的邏輯。
- `pages/api/`: Next.js 的 API 路由 (此專案中可能未使用或用於簡單的 health check)。
- `styles/`: 全域樣式表。
- `public/`: 靜態資源，如圖片。

## 主要功能 (推斷)

1.  **食譜 CRUD**: 使用者可以建立、讀取、更新和刪除 (Create, Read, Update, Delete) 食譜。
2.  **食譜列表與搜尋**: 在首頁或特定頁面顯示食譜列表，並提供搜尋功能。
3.  **圖片上傳**: 在建立或編輯食譜時，可以上傳圖片，圖片儲存於 Supabase Storage。
4.  **Markdown 支援**: 食譜的說明或步驟可能使用 Markdown 格式編寫。
5.  **動態路由**: 每個食譜都有自己專屬的頁面 (`/recipes/[id]`)。

## 渲染模式

此專案主要採用 **伺服器端渲染 (SSR)**。

- **動態渲染**: 由於首頁 (`/`) 和食譜列表頁面使用了 `searchParams` 來處理即時的搜尋和排序功能，這些頁面會在每個使用者請求時在伺服器上動態渲染。
- **靜態渲染可能性**: 雖然大部分是 SSR，但像 `/recipes/new` 這樣不依賴動態資料的頁面，Next.js 可能會自動將其優化為靜態頁面。

## 開發指令

- `pnpm dev`: 啟動開發伺服器。
- `pnpm build`: 建置生產版本的應用程式。
- `pnpm start`: 啟動生產伺服器。
- `pnpm lint`: 執行 ESLint 程式碼檢查。
- `pnpm format`: 使用 Prettier 格式化所有程式碼。
