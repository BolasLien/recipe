
# AGENTS.md

## 專案描述
這是一個從零開始開發的食譜網站 MVP。  
使用者可以：
- 新增食譜
- 輸入名稱、食材、步驟
- 上傳食譜照片
- 查看所有食譜清單
- 點擊查看食譜詳細內容

圖片會存到 Supabase Storage，URL 存到資料庫。

## 技術堆疊
- Next.js (app router)
- TypeScript
- Supabase (PostgreSQL + Storage)
- Tailwind CSS (UI)
- Prettier (程式碼格式化)

## 程式碼規範
- 全部使用 TypeScript
- 使用 async/await
- 不使用簡體字
- 程式碼格式需符合 Prettier
- API Routes 放在 src/app/api 目錄
- Database 操作用 Supabase JS SDK
- 不使用任何 ORM（例如 Prisma、TypeORM）
- 所有圖片上傳成功後，必須取得 public URL 並寫進資料庫

## 檔案結構
- src/
  - app/
    - page.tsx                   # 食譜列表頁
    - new-recipe/page.tsx        # 新增食譜頁
    - recipes/
      - [id]/page.tsx            # 食譜詳細頁
    - api/
      - recipes/
        - route.ts               # GET, POST API
      - recipes/
        - [id]/
          - route.ts            # GET 單筆食譜
  - components/
    - RecipeForm.tsx
    - RecipeList.tsx
    - RecipeDetail.tsx
- types/
  - recipe.ts

## 命名慣例
- 檔案名使用 camelCase 或 kebab-case
- React component 使用 PascalCase
- Type 定義統一放在 types 目錄

## Database Schema (Supabase)
Table: recipes

| Column      | Type    | Note               |
|-------------|---------|--------------------|
| id          | uuid    | PK, default uuid_generate_v4() |
| name        | text    | 食譜名稱           |
| ingredients | text    | 食材描述           |
| steps       | text    | 步驟描述           |
| imageUrl    | text    | 圖片 URL           |
| created_at  | timestamptz | default now() |

## API 規格

### POST /api/recipes
- 功能：新增食譜
- 接收：
```json
  {
    "name": "string",
    "ingredients": "string",
    "steps": "string",
    "imageUrl": "string"
  }
```

* 回傳：

  * 成功：

    ```json
    {
      "success": true,
      "recipeId": "string"
    }
    ```
  * 失敗：

    ```json
    {
      "success": false,
      "error": "string"
    }
    ```

### GET /api/recipes

* 功能：取得所有食譜
* 回傳：

  ```json
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
  ```

### GET /api/recipes/\[id]

* 功能：取得單筆食譜
* 回傳：

  ```json
  {
    "id": "string",
    "name": "string",
    "ingredients": "string",
    "steps": "string",
    "imageUrl": "string",
    "created_at": "string"
  }
  ```

## TODO

* 建立 Supabase 專案
* 設定 Supabase Table：recipes
* 建立圖片上傳到 Supabase Storage
* 實作 CRUD API
* 建立前端表單與畫面
