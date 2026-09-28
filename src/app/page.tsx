import { Plus_Jakarta_Sans } from 'next/font/google';
import { TextLanding } from '@/components/landing/TextLanding';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
});

export const metadata = {
  title: 'PeakAuto.Ai — Learn AI. Create More.',
  description:
    'A 40-page beginner guide to Instagram and YouTube automation, AI influencers, clipping and smarter editing. One-time purchase, English PDF, ₹249.',
};

export default function HomePage() {
  return (
    <div className={jakarta.className}>
      <TextLanding />
    </div>
  );
}
