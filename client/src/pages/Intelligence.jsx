import React from 'react';
import { Brain, Layers, Shield, TrendingUp, BarChart3, Lightbulb, Zap, ArrowRight } from 'lucide-react';

const intelligenceCards = [
  {
    title: 'Cross-Domain Intelligence',
    detail: 'Connects health, finance, and career signals to surface system-level risk.',
    icon: Layers,
    status: 'Active',
  },
  {
    title: 'Behavioral Analysis',
    detail: 'Tracks routine consistency, habit shifts, and anomaly triggers over time.',
    icon: Brain,
    status: 'Growing accuracy',
  },
  {
    title: 'Adaptive AI',
    detail: 'Learns your response patterns and personalizes recommendations dynamically.',
    icon: Lightbulb,
    status: 'Learning',
  },
  {
    title: 'Explainable Alerts',
    detail: 'Shows why each recommendation was generated and the confidence level.',
    icon: Shield,
    status: 'Transparent',
  },
];

const insights = [
  { label: 'Stress vs Spending', value: 'High correlation', trend: 'up', em: 'red' },
  { label: 'Sleep vs Productivity', value: 'Strong influence', trend: 'up', em: 'blue' },
  { label: 'Income vs Goal Progress', value: 'Stable', trend: 'flat', em: 'emerald' },
];

function Intelligence() {
  return (
    <div className="min-h-full bg-slate-50 px-6 py-6 text-slate-900 sm:px-8">
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Digital Brain</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">AI Intelligence</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
          The engine that understands your behavior, risk, and opportunities across health, finance, and career.
        </p>
      </header>

      <section className="mb-6 grid gap-4 xl:grid-cols-4">
        {intelligenceCards.map((card) => (
          <article key={card.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{card.status}</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">{card.title}</h2>
              </div>
              <card.icon className="h-6 w-6 text-slate-500" />
            </div>
            <p className="text-sm leading-6 text-slate-600">{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-12">
        <article className="xl:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Adaptive AI</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Behavioral adaptation engine</h3>
            </div>
            <TrendingUp className="h-6 w-6 text-slate-500" />
          </div>
          <p className="text-sm leading-7 text-slate-600">
            The platform evaluates completed actions versus ignored suggestions and prioritizes future recommendations that are most likely to match your preferences.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ObservationLine label="Home workouts" value="favored" color="emerald" />
            <ObservationLine label="Late night spending" value="flagged" color="red" />
          </div>
        </article>

        <article className="xl:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Explainable AI</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Why this recommendation?</h3>
            </div>
            <Shield className="h-6 w-6 text-slate-500" />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm leading-6 text-slate-600">
              Recommendation: Reduce evening caffeine and prioritize restful sleep because historical patterns show higher stress and impulsive spending after 8 PM.
            </p>
            <div className="mt-4 grid gap-3">
              <ConfidenceBadge label="Confidence" value="82%" />
              <ConfidenceBadge label="Contributing factor" value="Sleep quality" />
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-12">
        <article className="xl:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900">Cross-Domain Intelligence</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Correlations between health, finance, and career give you a complete system view.</p>
          <div className="mt-6 space-y-4">
            <CrossIntelligenceItem title="Poor sleep reduced productivity" text="Low sleep consistency has been linked to decreased task completion rates and longer learning cycles." badge="Health → Career" color="blue" />
            <CrossIntelligenceItem title="Stress increased impulse spending" text="High stress spikes correlate with irregular purchases and overspending during evenings." badge="Health → Finance" color="red" />
          </div>
        </article>

        <article className="xl:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">AI Confidence</h3>
            <BarChart3 className="h-6 w-6 text-slate-500" />
          </div>
          <div className="space-y-4">
            <ConfidenceMeter label="High confidence" value={78} color="emerald" />
            <ConfidenceMeter label="Moderate confidence" value={58} color="blue" />
            <ConfidenceMeter label="Low confidence" value={33} color="amber" />
          </div>
        </article>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Future Predictions</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">Scenario impact overview</h3>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-500" />
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <PredictionMetric label="Health resilience" value="+16%" color="blue" />
            <PredictionMetric label="Financial buffer" value="+9%" color="emerald" />
            <PredictionMetric label="Career velocity" value="+12%" color="indigo" />
          </div>
        </div>
      </section>
    </div>
  );
}

function ObservationLine({ label, value, color }) {
  const colorMap = {
    blue: '#2563eb',
    emerald: '#10b981',
    red: '#ef4444',
  };

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span className="font-semibold" style={{ color: colorMap[color] }}>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full" style={{ width: color === 'blue' ? '88%' : color === 'emerald' ? '74%' : '54%', backgroundColor: colorMap[color] }} />
      </div>
    </div>
  );
}

function ConfidenceBadge({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
      <p>{label}</p>
      <p className="mt-1 text-xl">{value}</p>
    </div>
  );
}

function CrossIntelligenceItem({ title, text, badge, color }) {
  const colorMap = {
    blue: '#2563eb',
    red: '#ef4444',
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold" style={{ color: colorMap[color] }}>{badge}</span>
      </div>
      <p className="text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function ConfidenceMeter({ label, value, color }) {
  const colorMap = {
    emerald: '#10b981',
    blue: '#2563eb',
    amber: '#f59e0b',
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span className="font-semibold" style={{ color: colorMap[color] }}>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: colorMap[color] }} />
      </div>
    </div>
  );
}

function PredictionMetric({ label, value, color }) {
  const colorMap = {
    blue: '#2563eb',
    emerald: '#10b981',
    indigo: '#4338ca',
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
      <p className="font-semibold text-slate-900">{label}</p>
      <p className="mt-3 text-2xl font-bold" style={{ color: colorMap[color] }}>{value}</p>
    </div>
  );
}

export default Intelligence;
