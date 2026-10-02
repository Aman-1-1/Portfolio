// Server Component — fetches data from Supabase at request time
import React from 'react';
import { GBAProvider } from '@/lib/gba-state';
import { PortfolioDataProvider } from '@/lib/portfolio-context';
import { getPortfolioData } from '@/lib/portfolio-data';
import GBADevice from '@/components/gba/GBADevice';

// Revalidate every 60 seconds so edits from the admin panel appear promptly
export const revalidate = 60;

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
