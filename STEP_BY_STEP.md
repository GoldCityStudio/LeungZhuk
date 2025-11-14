# 📍 步驟 1：在哪裡執行 firebase login

## 方法 1: 在終端機執行（推薦）

### macOS:
1. 打開 **Terminal**（終端機）
   - 按 `Cmd + Space` 搜尋 "Terminal"
   - 或從 Applications → Utilities → Terminal

2. 在終端機中，執行：
   ```bash
   cd /Users/dansoong/Desktop/eshop
   firebase login
   ```

3. 這會打開瀏覽器，讓你登入 Google 帳號

### 在 VS Code / Cursor 中：
1. 打開終端機面板：
   - 按 `` Ctrl + ` `` (反引號)
   - 或 View → Terminal

2. 執行：
   ```bash
   firebase login
   ```

## 方法 2: 使用我創建的腳本

在終端機執行：
```bash
cd /Users/dansoong/Desktop/eshop
./deploy-firebase-function.sh
```

腳本會自動檢查並提示你登入。

## 確認登入成功

登入後，執行以下命令確認：
```bash
firebase projects:list
```

如果看到你的專案列表，表示登入成功！

