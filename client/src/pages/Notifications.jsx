// Adaptive recommendations page with insights sidebar

const recommendations = [
  {
    id: 1,
    title: 'Increase Long-term Savings Allocation',
    description: 'Move a small surplus into savings while income stays ahead of expenditure.',
    badge: 'Healthy',
  },
  {
    id: 2,
    title: 'Add a Coding Signal',
    description: 'Connect GitHub or LeetCode to make career intelligence more specific.',
    badge: 'Healthy',
  },
  {
    id: 3,
    title: 'Maintain Productivity Rhythm',
    description: 'Add one focused morning work session and connect a coding signal.',
    badge: 'Healthy',
  },
];

const insights = [
  {
    id: 1,
    label: 'FINANCE',
    title: 'Financial Discipline',
    description: 'Financial discipline is currently stable as income stays ahead of expenditure.',
    status: 'stable',
  },
  {
    id: 2,
    label: '28% BURNOUT RISK',
    title: 'Recovery Baseline',
    description: 'Burnout risk is currently controlled by your recovery baseline.',
    status: 'warning',
  },
  {
    id: 3,
    label: 'HISTORICAL ALIGNMENT',
    title: 'Signal Alignment',
    description: 'Recent alignment of your intelligence signals over the week.',
    status: 'live',
    badge: 'LIVE',
  },
];

function RecommendationCard({ item }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/60 to-slate-800/40 p-8 transition-all duration-300 hover:border-emerald-400/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]">
      {/* Left accent border */}
      <div className="absolute inset-y-0 left-0 w-1.5 bg-emerald-400 transition-all duration-300 group-hover:w-2" />

      {/* Content grid */}
      <div className="relative flex flex-col gap-6">
        {/* Top section: Title and Badge */}
        <div className="flex items-start justify-between gap-6">
          <h3 className="flex-1 text-base font-bold uppercase tracking-widest text-emerald-300 leading-snug">
            {item.title}
          </h3>
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white shadow-lg">
            <span className="text-center text-xs font-bold uppercase tracking-wider text-slate-950">
              {item.badge}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-300 flex-1">
          {item.description}
        </p>

        {/* Bottom action tags */}
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="rounded-full border border-slate-500/50 bg-slate-900/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 transition-colors hover:border-emerald-400/50 hover:text-emerald-300">
            Recommended
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-200">
            Actionable
          </span>
        </div>
      </div>
    </article>
  );
}

function InsightCard({ insight }) {
  const statusStyles = {
    stable: 'border-emerald-400/50 text-emerald-300',
    warning: 'border-amber-400/50 text-amber-300',
    live: 'border-cyan-400/50 text-cyan-300',
  };

  return (
    <div className={`rounded-2xl border ${statusStyles[insight.status]} bg-white/5 p-6 backdrop-blur-sm transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em]">{insight.label}</p>
        {insight.badge && (
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/50 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {insight.badge}
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-slate-100 mb-3">{insight.title}</h3>
      <p className="text-xs leading-relaxed text-slate-400">{insight.description}</p>
    </div>
  );
}

function Notifications() {
  return (
    <div className="page page-notifications min-h-screen bg-[#07111f] px-6 py-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - Left */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Section */}
            <section className="rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/50 to-slate-800/30 p-12 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-6 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-300">
                    Deep Sync Active
                  </p>
                  <div className="space-y-4 max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                      Adaptive Recommendations
                    </h1>
                    <p className="text-sm leading-7 text-slate-300">
                      High-impact guidance across health, career, and finance signals, surfaced for your current dashboard state.
                    </p>
                  </div>
                </div>

                <div className="self-start">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-emerald-300 shadow-lg shadow-emerald-400/20">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                  </span>
                </div>
              </div>
            </section>

            {/* Recommendations Grid */}
            <section className="grid gap-6 sm:grid-cols-2">
              {recommendations.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
              {/* Single wide card for 3rd recommendation */}
              <div className="sm:col-span-2">
                <RecommendationCard item={recommendations[2]} />
              </div>
            </section>
          </div>

          {/* Sidebar - Right */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 px-2 mb-6">Quick Insights</h2>
              {insights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;

