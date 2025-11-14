'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { signIn } from '@/lib/firebaseAuth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Step 1: Sign in with Firebase (this also ensures user exists in local DB)
      const result = await signIn(email, password);
      
      if (!result || !result.user || !result.user.email) {
        setError('無法獲取用戶資訊');
        setLoading(false);
        return;
      }

      // Step 2: Check if user is admin via API
      const adminCheck = await fetch('/api/auth/check-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: result.user.email }),
      });

      const adminData = await adminCheck.json();

      if (!adminCheck.ok || !adminData.isAdmin) {
        // If user is admin@meatshop.com or manager@meatshop.com, ensure they have admin role
        if ((email === 'admin@meatshop.com' || email === 'manager@meatshop.com') && !adminData.isAdmin) {
          // Ensure admin role is set
          const ensureAdmin = await fetch('/api/auth/ensure-admin-role', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: result.user.email }),
          });
          
          if (ensureAdmin.ok) {
            // Check again after ensuring admin role
            const retryCheck = await fetch('/api/auth/check-admin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: result.user.email }),
            });
            
            const retryData = await retryCheck.json();
            if (!retryCheck.ok || !retryData.isAdmin) {
              setError('管理員帳號設置有誤，請聯繫系統管理員');
              setLoading(false);
              return;
            }
          } else {
            setError('無法設置管理員權限，請聯繫系統管理員');
            setLoading(false);
            return;
          }
        } else {
          setError(adminData.error || '您沒有管理員權限');
          setLoading(false);
          return;
        }
      }

      // Step 3: Store token in cookie
      document.cookie = `admin-token=${result.token}; path=/; max-age=604800`; // 7 days
      document.cookie = `firebase-token=${result.token}; path=/; max-age=604800`; // 7 days
      
      // Step 4: Redirect to admin dashboard
      router.push('/admin');
    } catch (err: any) {
      console.error('Login error:', err);
      // Handle specific Firebase errors
      let errorMessage = err.message || '登入失敗，請檢查您的帳號和密碼';
      if (err.message?.includes('user-not-found')) {
        errorMessage = '用戶不存在，請確認您已在 Firebase 中創建此帳號';
      } else if (err.message?.includes('wrong-password')) {
        errorMessage = '密碼錯誤';
      } else if (err.message?.includes('invalid-email')) {
        errorMessage = '無效的電子郵件地址';
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            管理員登入
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                電郵
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin@meatshop.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                密碼
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="admin123"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-semibold"
            >
              {loading ? '登入中...' : '登入'}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
            預設帳號：admin@meatshop.com / admin123
          </p>
        </div>
      </main>
    </div>
  );
}

