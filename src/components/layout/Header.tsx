import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Info } from 'lucide-react';

interface HeaderProps {
  currentYear: number;
  onSimulate: () => void;
  onShowInfo: () => void;
  showResultButton: boolean;
  onShowResult: () => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({
  currentYear,
  onSimulate,
  onShowInfo,
  showResultButton,
  onShowResult,
  isLoading
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-gray-900">
            気候変動適応策検討シミュレーション
          </h1>
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-blue-600">
              {currentYear - 1}年
            </h2>
            <Button
              onClick={onSimulate}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? '実行中...' : '25年進める'}
            </Button>
            <Link href="/formula">
              <Button variant="outline">
                モデルの説明を見る
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {showResultButton && (
            <Button
              variant="success"
              size="lg"
              onClick={onShowResult}
            >
              結果を見る
            </Button>
          )}
          <button
            onClick={onShowInfo}
            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Info size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
