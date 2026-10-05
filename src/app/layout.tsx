import type { Metadata, Viewport } from 'next';
import './globals.css';
import portfolioData from '../../data/portfolio-data.json';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Prevents double-tap zoom on mobile so the GBA buttons feel instant
  userScalable: false,
  themeColor: '#0a0c10',
};

export const metadata: Metadata = {
  title: portfolioData.seo.title,
  description: portfolioData.seo.description,
  keywords: portfolioData.seo.keywords,
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased min-h-screen bg-[#0f1117]">
        {children}
      </body>
    </html>
  );
}
