import React, { useState } from 'react';
import Dialog from './Dialog';
import Button from './Button';
import { simulationAPI } from '@/services/api';

interface UserNameDialogProps {
  open: boolean;
  onClose: (userName: string) => void;
}

const UserNameDialog: React.FC<UserNameDialogProps> = ({ open, onClose }) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userName.trim()) {
      setError('お名前を入力してください');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if username already exists
      const existingUsers = await simulationAPI.getRanking();
      const existingUserNames = new Set(existingUsers.map(row => row.user_name));

      if (existingUserNames.has(userName.trim())) {
        setError('この名前は既に使用されています。別の名前を入力してください。');
        setLoading(false);
        return;
      }

      // Save to localStorage and close dialog
      localStorage.setItem('userName', userName.trim());
      onClose(userName.trim());
    } catch (err) {
      console.error('Username check error:', err);
      // If API fails, still allow the user to proceed
      localStorage.setItem('userName', userName.trim());
      onClose(userName.trim());
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userName.trim()) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={() => {}} title="お名前を入力してください">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="お名前を入力してください"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
            autoFocus
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={!userName.trim() || loading}
          className="w-full"
        >
          {loading ? '確認中...' : '登録'}
        </Button>
      </div>
    </Dialog>
  );
};

export default UserNameDialog;
