'use client';

import dynamic from 'next/dynamic';

// We safely do the SSR-disabled import inside this Client Component
const RadarMap = dynamic(() => import('./RadarMap'), { ssr: false });

export default function MapWrapper() {
  return <RadarMap />;
}