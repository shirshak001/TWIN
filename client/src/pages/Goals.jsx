import React from 'react';
import { Target, CalendarCheck, Sparkles, Shield, ListChecks, ArrowRight } from 'lucide-react';

const colorStyles = {
  blue: { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
  emerald: { bg: '#dcfce7', border: '#86efac', text: '#15803d' },
  indigo: { bg: '#e0e7ff', border: '#c7d2fe', text: '#4338ca' },
  amber: { bg: '#ffedd5', border: '#fcd34d', text: '#b45309' },
  purple: { bg: '#ede9fe', border: '#ddd6fe', text: '#7c3aed' },
};

const goalItems = [
  { title: 'Become Frontend Developer', status: 'Active', progress: 62, color: 'blue' },
  { title: 'Lose 8 kg', status: 'In Progress', progress: 43, color: 'emerald' },
  { title: 'Save $5,000', status: 'On Track', progress: 55, color: 'indigo' },
  { title: 'Quit Smoking', status: 'Recovery', progress: 29, color: 'amber' },
];

const priorityItems = [
  { title: 'Frontend Career Plan', priority: 'High', icon: Target, color: 'blue' },
  { title: 'Health & Sleep Routine', priority: 'Medium', icon: Sparkles, color: 'emerald' },
  { title: 'Budget Review', priority: 'Low', icon: Shield, color: 'indigo' },
];

const compactFacts = [
  { title: 'Focus blocks', value: '4/day' },
  { title: 'Review cadence', value: 'Weekly' },
  { title: 'Confidence', value: '78%' },
];

function Goals() {
  return (
    <div className="min-h-screen bg-(--secondary-bg) px-4 py-4 sm:px-6 lg:px-8 text-(--text)">
      <div className="grid gap-4 xl:grid-cols-[1.75fr_1fr]">
        <div className="space-y-4">
          <header className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Goal Management</p>
            <h1 className="mt-3 text-3xl font-bold text-(--text)">Goals & Progress</h1>
            <p className="mt-2 text-sm leading-6 text-(--muted) max-w-2xl">
              Compact goal tracking with priority signals, streak metrics, and AI-backed suggestions in one view.
            </p>
          </header>

          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryCard title="Overall progress" value="60%" detail="4 active goals" color="blue" />
            <SummaryCard title="Risk level" value="Low" detail="Healthy pace" color="emerald" />
            <SummaryCard title="Recommendations" value="4" detail="Actionable next steps" color="purple" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {goalItems.map((goal) => (
              <CompactGoalCard key={goal.title} goal={goal} />
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <article className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--muted)">Priorities</p>
                <h2 className="mt-2 text-xl font-bold text-(--text)">What matters now</h2>
              </div>
              <Target className="h-5 w-5 text-(--primary)" />
            </div>
            <div className="space-y-3">
              {priorityItems.map((item) => (
                <PriorityTile key={item.title} item={item} />
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--muted)">AI Suggestions</p>
                <h2 className="mt-2 text-xl font-bold text-(--text)">Adaptive coaching</h2>
              </div>
              <Sparkles className="h-5 w-5 text-(--secondary)" />
            </div>
            <p className="text-sm leading-6 text-(--muted)">
              The system balances motivation and recovery with shorter effort cycles, reducing wasted time and preserving your routine.
            </p>
          </article>

          <article className="rounded-3xl border border-(--border) bg-(--surface) p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-(--text)">Compact insights</h2>
              <ArrowRight className="h-5 w-5 text-(--secondary)" />
            </div>
            <div className="space-y-3">
              {compactFacts.map((fact) => (
                <MiniFact key={fact.title} title={fact.title} value={fact.value} />
              ))}
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, detail, color }) {
  return (
    <article className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4 shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-(--muted)">{title}</p>
      <p className="mt-3 text-3xl font-bold" style={{ color: colorStyles[color].text }}>{value}</p>
      <p className="mt-2 text-sm text-(--muted)">{detail}</p>
    </article>
  );
}

function CompactGoalCard({ goal }) {
  return (
    <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4 shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--muted)">{goal.status}</p>
          <h3 className="mt-2 text-lg font-bold text-(--text)">{goal.title}</h3>
        </div>
        <span className="text-sm font-semibold text-(--text)">{goal.progress}%</span>
      </div>
      <ProgressMeter label="Progress" value={goal.progress} color={goal.color} />
    </div>
  );
}

function PriorityTile({ item }) {
  return (
    <div className="rounded-2xl border border-(--border) bg-(--surface-soft) p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ backgroundColor: colorStyles[item.color].bg, color: colorStyles[item.color].text }}>
          <item.icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-(--text)">{item.title}</p>
          <p className="text-sm text-(--muted)">Priority: {item.priority}</p>
        </div>
      </div>
    </div>
  );
}

function MiniFact({ title, value }) {
  return (
    <div className="rounded-2xl border border-(--border) bg-(--surface-soft) p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-(--muted)">{title}</p>
      <p className="mt-2 text-lg font-semibold text-(--text)">{value}</p>
    </div>
  );
}

function ProgressMeter({ label, value, color }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-(--muted)">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: colorStyles[color]?.text || '#2563eb' }} />
      </div>
    </div>
  );
}

export default Goals;
