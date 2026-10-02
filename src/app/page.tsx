// Server Component — fetches data from Supabase at request time
import React from 'react';
import { GBAProvider } from '@/lib/gba-state';
import { PortfolioDataProvider } from '@/lib/portfolio-context';
import { getPortfolioData } from '@/lib/portfolio-data';
import GBADevice from '@/components/gba/GBADevice';

// Force dynamic rendering on every request so changes in Supabase appear immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const portfolioData = await getPortfolioData();

  return (
    <PortfolioDataProvider data={portfolioData}>
      <GBAProvider>
        <main className="min-h-screen flex items-center justify-center">
          <GBADevice />
        </main>
      </GBAProvider>
    </PortfolioDataProvider>
  );
}
