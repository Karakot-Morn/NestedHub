'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/lib/context/AuthContext'; // <-- CORRECTED IMPORT PATH

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading: loading } = useAuthContext(); // Using isLoading from useAuthContext

  useEffect(() => {
    if (!loading) { // Ensure authentication state has been determined
      if (!isAuthenticated || !user || user.role !== 'admin') {
        router.replace('/login');
        return;
      }
    }
  }, [isAuthenticated, user, loading, router]);

  // Show loading state while checking authorization
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  // If not authenticated or not admin, return null to prevent content flicker while redirecting
  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

