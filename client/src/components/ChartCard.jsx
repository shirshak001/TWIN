import { TrendingUp, BarChart3 } from 'lucide-react';

function ChartCard({ title, caption, data = [], type = 'bar', footer }) {
  const maxValue = Math.max(...data.map((item) => item.value), 0) || 1;
  const linePoints = data
    .map((item, index) => `${index * 28 + 12},${90 - (item.value / maxValue) * 64}`)
    .join(' ');

  return (
    <article className="rounded-[1.75rem] border border-(--border) bg-(--surface) p-5 shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-(--muted)">{title}</p>
          <p className="mt-2 text-sm font-semibold text-(--text)">{caption}</p>
        </div>
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(255,255,255,0.08)] text-(--text) shadow-lg shadow-[rgba(0,0,0,0.16)]">
          {type === 'bar' ? <BarChart3 className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
        </div>
      </div>

      <div className="mb-4 overflow-hidden rounded-3xl bg-(--secondary-bg) p-4">
        {type === 'bar' ? (
          <div className="flex items-end gap-3 h-44 px-2">
            {data.map((item) => (
              <div key={item.label} className="flex-1 space-y-2">
                <div
                  className="relative mx-auto h-full w-full rounded-full bg-gradient-to-t from-[rgba(124,255,178,0.4)] to-[rgba(110,168,254,0.2)] transition-all duration-500 hover:scale-[1.02]"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                />
                <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-(--muted)">{item.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative h-44 overflow-hidden rounded-3xl bg-[rgba(255,255,255,0.04)] p-4 text-(--text)">
            <svg viewBox="0 0 240 100" className="h-full w-full">
              <polyline
                fill="none"
                stroke="rgba(124,255,178,0.95)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="240"
                strokeDashoffset="0"
                points={linePoints}
              />
              {data.map((item, index) => {
                const x = index * 28 + 12;
                const y = 90 - (item.value / maxValue) * 64;
                return (
                  <circle key={item.label} cx={x} cy={y} r="4" fill="rgba(124,255,178,0.95)" />
                );
              })}
            </svg>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-(--muted)">
        <span>{footer}</span>
        <span className="rounded-full bg-[rgba(255,255,255,0.06)] px-3 py-1 font-semibold text-(--text)">Updated now</span>
      </div>
    </article>
  );
}

export default ChartCard;
