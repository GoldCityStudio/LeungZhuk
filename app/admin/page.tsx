'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated with Firebase
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('firebase-token=') || row.startsWith('admin-token='))
      ?.split('=')[1];

    if (!token) {
      router.push('/admin/login');
      setLoading(false);
      return;
    }

    // Get user email from Firebase auth state
    import('@/lib/firebaseAuth').then(({ getCurrentUser }) => {
      const user = getCurrentUser();
      if (!user || !user.email) {
        router.push('/admin/login');
        setLoading(false);
        return;
      }

      // Verify Firebase token and check admin role
      fetch('/api/auth/verify-firebase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email: user.email }),
      })
        .then(res => {
          if (res.ok) {
            setAuthenticated(true);
          } else {
            router.push('/admin/login');
          }
        })
        .catch(() => {
          router.push('/admin/login');
        })
        .finally(() => {
          setLoading(false);
        });
    }).catch(() => {
      router.push('/admin/login');
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AdminDashboard />
    </div>
  );
}

