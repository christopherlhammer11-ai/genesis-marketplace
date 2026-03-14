"use client";

export function StatsBar({ skillCount }: { skillCount: number }) {
  return (
    <section className="border-y border-zinc-800 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{skillCount}</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
            Skills Listed
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">1M</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
            FLUX Supply
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">~400ms</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
            Settlement Time
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">$0.001</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
            Tx Cost (Solana)
          </div>
        </div>
      </div>
    </section>
  );
}
