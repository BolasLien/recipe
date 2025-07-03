你是一位 Next.js 開發者，請根據以下專案規格，幫我從零開始建立一個 MVP 級的食譜網站。請逐步產生程式碼，包括必要的設定、檔案結構與程式內容。

【專案描述】
- 這是一個從零開始開發的食譜網站 MVP
- 使用者可以：
  - 新增食譜
  - 輸入名稱、食材、步驟
  - 上傳食譜照片
  - 查看所有食譜清單
  - 點擊查看食譜詳細內容
- 圖片儲存在 Supabase Storage，URL 存在資料庫

【技術堆疊】
- Next.js (app router)
- TypeScript
- Supabase (PostgreSQL + Storage)
- Tailwind CSS
- Prettier

【程式碼規範】
- 全部使用 TypeScript
- 使用 async/await
- 不使用簡體字
- 程式碼需符合 Prettier 格式
- API Routes 放在 src/app/api 目錄
- Database 操作用 Supabase JS SDK
- 不使用任何 ORM
- 圖片上傳成功後，要取得 public URL 並寫進資料庫

【檔案結構】
- src/
  - app/
    - page.tsx
    - new-recipe/page.tsx
    - recipes/
      - [id]/page.tsx
    - api/
      - recipes/
        - route.ts
      - recipes/
        - [id]/
          - route.ts
  - components/
    - RecipeForm.tsx
    - RecipeList.tsx
    - RecipeDetail.tsx
- types/
  - recipe.ts

【Database Schema】
Table: recipes
| Column      | Type         | Note                            |
|-------------|--------------|---------------------------------|
| id          | uuid         | PK, default uuid_generate_v4()  |
| name        | text         | 食譜名稱                        |
| ingredients | text         | 食材描述                        |
| steps       | text         | 步驟描述                        |
| imageUrl    | text         | 圖片 URL                         |
| created_at  | timestamptz  | default now()                   |

【API 規格】
### POST /api/recipes
- 接收：
  {
    "name": "string",
    "ingredients": "string",
    "steps": "string",
    "imageUrl": "string"
  }
- 回傳：
  {
    "success": true,
    "recipeId": "string"
  }

### GET /api/recipes
- 回傳：
  [
    {
      "id": "string",
      "name": "string",
      "ingredients": "string",
      "steps": "string",
      "imageUrl": "string",
      "created_at": "string"
    }
  ]

### GET /api/recipes/[id]
- 回傳：
  {
    "id": "string",
    "name": "string",
    "ingredients": "string",
    "steps": "string",
    "imageUrl": "string",
    "created_at": "string"
  }

【目標】
- 建立 Next.js 專案
- 安裝並設定 Supabase
- 建立 Supabase Table
- 建立圖片上傳至 Supabase Storage 的程式
- 建立 API Routes
- 建立前端頁面 (列表、新增、詳情)
- 寫出 Recipe Type 定義
- 將所有代碼分別放在正確的檔案
- 使用 Tailwind CSS 完成簡單 UI

