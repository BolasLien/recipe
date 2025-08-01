# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: This project uses pnpm (version 10.11.1+)

**Development workflow**:

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

**Environment Setup**: Copy `.env.example` to `.env.local` and configure Supabase credentials:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Architecture Overview

**Tech Stack**: Next.js 13+ with App Router, TypeScript, Tailwind CSS, Supabase

**Project Structure**:

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utilities (Supabase client, image upload logic)
- `styles/` - Global CSS styles

**Data Layer**:

- Supabase PostgreSQL database with `recipes` table
- Supabase Storage bucket `recipes-images` for image uploads
- Direct Supabase client calls in Server Components for data fetching

**Key Features**:

- Recipe CRUD operations with image upload
- Search functionality using Supabase `.or()` queries on title and content
- Sorting by creation date (asc/desc)
- Markdown rendering for recipe content using react-markdown

**Image Upload**: Custom implementation using XMLHttpRequest for progress tracking, uploads to Supabase Storage with URL-encoded paths to handle special characters.

**UI Language**: Traditional Chinese (zh-tw) - all user-facing text should be in Traditional Chinese.

**Component Patterns**:

- Server Components for data fetching (pages)
- Client Components for interactivity (forms, search, image upload)
- React Hook Form for form handling
- Link components for navigation with hover transitions

## 程式碼風格與命名規範

### 1. 變數和 function 命名

```typescript
// ✅ camelCase
const userName = 'john';
const userList = []; // 或 users
const itemList = []; // 或 items
const isAuthenticated = true;
const handleSubmit = () => {};
const fetchUserData = async () => {};

// ✅ 布林值使用 is/has/can 前綴
const isLoading = false;
const hasPermission = true;
const canEdit = false;
```

### 2. 常數命名

```typescript
// ✅ SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;
const DEFAULT_PAGE_SIZE = 20;

// ✅ 常數物件：當需要精確型別時使用 as const
const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
} as const;

// 使用情境：
// - 需要精確的字面量型別（200 而不是 number）
// - 用於 switch case 或聯合型別
// - API 狀態碼、主題設定等固定值

// ✅ 陣列常數
const ALLOWED_FILE_TYPES = ['jpg', 'png', 'pdf'] as const;
// 型別：readonly ['jpg', 'png', 'pdf'] 而不是 string[]
```

### 3. Component 和型別命名

```typescript
// ✅ PascalCase
type UserProfile = { /* ... */ };
const UserCard = ({ user }: { user: User }) => { /* ... */ };
const ProfileSettings = () => { /* ... */ };
```

### 4. Function 定義

```typescript
// ✅ 推薦：統一使用 arrow function
const add = (a: number, b: number) => a + b;

const processUserData = (users: User[]): ProcessedUser[] => {
  // 複雜邏輯...
  return processedUsers;
};

// ✅ 推薦：非同步 function 使用 async/await
const fetchData = async (id: string): Promise<User> => {
  try {
    const response = await api.getUser(id);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
};

// ⚠️ 例外：只有在需要 hoisting 或特殊情況下使用 function declaration
function handleSpecialCase() {
  // 特殊情況，如需要在定義前呼叫
}
```

### 5. 物件和陣列操作

```typescript
// ✅ 推薦：物件屬性簡寫
const createUser = (name: string, email: string) => ({
  name,
  email,
  createdAt: new Date(),
});

// ✅ 推薦：解構賦值
const { id, name, email } = user;
const [first, second, ...rest] = items;

// ✅ 推薦：展開運算子
const updatedUser = { ...user, isActive: true };
const allItems = [...existingItems, ...newItems];
```

### 6. 條件和迴圈

```typescript
// ✅ 推薦：使用 guard clauses (early return pattern)
const processUser = (user: User | null) => {
  if (!user) {
    return null;
  }

  if (!user.isActive) {
    return null;
  }

  // 主要邏輯
  return processActiveUser(user);
};

// ✅ 推薦：使用現代陣列方法
const activeUsers = users
  .filter(user => user.isActive)
  .map(user => ({ ...user, displayName: `${user.firstName} ${user.lastName}` }))
  .sort((a, b) => a.displayName.localeCompare(b.displayName));
```

