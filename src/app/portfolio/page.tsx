// Server Component — fetches data from Supabase
import React from 'react';
import { getPortfolioData } from '@/lib/portfolio-data';
import ProfessionalMode from '@/components/portfolio/ProfessionalMode';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortfolioPage() {
  const data = await getPortfolioData();
  return <ProfessionalMode data={data} />;
}
