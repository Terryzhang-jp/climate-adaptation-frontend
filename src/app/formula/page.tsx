import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function FormulaPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              モデルの説明
            </h1>
            <Link href="/">
              <Button variant="outline">
                シミュレーションに戻る
              </Button>
            </Link>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                システムダイナミクスモデル
              </h2>
              <p className="text-gray-600 leading-relaxed">
                このシミュレーションは、気候変動の影響と適応策の効果を統合的に評価するためのシステムダイナミクスモデルに基づいています。
                モデルは、気象条件、農業生産、都市機能、生態系、経済などの相互作用を表現しています。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                主要な変数と関係
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">気象変数</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 年平均気温</li>
                    <li>• 年降水量</li>
                    <li>• 極端気象の頻度</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">影響変数</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 農作物収量</li>
                    <li>• 洪水被害</li>
                    <li>• 生態系レベル</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">適応策</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• 植林・森林保全</li>
                    <li>• インフラ整備</li>
                    <li>• 技術開発</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">社会経済</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• 住民負担</li>
                    <li>• 都市利便性</li>
                    <li>• 予算制約</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                適応策の効果
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-800">植林・森林保全</h4>
                  <p className="text-gray-600 text-sm">
                    生態系レベルの向上、洪水被害の軽減、気温上昇の抑制効果
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800">河川堤防・田んぼダム</h4>
                  <p className="text-gray-600 text-sm">
                    洪水被害の直接的な軽減、水資源の確保
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800">高温耐性品種開発</h4>
                  <p className="text-gray-600 text-sm">
                    農作物収量の安定化、気温上昇への適応
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-800">住宅移転・防災訓練</h4>
                  <p className="text-gray-600 text-sm">
                    災害リスクの軽減、住民の適応能力向上
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                シミュレーションの使い方
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>各適応策のスライダーを調整して投資レベルを設定</li>
                <li>「25年進める」ボタンでシミュレーションを実行</li>
                <li>グラフで将来予測と実際の結果を比較</li>
                <li>異なる適応策の組み合わせを試して最適解を探索</li>
                <li>2100年まで到達したら結果を保存・比較</li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
