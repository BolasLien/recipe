## 專案開發規範

### Branch 命名規則

* 一律使用英文
* 命名格式：`<type>/<short-description>`

  * 範例：

    * `feature/add-recipe-form`
    * `fix/image-upload-bug`
    * `chore/update-deps`
    * `hotfix/recipe-detail-crash`

常見 type：

* `feature`：新功能
* `fix`：修 bug
* `chore`：雜項或工具更新
* `hotfix`：緊急修復

---

### Commit message 規範

採用 Conventional Commits 格式：

```
<type>(<scope>): <subject>
```

* `type`：

  * feat：新功能
  * fix：修 bug
  * chore：工具或雜項
  * refactor：重構
  * docs：文件
  * style：程式碼格式調整（不影響功能）
  * test：測試
* `scope`：影響範圍，可選
* `subject`：簡短描述（小寫開頭，不要句點）

範例：

```
feat(recipe): add create recipe page
fix(image-upload): handle empty file error
chore: update prettier config
```

---

### ✅ Code Format

* 使用 Prettier 統一格式
* Prettier 設定需加入專案 (e.g. `.prettierrc`)
