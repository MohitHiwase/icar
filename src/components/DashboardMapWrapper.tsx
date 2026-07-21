'use client';

import dynamic from 'next/dynamic';

const DashboardMap = dynamic(() => import('./DashboardMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#EDEEEF]">
      Loading map...
    </div>
  ),
});

export default function DashboardMapWrapper() {
  return <DashboardMap />;
}
