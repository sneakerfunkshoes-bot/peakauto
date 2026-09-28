'use client';

import { useEffect, useRef, useState } from 'react';
import { BUY_URL, PurchaseToast, SaleBar, useSale } from '@/components/landing/sale';

export function LazyLanding() {
  const { secondsLeft, toast, toastVisible } = useSale();
  const [guideOpen, setGuideOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const raiseVolume = () => {
      video.volume = 0.3;
    };

    const playWithSound = async () => {
      raiseVolume();
      video.muted = false;
      try {
        await video.play();
      } catch {
        video.muted = true;
        await video.play().catch(() => undefined);
      }
    };

    const unlockSound = () => {
      if (video.ended) return;
      raiseVolume();
      video.muted = false;
      void video.play();
    };

    void playWithSound();
    window.addEventListener('pointerdown', unlockSound);
    return () => window.removeEventListener('pointerdown', unlockSound);
  }, []);

  function replayVideo() {
    const video = videoRef.current;
    if (!video) return;
    setGuideOpen(false);
    video.currentTime = 0;
    video.volume = 0.3;
    video.muted = false;
    void video.play().catch(() => {
      video.muted = true;
      void video.play();
    });
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-stone-900">
      <SaleBar secondsLeft={secondsLeft} />

      <section className="relative mx-auto max-w-3xl px-4 pb-16 pt-4 text-center sm:px-5 sm:pt-5">
        <p className="text-sm font-semibold tracking-wide text-[#E65C00] sm:text-base">
          PeakAuto.Ai
        </p>
        <p className="mt-3 text-sm font-semibold text-stone-800 sm:text-base">
          What you&apos;re gonna get in this
        </p>
        <div
          className="mx-auto mt-3"
          style={{ width: 'min(calc((100vw - 1rem) * 0.85), calc((100dvh - 7.25rem) * 9 / 16 * 0.85))' }}
        >
          <div
            className="relative aspect-[9/16] cursor-pointer overflow-hidden rounded-[1.75rem] border-[4px] border-[#E65C00] bg-stone-950 shadow-xl shadow-orange-900/15"
            onClick={replayVideo}
          >
            <video
              ref={videoRef}
              className="pointer-events-none h-full w-full object-cover"
              src="/preview.mp4"
              autoPlay
              playsInline
              preload="auto"
              onEnded={() => setGuideOpen(true)}
            />
            {guideOpen ? (
              <div className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-stone-950/80 via-stone-950/35 to-transparent px-4 pb-8">
                <div
                  className="guide-pop w-full rounded-3xl bg-white px-4 py-5 text-center shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <p className="text-base font-bold text-stone-950">Get the full guide</p>
                  <p className="mt-1 text-sm text-stone-500">40 pages · English PDF · ₹249</p>
                  <a
                    href={BUY_URL}
                    className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#E65C00] px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-600/25 transition hover:bg-[#cc5200] active:scale-[0.98]"
                  >
                    Get Guide
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <PurchaseToast toast={toast} toastVisible={toastVisible} />
    </div>
  );
}
