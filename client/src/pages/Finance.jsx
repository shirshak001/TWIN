import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ArrowUp,
  ArrowRight,
  Zap,
  Check,
  Sun,
  Shield,
  Brain,
} from 'lucide-react';

const glassCardClass = 'rounded-lg border border-(--border) bg-(--surface) shadow-[0_24px_80px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.2)]';

const overviewMetrics = [
  {
    label: 'Savings Consistency',
    value: 'Peak',
    detail: '12-day active streak',
    tone: 'primary',
    bar: 100,
  },
  {
    label: 'Financial Stability',
    value: '82%',
    detail: '+2.4% this month',
    tone: 'primary',
    icon: Shield,
    ring: 82,
  },
  {
    label: 'Spending Balance',
    value: 'Balanced',
    detail: 'Allocated: $3,420 / $4,500',
    tone: 'neutral',
    segments: true,
  },
  {
    label: 'Stress Spending',
    value: 'Rising',
    detail: 'Anomaly detected',
    tone: 'warm',
    spark: [18, 42, 34, 66, 78, 92],
  },
];

function Finance() {
  return (
    <div className="min-h-full bg-(--secondary-bg) px-5 py-6 text-(--text) sm:px-6 lg:px-8">
      {/* Header Section */}
      <section className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-(--primary)">Finance Intelligence</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-(--muted)">
            Comprehensive tracking of behavioral spending metrics, global macroeconomic factors, and financial projections.
          </p>
        </div>
      </section>

      {/* 4 Required Metric Cards */}
      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <OverviewCard key={metric.label} metric={metric} />
        ))}
      </section>

      {/* Unusual Spending Spike & Macro Market Analysis */}
      <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Unusual Spending Spike Detector */}
        <article className={`${glassCardClass} p-6 xl:col-span-7`}>
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Unusual Spending Spike Detector</h2>
              <p className="mt-1 text-sm text-[#596467]">AI behavioral anomaly detection</p>
            </div>
            <span className="w-fit rounded-full bg-[rgba(245,158,11,0.16)] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-(--warning)">
              Action recommended
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-(--warning) bg-[rgba(245,158,11,0.1)] p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-(--warning)" />
                  <div>
                    <p className="text-base font-semibold text-(--text)">Weekend food delivery spending increased 28%</p>
                    <p className="mt-1 text-sm leading-6 text-(--muted)">
                      This spike correlates with a 15% reduction in sleep consistency during high-stress windows.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <MiniStat label="Avg. delivery cost" value="$42.50" delta="+12.40" />
                <MiniStat label="Trigger window" value="11 PM - 1 AM" />
              </div>
            </div>

            <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-lg border border-(--border) bg-[rgba(255,255,255,0.04)]">
              <div className="absolute inset-4 flex items-end justify-between gap-2">
                {[40, 35, 45, 85, 38].map((height, index) => (
                  <div
                    key={height + index}
                    className={`w-full rounded-sm ${index === 3 ? 'bg-(--warning)/70' : 'bg-(--secondary)/20'}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <p className="absolute bottom-3 text-[10px] font-bold uppercase tracking-[0.16em] text-(--muted)">Activity variance</p>
            </div>
          </div>
        </article>

        {/* Macro Market Context Card (War, Laws, Politics, Pandemics) */}
        <article className={`${glassCardClass} flex flex-col p-6 xl:col-span-5`}>
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Macro Market Analysis</h2>
            <p className="mt-1 text-sm text-[#596467]">Global catalysts: Political, Legal, Conflict, & Health updates</p>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-70 pr-1">
            <MarketImpactRow 
              title="Geopolitical Conflict / War Risks" 
              detail="Supply chain disruptions detected in energy sectors. Expect minor inflationary spikes in regional utility and fuel costs." 
              type="danger" 
            />
            <MarketImpactRow 
              title="Tax Law Amendments" 
              detail="New capital gains structural changes passed. Portfolio reassessment recommended prior to end-of-quarter cycles." 
              type="warning" 
            />
            <MarketImpactRow 
              title="Political / Policy Shifts" 
              detail="Tech sector regulatory updates impacting high-growth assets. Shifting allocation safely toward defensive indexes." 
              type="info" 
            />
            <MarketImpactRow 
              title="Public Health / Pandemics" 
              detail="Healthcare buffer thresholds optimized automatically following global biosurveillance warning models." 
              type="info" 
            />
          </div>
        </article>
      </section>

      {/* Observation & Suggestions and Cross Intelligence */}
      <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Finance Observation & Suggestion */}
        <article className={`${glassCardClass} p-6 xl:col-span-6`}>
          <h2 className="text-xl font-semibold mb-4 text-(--text)">Finance Observation & Suggestions</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border border-(--border) bg-[rgba(255,255,255,0.06)] p-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[rgba(124,255,178,0.16)] text-(--primary)">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-(--text)">Impulse Spending Trigger Mitigated</p>
                <p className="text-xs leading-5 text-(--muted) mt-1">Identified a loop of 10 PM social media surfing causing stress buys. Restricting shopping apps after 9 PM could yield up to $140/mo in direct savings.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border border-(--border) bg-[rgba(255,255,255,0.06)] p-4">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[rgba(124,255,178,0.16)] text-(--primary)">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-(--text)">Liquidity Optimization Target</p>
                <p className="text-xs leading-5 text-(--muted) mt-1">To counter market volatility, freeze all speculative certification/luxury purchases for 90 days. Redirect excess funds entirely into your Savings Shield.</p>
              </div>
            </div>
          </div>
        </article>

        {/* Cross Intelligence */}
        <article className={`${glassCardClass} p-6 space-y-4 xl:col-span-6`}>
          <h2 className="text-xl font-semibold">Cross Intelligence</h2>
          <RecommendationCard
            icon={AlertTriangle}
            title="Overspending Inflation Correlates to Stress"
            detail="When spending climbs past target budgets, internal economic pressure compromises focus, triggering reactive lifestyle cycles."
            tone="warm"
          />
          <RecommendationCard
            icon={Brain}
            title="Biometric Stress & Health Degradation Risk"
            detail="Spike indicators show higher financial anomalies precisely when sleep drops below 6.5 hours. Wellness directly dictates savings retention."
            tone="primary"
          />
        </article>
      </section>

      {/* Financial Trajectory (Future Projection Graph) */}
      <section className="grid grid-cols-1 gap-6">
        <article className={`${glassCardClass} p-6`}>
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Financial Trajectory</h2>
              <p className="mt-1 text-sm text-[#596467]">AI forecasting based on current lifestyle habits versus optimized stability tracks</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-(--muted)">
              <Legend color="#d98b72" label="Current path" />
              <Legend color="#416f82" label="Stable path" />
            </div>
          </div>
          <div className="relative h-72">
            <svg className="h-full w-full" viewBox="0 0 800 240" preserveAspectRatio="none">
              <line stroke="#e4e2e1" strokeWidth="1" x1="0" x2="800" y1="205" y2="205" />
              <line stroke="#e4e2e1" strokeWidth="1" x1="0" x2="800" y1="145" y2="145" />
              <line stroke="#e4e2e1" strokeWidth="1" x1="0" x2="800" y1="85" y2="85" />
              <path d="M0 168 Q200 178 400 194 T800 226" fill="none" opacity="0.55" stroke="#8b4e3f" strokeDasharray="8 6" strokeWidth="3" />
              <path d="M0 168 Q200 152 400 120 T800 48" fill="none" stroke="#416f82" strokeLinecap="round" strokeWidth="4" />
              <circle cx="400" cy="120" fill="#416f82" r="7" />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-[#596467]">
              <span>Current</span>
              <span>6 months</span>
              <span>1 year</span>
              <span>2 years</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between rounded-lg border border-(--border) bg-[rgba(255,255,255,0.05)] p-4">
            <p className="text-sm text-(--muted)">Projected difference in 24 months:</p>
            <span className="text-xl font-semibold text-(--secondary)">+$18,450.00</span>
          </div>
        </article>
      </section>
    </div>
  );
}

{/* --- Sub-Components --- */}

function MarketImpactRow({ title, detail, type }) {
  let badgeColor = "border-(--border) bg-[rgba(110,168,254,0.1)] text-(--secondary)";
  if (type === "danger") badgeColor = "border-(--border) bg-[rgba(239,68,68,0.1)] text-(--error)";
  if (type === "warning") badgeColor = "border-(--border) bg-[rgba(245,158,11,0.1)] text-(--warning)";

  return (
    <div className={`p-3 rounded-lg border ${badgeColor} flex flex-col gap-1`}>
      <h4 className="text-xs font-bold uppercase tracking-wider text-(--text)">{title}</h4>
      <p className="text-sm leading-relaxed text-(--muted)">{detail}</p>
    </div>
  );
}

function OverviewCard({ metric }) {
  const Icon = metric.icon;
  const tone = metric.tone === 'warm' ? '#f59e0b' : '#6ea8fe';

  return (
    <article className={`${glassCardClass} relative overflow-hidden p-5`}>
      <div className="absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-10 rounded-full bg-[rgba(124,255,178,0.12)]" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-(--muted)">{metric.label}</p>
          <h3 className="text-2xl font-semibold" style={{ color: tone }}>{metric.value}</h3>
          <p className="mt-2 flex items-center gap-1 text-sm text-(--muted)">
            {metric.tone === 'primary' && <ArrowUp className="h-4 w-4 text-(--secondary)" />}
            {metric.detail}
          </p>
        </div>
        {metric.ring && (
          <div className="relative h-16 w-16 shrink-0">
            <ProgressRing value={metric.ring} color={tone} />
            <Icon className="absolute inset-0 m-auto h-5 w-5" style={{ color: tone }} />
          </div>
        )}
      </div>

      {metric.bar && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
          <div className="h-full rounded-full bg-(--secondary)" style={{ width: `${metric.bar}%` }} />
        </div>
      )}

      {metric.segments && (
        <div className="mt-4 flex h-3 gap-1">
          <div className="flex-1 rounded-l-full bg-(--secondary)" />
          <div className="flex-1 bg-(--secondary)" />
          <div className="flex-1 bg-[rgba(110,168,254,0.4)]" />
          <div className="flex-1 rounded-r-full bg-[rgba(255,255,255,0.1)]" />
        </div>
      )}

      {metric.spark && (
        <div className="mt-4 flex h-9 items-end gap-1">
          {metric.spark.map((height, index) => (
            <div key={height + index} className="w-2 rounded-t-sm bg-[#8b4e3f]" style={{ height: `${height}%`, opacity: 0.2 + index * 0.13 }} />
          ))}
        </div>
      )}
    </article>
  );
}

function ProgressRing({ value, color }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg className="h-full w-full -rotate-90" viewBox="0 0 64 64">
      <circle cx="32" cy="32" fill="none" r={radius} stroke="#e4e2e1" strokeWidth="4" />
      <circle cx="32" cy="32" fill="none" r={radius} stroke={color} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

function MiniStat({ label, value, delta }) {
  return (
    <div className="rounded-lg border border-(--border) bg-[rgba(255,255,255,0.05)] p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-(--muted)">{label}</p>
      <p className="text-lg font-semibold text-(--text)">
        {value} {delta && <span className="text-sm text-(--warning)">{delta}</span>}
      </p>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2 text-(--muted)">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}

function RecommendationCard({ icon: Icon, title, detail, tone }) {
  const warm = tone === 'warm';

  return (
    <button className={`group w-full rounded-lg border p-4 text-left transition ${warm ? 'border-(--border) bg-[rgba(245,158,11,0.08)] hover:bg-[rgba(245,158,11,0.14)]' : 'border-(--border) bg-[rgba(110,168,254,0.08)] hover:bg-[rgba(110,168,254,0.14)]'}`} type="button">
      <div className="mb-2 flex items-start justify-between">
        <Icon className={`h-5 w-5 ${warm ? 'text-(--warning)' : 'text-(--secondary)'}`} />
        <ArrowRight className="h-4 w-4 text-(--muted) transition group-hover:text-(--secondary)" />
      </div>
      <p className="font-semibold text-sm text-(--text)">{title}</p>
      <p className="mt-1 text-xs leading-5 text-(--muted)">{detail}</p>
    </button>
  );
}

export default Finance;