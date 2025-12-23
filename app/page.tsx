"use client";

import { useMemo, useState } from "react";

type ThemeKey = "classic" | "candy" | "frost";

const ornamentLayout = [
  { left: 50, top: 18, size: 18 },
  { left: 36, top: 26, size: 16 },
  { left: 64, top: 30, size: 15 },
  { left: 45, top: 36, size: 16 },
  { left: 56, top: 42, size: 18 },
  { left: 30, top: 45, size: 14 },
  { left: 70, top: 48, size: 16 },
  { left: 40, top: 54, size: 17 },
  { left: 58, top: 60, size: 15 },
  { left: 32, top: 63, size: 14 },
  { left: 72, top: 66, size: 18 },
  { left: 46, top: 70, size: 16 },
  { left: 60, top: 74, size: 15 },
];

const lightLayout = [
  { left: 42, top: 16 },
  { left: 56, top: 20 },
  { left: 34, top: 28 },
  { left: 50, top: 32 },
  { left: 66, top: 34 },
  { left: 28, top: 40 },
  { left: 44, top: 44 },
  { left: 60, top: 46 },
  { left: 74, top: 45 },
  { left: 26, top: 52 },
  { left: 42, top: 56 },
  { left: 58, top: 58 },
  { left: 72, top: 56 },
  { left: 32, top: 64 },
  { left: 48, top: 66 },
  { left: 64, top: 68 },
  { left: 76, top: 64 },
  { left: 38, top: 74 },
  { left: 54, top: 76 },
  { left: 68, top: 74 },
];

const toyLayout = [
  { left: 28, top: 82, width: 46, height: 30, box: "#f8798d", ribbon: "#ffe45e" },
  { left: 46, top: 84, width: 52, height: 28, box: "#8ecae6", ribbon: "#ffb703" },
  { left: 62, top: 82, width: 40, height: 32, box: "#9b5de5", ribbon: "#f2f0ff" },
  { left: 18, top: 85, width: 28, height: 22, box: "#2ec4b6", ribbon: "#ffffff" },
];

const snowLayout = Array.from({ length: 42 }, (_, index) => {
  const left = (index * 17) % 100;
  const delay = ((index * 37) % 120) / 24; // up to ~5s
  const duration = 8 + ((index * 29) % 50) / 5; // between 8-18s
  return { left, delay, duration };
});

const palettes: Record<ThemeKey, string[]> = {
  classic: ["#fbbf24", "#f43f5e", "#38bdf8", "#22c55e", "#f97316"],
  candy: ["#ef4444", "#f9a8d4", "#22d3ee", "#a855f7", "#facc15"],
  frost: ["#7dd3fc", "#bae6fd", "#a5f3fc", "#a3e635", "#fef08a"],
};