### 7. 錯誤訊息

```typescript
// ✅ 推薦：完整的錯誤訊息
console.error(`${mode === 'create' ? '創建角色失敗' : '更新角色失敗'}:`, err);

// ❌ 避免：拼接的錯誤訊息
console.error(`${mode === 'create' ? '創建' : '更新'}角色失敗:`, err);
```

---

## TypeScript 型別規範

### 基本原則

#### 1. 優先使用 `type` 而非 `interface`

```typescript
// ✅ 推薦
type User = {
  id: string;
  name: string;
  email: string;
};

// ❌ 避免
interface User {
  id: string;
  name: string;
  email: string;
}
```

#### 2. Function 型別

```typescript
// ✅ 物件型別
type UserProfile = {
  id: string;
  avatar: string;
};

// ✅ 聯合型別
type Theme = 'light' | 'dark' | 'auto';
type Status = 'pending' | 'approved' | 'rejected';

// ✅ Function 型別
type EventHandler = (event: Event) => void;
type ApiResponseTransformer = (data: unknown) => ParsedData;
```

### React 相關型別

#### 1. Component Props

```typescript
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  children: ReactNode;
};

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};
```

#### 2. Context 型別

```typescript
type AuthContextType = {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};
```

### 進階型別使用

#### 1. 泛型 Type

```typescript
type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
```

#### 2. 工具型別組合

```typescript
type UpdateUserRequest = Partial<Omit<User, 'id' | 'createdAt'>>;
type UserSummary = Pick<User, 'id' | 'name' | 'email'>;
type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
```

### 例外情況

以下情況可考慮使用 `interface`：

1. **需要聲明合併**（極少數情況）
2. **定義 class 的契約**
3. **第三方庫要求使用 interface**

---

## React Component 規範

### 1. Component 定義

#### Function Component（推薦）

```typescript
// ✅ 推薦：直接 function 定義
export const MyComponent = ({ prop1, prop2 }: Props) => {
  return <div>...</div>;
};

// ✅ 或使用 function 關鍵字
export function MyComponent({ prop1, prop2 }: Props) {
  return <div>...</div>;
}

// ❌ 避免：React.FC
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>...</div>;
};
```

### 2. Props 解構

```typescript
// ✅ 推薦：參數解構
const Button = ({ variant = 'primary', size = 'medium', children, ...rest }: ButtonProps) => {
  return (
    <button className={`btn btn-${variant} btn-${size}`} {...rest}>
      {children}
    </button>
  );
};

// ❌ 避免：props 物件
const Button = (props: ButtonProps) => {
  return (
    <button className={`btn btn-${props.variant}`}>
      {props.children}
    </button>
  );
};
```

### 3. Hooks 使用

```typescript
// ✅ 推薦：將相關 state 邏輯組合
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse };
};

// ✅ 推薦：自定義 Hook 以 use 開頭
const useApiData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  // Hook 實作...

  return { data, loading, error };
};
```

### 4. 條件渲染

```typescript
// ✅ 推薦：將條件判斷抽成變數
const StatusBadge = ({ status }: { status: Status }) => {
  const isActive = status === 'active';

  return (
    <span className={isActive ? 'badge-success' : 'badge-danger'}>
      {status}
    </span>
  );
};

// ✅ 推薦：使用 early return 增加可讀性
const Notification = ({ message, isVisible }: NotificationProps) => {
  if (!isVisible) return null;

  return <div className="notification">{message}</div>;
};

// ✅ 推薦：複雜條件提取為 function
const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'pending': return 'yellow';
    case 'approved': return 'green';
    case 'rejected': return 'red';
    default: return 'gray';
  }
};
```
