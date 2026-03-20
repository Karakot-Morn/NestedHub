'use client';
import { useEffect } from 'react';
import { propertyApi } from '@/lib/api/property';

export default function DebugPage() {
  useEffect(() => {
    console.log('DEBUG: propertyApi object:', propertyApi);
    console.log('DEBUG: getOwnerStats code:', propertyApi.getOwnerStats.toString());
    
    // Test a call and log the URL specifically
    const testFetch = async () => {
       try {
         await propertyApi.getOwnerStats();
       } catch (e) {
         console.log('DEBUG: Caught error in test call:', e);
       }
    };
    testFetch();
  }, []);

  return (
    <div className="p-10">
      <h1>Debug Page</h1>
      <p>Check the console logs for the code of getOwnerStats.</p>
    </div>
  );
}