export default function Home() {
  const [theme, setTheme] = useState<ThemeKey>("classic");
  const [lightsOn, setLightsOn] = useState(true);
  const [twinkleSpeed, setTwinkleSpeed] = useState(1.6);
  const [snow, setSnow] = useState(true);
  const [shake, setShake] = useState(false);

  const ornaments = useMemo(
    () =>
      ornamentLayout.map((ornament, index) => ({
        ...ornament,
        color: palettes[theme][index % palettes[theme].length],
      })),
    [theme],
  );

  const startShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 650);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 md:flex-row">
        <section className="flex-1">
          <header className="mb-6 space-y-2 text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/70">
              Merry & Bright
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Build your own interactive Christmas tree
          </h1>
            <p className="text-base text-slate-300">
              Toggle the lights, change the mood, shake loose a little snow, and
              watch the toys and ornaments glow.
            </p>
          </header>

          <div className="relative aspect-[3/4] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-emerald-900/60 via-emerald-950/70 to-emerald-950 shadow-2xl shadow-emerald-900/40">
            <div
              className={`pointer-events-none absolute inset-0 transition-transform duration-500 ${shake ? "animate-wiggle" : ""}`}
            >
              <svg viewBox="0 0 200 260" className="h-full w-full">
                <defs>
                  <linearGradient id="treeGradient1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0ea463" />
                    <stop offset="100%" stopColor="#065f46" />
                  </linearGradient>
                  <linearGradient id="treeGradient2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#064e3b" />
                  </linearGradient>
                  <linearGradient id="trunkGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5a2b" />
                    <stop offset="100%" stopColor="#5a3c1a" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <polygon
                  points="100,16 18,152 182,152"
                  fill="url(#treeGradient1)"
                  opacity="0.92"
                />
                <polygon
                  points="100,56 26,192 174,192"
                  fill="url(#treeGradient2)"
                  opacity="0.95"
                />
                <rect
                  x="86"
                  y="194"
                  width="28"
                  height="40"
                  rx="4"
                  fill="url(#trunkGradient)"
                />

                <polygon
                  points="100,2 90,20 110,20"
                  fill="#fbbf24"
                  filter="url(#glow)"
                />
              </svg>

              {ornaments.map((ornament, index) => (
                <div
                  key={`ornament-${index}`}
                  className="absolute rounded-full border border-white/30 shadow-[0_0_24px_rgba(255,255,255,0.35)]"
                  style={{
                    left: `${ornament.left}%`,
                    top: `${ornament.top}%`,
                    width: ornament.size,
                    height: ornament.size,
                    background: ornament.color,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}

              {lightLayout.map((light, index) => (
                <div
                  key={`light-${index}`}
                  className={`absolute rounded-full bg-amber-300 shadow-[0_0_18px_rgba(255,196,126,0.75)] transition-all`}
                  style={{
                    left: `${light.left}%`,
                    top: `${light.top}%`,
                    width: 10,
                    height: 10,
                    opacity: lightsOn ? 1 : 0.12,
                    transform: "translate(-50%, -50%)",
                    animation: lightsOn
                      ? `twinkle ${twinkleSpeed}s ease-in-out infinite`
                      : "none",
                    animationDelay: `${index * 0.12}s`,
                  }}
                />
              ))}

              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <g
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 4"
                  className={lightsOn ? "animate-garland" : ""}
                >
                  <path d="M20 35 Q50 48 80 35" />
                  <path d="M16 48 Q50 58 84 46" />
                  <path d="M12 60 Q50 68 88 58" />
                  <path d="M18 72 Q50 80 82 70" />
                </g>
              </svg>

              {toyLayout.map((toy, index) => (
                <div
                  key={`toy-${index}`}
                  className="absolute rounded-lg shadow-lg shadow-black/40"
                  style={{
                    left: `${toy.left}%`,
                    top: `${toy.top}%`,
                    width: toy.width,
                    height: toy.height,
                    transform: "translate(-50%, 0)",
                    background: toy.box,
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-1/2 h-2"
                    style={{ background: toy.ribbon }}
                  />
                  <div
                    className="absolute inset-y-0 left-1/2 w-2"
                    style={{ background: toy.ribbon, transform: "translateX(-50%)" }}
                  />
                  <div className="absolute left-1/2 top-2 h-2 w-6 -translate-x-1/2 rounded-sm bg-white/60" />
                </div>
              ))}
            </div>

            {snow && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {snowLayout.map((flake, index) => (
                  <div
                    key={`snow-${index}`}
                    className="absolute h-2 w-2 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    style={{
                      left: `${flake.left}%`,
                      animation: `snowfall ${flake.duration}s linear infinite`,
                      animationDelay: `${flake.delay}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="flex w-full max-w-xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:w-96">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
              Controls
            </p>
            <h2 className="text-2xl font-semibold text-white">Make it yours</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4">
              <div>
                <p className="text-sm font-semibold">Lights</p>
                <p className="text-xs text-slate-300">
                  Toggle the warm twinkle across the branches.
          </p>
        </div>
              <button
                onClick={() => setLightsOn((prev) => !prev)}
                className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/40 transition hover:scale-105 hover:bg-emerald-300"
              >
                {lightsOn ? "Turn off" : "Turn on"}
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Twinkle speed</p>
                <span className="text-xs text-slate-300">{twinkleSpeed.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min={0.6}
                max={3}
                step={0.1}
                value={twinkleSpeed}
                onChange={(event) => setTwinkleSpeed(Number(event.target.value))}
                className="mt-3 w-full accent-emerald-400"
              />
              <p className="mt-2 text-xs text-slate-400">
                Slow for a calm glow, fast for a lively sparkle.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-semibold">Ornament palette</p>
              <div className="mt-3 flex gap-3">
                {(
                  [
                    { key: "classic", label: "Classic" },
                    { key: "candy", label: "Candy" },
                    { key: "frost", label: "Frost" },
                  ] as { key: ThemeKey; label: string }[]
                ).map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setTheme(option.key)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                      theme === option.key
                        ? "border-emerald-300 bg-emerald-500/20 text-white shadow-inner shadow-emerald-500/30"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-emerald-200/60"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSnow((prev) => !prev)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  snow
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-emerald-200/60"
                }`}
              >
                {snow ? "Hide snow" : "Let it snow"}
              </button>
              <button
                onClick={startShake}
                className="rounded-2xl border border-emerald-200/40 bg-emerald-500/20 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Shake the tree
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200">
              <p className="font-semibold text-white">What&apos;s included</p>
              <ul className="mt-2 space-y-1 text-xs leading-relaxed text-slate-300">
                <li>• Glow lights, glass balls, and satin ribbons</li>
                <li>• A pile of toys and gifts around the base</li>
                <li>• Garland that shimmers along the branches</li>
                <li>• Gentle snowfall you can toggle on and off</li>
              </ul>
            </div>
          </div>
        </aside>
        </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.9);
            filter: drop-shadow(0 0 8px rgba(255, 255, 200, 0.6));
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            filter: drop-shadow(0 0 18px rgba(255, 255, 200, 0.9));
            opacity: 1;
          }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-10%) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110%) translateX(6px);
            opacity: 0;
          }
        }

        @keyframes wiggle {
          0% {
            transform: rotate(0deg);
          }
          20% {
            transform: rotate(2deg);
          }
          40% {
            transform: rotate(-3deg);
          }
          60% {
            transform: rotate(2deg);
          }
          80% {
            transform: rotate(-1.5deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .animate-wiggle {
          animation: wiggle 0.65s ease-in-out;
        }

        @keyframes garland-wave {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -20;
          }
        }

        .animate-garland {
          animation: garland-wave 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
