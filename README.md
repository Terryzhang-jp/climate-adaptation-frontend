# 🌍 気候変動適応策検討シミュレーション - フロントエンド

気候変動の影響と適応策の効果を統合的に評価するためのWebアプリケーションのフロントエンド部分です。

## 🚀 **技術スタック**

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **UI Components**: Headless UI
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Language**: TypeScript

## 📋 **機能概要**

### **主要機能**
- 🌡️ **リアルタイム気象データ表示** - 温度、降水量、生物多様性などの仪表盘
- 📊 **予測グラフ** - 2026-2100年の気候変動予測データ可視化
- 🎛️ **適応策コントロール** - 7つの適応策の投資レベル調整
- 🔄 **シミュレーション実行** - 25年間の気候変動シミュレーション
- 📈 **結果比較** - 異なる適応策の効果比較

### **適応策**
1. 🌳 **植林・森林保全** - 生態系レベル向上、洪水被害軽減
2. 🚌 **公共バス** - 都市利便性向上、交通インフラ整備
3. 🌊 **河川堤防** - 洪水被害の直接的軽減
4. 🧬 **高温耐性品種** - 農作物収量の安定化
5. 🏠 **住宅移転** - 災害リスク軽減
6. 🌾 **田んぼダム** - 水資源確保、洪水対策
7. 📚 **防災訓練・啓発** - 住民の適応能力向上

## 🛠️ **開発環境セットアップ**

### **前提条件**
- Node.js 18.0以上
- npm または yarn

### **インストール**
```bash
# リポジトリをクローン
git clone <repository-url>
cd climate-adaptation-frontend

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.local.example .env.local
# .env.localを編集してバックエンドURLを設定
```

### **環境変数**
```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### **開発サーバー起動**
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 🏗️ **プロジェクト構造**

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # メインページ
│   ├── formula/page.tsx   # モデル説明ページ
│   └── layout.tsx         # ルートレイアウト
├── components/            # Reactコンポーネント
│   ├── ui/               # 基础UIコンポーネント
│   ├── charts/           # グラフコンポーネント
│   ├── controls/         # 制御コンポーネント
│   └── layout/           # レイアウトコンポーネント
├── hooks/                # カスタムHooks
├── services/             # API通信
├── types/                # TypeScript型定義
└── utils/                # ユーティリティ関数
```

## 🔌 **バックエンド連携**

このフロントエンドは以下のAPIエンドポイントを使用します：

- `POST /simulate` - シミュレーション実行
- `GET /scenarios` - シナリオ一覧取得
- `GET /ranking` - ランキングデータ取得
- `GET /health` - ヘルスチェック

バックエンドAPIの詳細は `climate_adaptation_backend` プロジェクトを参照してください。

## 🚀 **デプロイ**

### **Vercelデプロイ**
```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel

# 環境変数を設定
vercel env add NEXT_PUBLIC_BACKEND_URL
```

### **その他のプラットフォーム**
```bash
# ビルド
npm run build

# 本番サーバー起動
npm start
```

## 📊 **パフォーマンス**

- **First Load JS**: ~270kB
- **ページサイズ**: ~165kB
- **ビルド時間**: ~3秒
- **開発サーバー起動**: ~700ms

## 🧪 **テスト**

```bash
# リンター実行
npm run lint

# 型チェック
npx tsc --noEmit

# ビルドテスト
npm run build
```

## 🤝 **貢献**

1. フォークしてブランチを作成
2. 変更を実装
3. テストを実行
4. プルリクエストを作成

## 📄 **ライセンス**

このプロジェクトはMITライセンスの下で公開されています。
