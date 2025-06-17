"use client";
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const DynamicHero = dynamic(() => import('../../../../components/ui/hero'), {
  ssr: false,
  loading: () => <Skeleton className="w-full min-h-[60vh]" />,
});

export default function HeroClientWrapper() {
  return <DynamicHero />;
} 