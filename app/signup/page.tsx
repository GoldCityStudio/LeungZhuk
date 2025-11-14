'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { signUp } from '@/lib/firebaseAuth';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('請填寫所有欄位');
      return;
    }

    if (formData.password.length < 6) {
      setError('密碼長度至少需要 6 個字符');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('密碼不一致');
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(formData.email, formData.password);
      
      // Store token in cookie
      document.cookie = `auth-token=${result.token}; path=/; max-age=604800`; // 7 days
      document.cookie = `firebase-token=${result.token}; path=/; max-age=604800`; // 7 days
      
      // Registration successful, redirect to home or login
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || '註冊失敗');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            註冊帳號
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓名
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="請輸入您的姓名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                電郵
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                密碼
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="至少 6 個字符"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                確認密碼
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="再次輸入密碼"
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
              {loading ? '註冊中...' : '註冊'}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
            已有帳號？{' '}
            <Link href="/login" className="text-primary-600 hover:underline">
              立即登入
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

