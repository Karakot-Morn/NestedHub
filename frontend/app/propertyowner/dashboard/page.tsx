'use client';

import { useEffect, useState } from 'react';
import { LayoutGrid, Home } from 'lucide-react';
import Sidebar from '@/component/dashoboadpropertyowner/sidebar';
import Card from '@/component/dashoboadpropertyowner/card';
import { propertyApi } from '@/lib/api/property';

interface PropertyOwnerStats {
  totalProperties: number;
  activeProperties: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<PropertyOwnerStats>({
    totalProperties: 0,
    activeProperties: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch property stats for the current owner
        const statsData = await propertyApi.getOwnerStats();
        setStats({
          totalProperties: statsData.total_owned || 0,
          activeProperties: statsData.total_rented || 0, // You may want to use a different field if available
        });
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        if (err.message && (err.message.includes('403') || err.message.includes('Forbidden'))) {
          setError('403');
        } else if (err.message && (err.message.includes('401') || err.message.includes('Unauthorized'))) {
          // Token expired or invalid
          document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          window.location.href = '/login';
        } else {
          setError('Failed to load dashboard statistics');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (error) {
    if (error === '403') {
      return (
        <Sidebar>
          <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
            <div className="max-w-md p-8 text-center bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Home className="h-10 w-10 text-yellow-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-yellow-800 mb-2">Account Pending Approval</h2>
              <p className="text-yellow-700">
                Your property owner account is currently pending approval by an administrator.
                You will be able to view your dashboard statistics once your account is fully verified.
              </p>
            </div>
          </div>
        </Sidebar>
      );
    }
    
    return (
      <Sidebar>
        <div className="p-6">
          <div className="text-red-600">{error}</div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back to your dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            title="Total Properties" 
            value={isLoading ? '...' : stats.totalProperties.toString()} 
            icon={<LayoutGrid className="h-6 w-6 text-green-600" />} 
          />
          <Card 
            title="Rented Properties" 
            value={isLoading ? '...' : stats.activeProperties.toString()} 
            icon={<Home className="h-6 w-6 text-green-600" />} 
          />
        </div>
      </div>
    </Sidebar>
  );
}


