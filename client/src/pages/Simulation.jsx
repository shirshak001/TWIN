import React, { useState } from 'react';
import { HeartPulse, Wallet, Briefcase, Activity, ArrowRight, BarChart3, Shield } from 'lucide-react';

const scenarios = [
  {
    label: 'Health Scenario',
    description: 'Sleep 8 hours, hydrate 3L, exercise 5x weekly.',
    impact: 'Improves recovery and reduces stress spending.',
    color: 'blue',
  },
  {
    label: 'Finance Scenario',
    description: 'Save ₹5,000 per month and cut dining expenses.',
    impact: 'Increases emergency buffer and lowers impulsive purchases.',
    color: 'emerald',
  },
  {
    label: 'Career Scenario',
    description: 'Study 3 hours daily with goal-driven tasks.',
    impact: 'Accelerates career progression and skill completion.',
    color: 'indigo',
  },
];

function Simulation() {
  const [activeScenario, setActiveScenario] = useState('Health Scenario');
  const selected = scenarios.find((item) => item.label === activeScenario);

  return (
    <div className="min-h-full bg-slate-50 px-6 py-6 text-slate-900 sm:px-8">
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">What-if Engine</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">AI Simulation</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
          Simulate future scenarios across health, finance, and career to compare outcomes before you decide.
        </p>
      </header>

      <section className="mb-6 grid gap-4 xl:grid-cols-12">
        <aside className="xl:col-span-3 space-y-4">
          {scenarios.map((scenario) => (
            <button
              key={scenario.label}
              onClick={() => setActiveScenario(scenario.label)}
              className={`w-full rounded-3xl border p-5 text-left transition-all duration-300 ${
                activeScenario === scenario.label ? 'border-slate-900 bg-slate-100 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm'
              }`}>
              <div className="mb-3 flex items-center justify-between gap-3 text-slate-900">
                <p className="text-sm font-semibold">{scenario.label}</p>
                <ArrowRight className="h-4 w-4" />
              </div>
              <p className="text-sm leading-6 text-slate-600">{scenario.description}</p>
            </button>
          ))}
        </aside>

        <article className="xl:col-span-9 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Selected scenario</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{selected.label}</h2>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-3xl bg-slate-100 text-slate-900">
              {selected.label.includes('Health') ? <HeartPulse className="h-6 w-6" /> : selected.label.includes('Finance') ? <Wallet className="h-6 w-6" /> : <Briefcase className="h-6 w-6" />}
            </div>
          </div>
          <p className="text-sm leading-7 text-slate-600">{selected.description}</p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <ImpactCard label="Predicted score" value="+18%" color="blue" />
            <ImpactCard label="Risk reduction" value="+12%" color="emerald" />
            <ImpactCard label="Opportunity gain" value="+22%" color="indigo" />
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Future Trajectory</p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">Projected outcome graph</h3>
              </div>
              <Shield className="h-5 w-5 text-slate-500" />
            </div>
            <div className="relative h-56 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 240" preserveAspectRatio="none">
                <line x1="0" y1="210" x2="760" y2="210" stroke="#e2e8f0" strokeWidth="1" />
                <path d="M0 180 C170 140 320 145 460 120 C560 105 650 90 760 82" fill="none" stroke="#2563eb" strokeWidth="4" />
                <path d="M0 180 C170 160 320 152 460 130 C560 120 650 108 760 98" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="7 7" />
              </svg>
              <div className="absolute inset-x-0 bottom-4 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 flex justify-between">
                <span>Today</span>
                <span>1 mo</span>
                <span>3 mo</span>
                <span>6 mo</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Impact Summary</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{selected.impact}</p>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Recommendations</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>- Maintain consistent effort over time.</li>
                <li>- Track progress daily and adjust as needed.</li>
                <li>- Balance risk with sustainable actions.</li>
              </ul>
            </article>
          </div>
        </article>
      </section>
    </div>
  );
}

function ImpactCard({ label, value, color }) {
  const colorMap = {
    blue: '#2563eb',
    emerald: '#10b981',
    indigo: '#4338ca',
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-bold" style={{ color: colorMap[color] }}>{value}</p>
    </div>
  );
}

export default Simulation;
