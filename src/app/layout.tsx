import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'PeakAuto.Ai — Learn AI. Create More.',
  description:
    'A 40-page beginner guide to Instagram and YouTube automation, AI influencers, clipping and smarter editing. One-time purchase, English PDF, ₹249.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
