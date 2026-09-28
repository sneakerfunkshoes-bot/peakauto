'use client';

import { BUY_URL, PurchaseToast, SaleBar, useSale } from '@/components/landing/sale';

export function TextLanding() {
  const { secondsLeft, toast, toastVisible } = useSale();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-stone-900">
      <SaleBar secondsLeft={secondsLeft} />

      <section className="relative mx-auto max-w-3xl px-5 pb-20 pt-14 text-center sm:pb-28 sm:pt-20">
        <p className="shop-rise text-sm font-semibold tracking-[0.18em] text-[#E65C00]">
          PeakAuto.Ai
        </p>
        <div className="shop-rise shop-delay-1 mx-auto mt-4 h-[3px] w-10 rounded-full bg-[#E65C00]" />
        <h1 className="shop-rise shop-delay-1 mx-auto mt-5 max-w-xl text-balance text-[2.65rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-stone-950 sm:text-6xl">
          Learn AI.
          <span className="mt-1 block text-[#E65C00]">Create More.</span>
        </h1>
        <p className="shop-rise shop-delay-2 mx-auto mt-6 max-w-md text-pretty text-[1.05rem] font-semibold leading-relaxed text-stone-800 sm:text-lg">
          Instagram & YouTube automation, AI influencers, clipping and smarter editing.
        </p>
        <p className="shop-rise shop-delay-3 mx-auto mt-3 max-w-md text-pretty text-[0.98rem] font-medium leading-relaxed text-stone-500 sm:text-base">
          Learn step by step with a 40-page beginner guide, visual workflows and practical AI prompts.
        </p>

        <div className="shop-rise shop-delay-4 mx-auto mt-10 w-full max-w-xs rounded-3xl border border-orange-100 bg-white px-4 py-5 shadow-[0_18px_50px_rgba(230,92,0,0.08)] sm:max-w-sm">
          <p className="text-4xl font-extrabold tracking-tight text-[#E65C00]">₹249/-</p>
          <p className="mt-1.5 text-xs font-medium tracking-wide text-stone-500 sm:text-sm">One-time purchase · English PDF</p>
          <a
            href={BUY_URL}
            className="shop-buy mt-4 flex w-full items-center justify-center rounded-2xl bg-[#E65C00] px-5 py-3 text-base font-bold tracking-wide text-white transition hover:bg-[#cc5200] active:scale-[0.98]"
          >
            Buy Guide
          </a>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#E65C00]/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-orange-200/40 blur-3xl"
        />
      </section>

      <PurchaseToast toast={toast} toastVisible={toastVisible} />
    </div>
  );
}
