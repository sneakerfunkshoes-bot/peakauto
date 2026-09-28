'use client';

import { useEffect, useMemo, useState } from 'react';

export const BUY_URL = 'https://superprofile.bio/vp/ai-automation-guide--292';
const SALE_SECONDS = 7 * 60;

const FIRST_NAMES = [
  'Priya', 'Rahul', 'Ananya', 'Arjun', 'Sneha', 'Vikram', 'Isha', 'Rohan', 'Neha', 'Aditya',
  'Kavya', 'Siddharth', 'Meera', 'Karan', 'Pooja', 'Aman', 'Divya', 'Nikhil', 'Shreya', 'Harsh',
  'Anjali', 'Yash', 'Riya', 'Manish', 'Tanvi', 'Abhishek', 'Sanya', 'Kunal', 'Nisha', 'Varun',
  'Aishwarya', 'Deepak', 'Simran', 'Gaurav', 'Pallavi', 'Rajesh', 'Kritika', 'Suresh', 'Aarti', 'Mohit',
  'Lakshmi', 'Pranav', 'Swati', 'Ritesh', 'Bhavna', 'Ashish', 'Chitra', 'Naveen', 'Jyoti', 'Saurabh',
];

const LAST_NAMES = [
  'Sharma', 'Verma', 'Patel', 'Singh', 'Reddy', 'Iyer', 'Nair', 'Mehta', 'Kapoor', 'Joshi',
  'Gupta', 'Malhotra', 'Chopra', 'Desai', 'Banerjee', 'Mukherjee', 'Rao', 'Pillai', 'Agarwal', 'Saxena',
  'Kulkarni', 'Bhat', 'Choudhury', 'Pandey', 'Trivedi', 'Bansal', 'Kohli', 'Ghosh', 'Menon', 'Shetty',
];

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Chandigarh',
];

const VERBS = ['just purchased', 'just bought', 'secured a spot', 'joined PeakAuto.Ai'] as const;

function formatCountdown(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function buildPurchasePool() {
  const pool: string[] = [];
  for (const first of FIRST_NAMES) {
    for (const last of LAST_NAMES.slice(0, 12)) {
      for (const city of CITIES) {
        const verb = VERBS[(first.length + last.length + city.length) % VERBS.length]!;
        pool.push(`${first} ${last} from ${city} ${verb}`);
      }
    }
  }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j]!, pool[i]!];
  }
  return pool;
}

export function useSale() {
  const [secondsLeft, setSecondsLeft] = useState(SALE_SECONDS);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const purchasePool = useMemo(() => buildPurchasePool(), []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? SALE_SECONDS : prev - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let hideTimer: number | undefined;
    const show = () => {
      setToast({
        id: Date.now(),
        text: purchasePool[Math.floor(Math.random() * purchasePool.length)]!,
      });
      setToastVisible(true);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setToastVisible(false), 4500);
    };
    const start = window.setTimeout(show, 2500);
    const loop = window.setInterval(show, 10000);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(loop);
      window.clearTimeout(hideTimer);
    };
  }, [purchasePool]);

  return { secondsLeft, toast, toastVisible };
}

export function SaleBar({ secondsLeft }: { secondsLeft: number }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#E65C00] shadow-md shadow-orange-900/10">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-center px-4 sm:h-14">
        <p className="text-center text-sm font-bold tracking-wide text-white sm:text-base md:text-lg">
          Sale ends in{' '}
          <span className="tabular-nums" suppressHydrationWarning>
            {formatCountdown(secondsLeft)}
          </span>{' '}
          🔥
        </p>
      </div>
    </header>
  );
}

export function PurchaseToast({
  toast,
  toastVisible,
}: {
  toast: { id: number; text: string } | null;
  toastVisible: boolean;
}) {
  if (!toast) return null;
  return (
    <div
      className="pointer-events-none fixed bottom-4 left-0 right-0 z-[60] flex justify-center px-3 sm:bottom-6 sm:left-auto sm:right-6 sm:justify-end sm:px-0"
      role="status"
      aria-live="polite"
    >
      <div
        key={toast.id}
        className={`pointer-events-auto w-full max-w-sm rounded-2xl border border-orange-200 bg-white p-3.5 shadow-2xl shadow-orange-900/15 ${
          toastVisible ? 'lazy-toast-in' : 'lazy-toast-out'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E65C00] text-sm font-bold text-white">
            ✓
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">{toast.text}</p>
            <p className="mt-0.5 text-xs text-stone-500">Verified purchase · just now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
