# 🚀 デプロイメントガイド

## 📋 **デプロイ前チェックリスト**

### **✅ 必要な準備**
- [x] Node.js 18.0以上がインストール済み
- [x] バックエンドAPIが稼働中 (http://localhost:8000)
- [x] 環境変数が正しく設定済み
- [x] ビルドが成功することを確認済み

### **✅ 動作確認済み機能**
- [x] ページの正常表示
- [x] 気象データ仪表盘の表示
- [x] 適応策コントロールの動作
- [x] 予測グラフの表示
- [x] レスポンシブデザイン
- [x] TypeScript型チェック
- [x] ESLintチェック

## 🌐 **Vercelデプロイ手順**

### **1. Vercel CLIのインストール**
```bash
npm install -g vercel
```

### **2. プロジェクトのデプロイ**
```bash
# プロジェクトディレクトリで実行
vercel

# 初回デプロイ時の質問に回答
# - Set up and deploy? → Y
# - Which scope? → 個人アカウントを選択
# - Link to existing project? → N
# - Project name → climate-adaptation-frontend
# - Directory → ./
# - Override settings? → N
```

### **3. 環境変数の設定**
```bash
# バックエンドURLを設定
vercel env add NEXT_PUBLIC_BACKEND_URL

# 値を入力: https://your-backend-api.com
# 環境を選択: Production, Preview, Development
```

### **4. 再デプロイ**
```bash
vercel --prod
```

## 🐳 **Dockerデプロイ**

### **Dockerfileの作成**
```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### **ビルドと実行**
```bash
# イメージをビルド
docker build -t climate-adaptation-frontend .

# コンテナを実行
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 \
  climate-adaptation-frontend
```

## ☁️ **AWS App Runnerデプロイ**

### **1. GitHubリポジトリの準備**
```bash
# GitHubにプッシュ
git add .
git commit -m "feat: climate adaptation frontend"
git push origin main
```

### **2. App Runnerサービス作成**
1. AWS コンソールでApp Runnerを開く
2. 「サービスを作成」をクリック
3. ソース: GitHub
4. リポジトリ: climate-adaptation-frontend
5. ブランチ: main
6. ビルド設定:
   ```yaml
   version: 1.0
   runtime: nodejs18
   build:
     commands:
       build:
         - npm install
         - npm run build
   run:
     runtime-version: 18
     command: npm start
     network:
       port: 3000
       env: PORT
   ```

### **3. 環境変数設定**
- `NEXT_PUBLIC_BACKEND_URL`: バックエンドAPIのURL

## 🔧 **トラブルシューティング**

### **よくある問題**

#### **1. ビルドエラー**
```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install

# キャッシュをクリア
npm run build -- --no-cache
```

#### **2. 環境変数が反映されない**
```bash
# .env.localファイルを確認
cat .env.local

# 環境変数の確認
echo $NEXT_PUBLIC_BACKEND_URL
```

#### **3. APIエラー**
- バックエンドが起動していることを確認
- CORSの設定を確認
- ネットワーク接続を確認

### **デバッグ方法**
```bash
# 開発モードで詳細ログを確認
npm run dev

# ビルドの詳細ログ
npm run build -- --debug

# 本番モードでのテスト
npm run build && npm start
```

## 📊 **パフォーマンス最適化**

### **推奨設定**
- CDNの利用 (Vercel自動設定)
- 画像最適化 (Next.js自動)
- コード分割 (Next.js自動)
- キャッシュ設定

### **監視**
- Vercel Analytics
- Core Web Vitals
- エラー監視

## 🔒 **セキュリティ**

### **チェック項目**
- [x] 環境変数の適切な管理
- [x] HTTPS通信
- [x] CSP設定
- [x] 依存関係の脆弱性チェック

```bash
# 脆弱性チェック
npm audit
npm audit fix
```

## 📞 **サポート**

問題が発生した場合は、以下を確認してください：

1. **ログの確認**: ブラウザの開発者ツール
2. **バックエンド接続**: APIエンドポイントの疎通確認
3. **環境変数**: 正しく設定されているか確認
4. **ビルド**: ローカルでビルドが成功するか確認
