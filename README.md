# 造物間 · AI 程式工作室

透過對話建立可在瀏覽器使用的小程式，試用後存到程式庫，之後重新開啟並繼續使用。

## 目前功能與狀態

- 繁體中文創作工作室與手機版介面。
- 小程式預覽、程式庫儲存、重新開啟及繼續調整。
- 待辦清單、分帳計算器、專注計時器三個可操作範例。
- 使用者身分檢查與程式資料隔離。
- 程式資料自動儲存及版本衝突保護。
- 已實作 OpenAI Responses API 生成端點；服務金鑰尚未設定，真實 AI 生成尚未驗證。
- 網站尚未正式上線。將原始碼放到 GitHub 不會自動啟用 AI 或部署網站。

## 開發環境

Node.js 22.13 以上，使用 npm 與已附上的 package-lock.json。

1. 執行 npm ci 安裝套件。
2. 將 .env.example 複製為 .env。
3. 將 OPENAI_API_KEY 設為自己的服務金鑰；正式環境必須使用服務端秘密。
4. 執行 npm run build 產生 Worker 設定。
5. 套用本機 D1 migration：
   
   node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_polite_titanium_man.sql
   
6. 執行 npm run dev，使用啟動後顯示的本機網址。

本機登入使用開發模式模擬身分；正式環境透過 Sites 提供使用者身分。D1 資料庫與執行環境需要在正式部署時設定，GitHub Pages 的純靜態託管不會執行目前的 API 或資料庫。

## 原始碼結構

- app/studio.tsx：工作室、程式庫與預覽介面。
- app/api/：生成、程式與資料儲存端點。
- lib/sandbox.ts：隔離的小程式執行介面及資料橋接。
- lib/examples.ts：可直接試用的範例程式。
- db/schema.ts 與 drizzle/：資料庫 schema 與 migrations。
- .openai/hosting.json：原 Sites 的識別與資料庫綁定；接續 Sites 發布時重用既有 project_id。

## 已驗證

TypeScript 檢查、正式版本建置、待辦事項新增與儲存後重新開啟、未登入 API 存取拒絕、資料版本衝突保護，以及程式庫 WebMCP 工具的有效／無效輸入。

## 檔案保護

原始碼不包含服務金鑰、依賴套件、本機資料庫或暫存輸出。請保留 .gitignore，避免將 .env 或執行資料加入儲存庫。
