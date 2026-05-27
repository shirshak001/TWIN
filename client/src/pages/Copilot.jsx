import { useMemo, useState } from 'react';
import {
  MessageCircle,
  Sparkles,
  Bolt,
  ArrowRight,
  BarChart3,
  Lightbulb,
  Activity,
  Clock3,
} from 'lucide-react';
import ChartCard from '../components/ChartCard';

const quickActions = [
  {
    title: 'Refocus your today plan',
    description: 'The twin suggests a short deep work block before lunch to maximize output.',
    badge: 'Focus',
    icon: Lightbulb,
    color: 'from-cyan-500 to-slate-900',
  },
  {
    title: 'Unlock a healthy streak',
    description: 'Add a hydration reminder and a 15-minute walk after your next meeting.',
    badge: 'Wellness',
    icon: Activity,
    color: 'from-emerald-500 to-green-900',
  },
  {
    title: 'Boost your skill cadence',
    description: 'Review a focused coding prompt after work to strengthen the learning loop.',
    badge: 'Growth',
    icon: Bolt,
    color: 'from-fuchsia-500 to-violet-900',
  },
];

const conversationSnippets = [
  {
    sentiment: 'positive',
    heading: 'Twin briefing',
    text: 'Your energy is best aligned with creative work between 10am and 1pm today.',
  },
  {
    sentiment: 'insight',
    heading: 'Hidden opportunity',
    text: 'Your focus score is 72%, and a short walk after lunch can improve it by 8%.',
  },
  {
    sentiment: 'advice',
    heading: 'Action prompt',
    text: 'Try a quick review session on your top goal before your next meeting.',
  },
];

function Copilot() {
  const [activeAction, setActiveAction] = useState(0);
  const selectedAction = quickActions[activeAction];
  const performanceData = useMemo(
    () => [58, 62, 68, 74, 81, 86, 92, 88],
    []
  );

  return (
    <div className="page page-copilot min-h-screen bg-(--secondary-bg) px-6 py-6 lg:px-10 text-(--text)">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="glass-card overflow-hidden rounded-4xl p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-[rgba(255,255,255,0.08)] px-3 py-1 text-sm font-semibold text-(--text) shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <Sparkles className="h-4 w-4 text-(--primary)" />
                Twin Copilot is listening
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-(--text)">Your AI twin is ready to guide the day.</h1>
              <p className="max-w-2xl text-sm leading-7 text-(--muted) opacity-90">
                Follow predictive prompts, quick actions, and context-aware insights across productivity, health, and career focus. All recommendations are generated from your latest habits and goals.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-105">
              {quickActions.slice(0, 2).map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(255,255,255,0.08)] text-(--text) shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-(--text)">{item.title}</p>
                    <p className="mt-1 text-xs text-(--muted)">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <article className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_15px_42px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1">
              <div className="mb-5 flex items-center justify-between">
                <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--muted)">Copilot Actions</p>
              <h2 className="mt-2 text-2xl font-semibold text-(--text)">Realtime suggestions</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.05)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-(--text)">
              <MessageCircle className="h-4 w-4 text-(--primary)" /> Live
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
                {quickActions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveAction(index)}
                      className={`group rounded-3xl border px-4 py-4 text-left shadcn-transition hover:-translate-y-0.5 ${activeAction === index ? 'border-(--primary) bg-[rgba(124,255,178,0.12)] shadow-sm' : 'border-(--border) bg-(--surface-soft)'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[rgba(255,255,255,0.08)] text-(--text) transition duration-300 group-hover:bg-[rgba(255,255,255,0.14)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-(--text)">{item.title}</p>
                          <p className="mt-1 text-sm text-(--muted)">{item.badge}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </article>

            <article className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-(--muted) uppercase tracking-[0.24em]">Performance snapshot</p>
                  <h3 className="mt-2 text-2xl font-semibold text-(--text)">Twin confidence trend</h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.05)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--text)">
                  <BarChart3 className="h-4 w-4 text-(--secondary)" /> +12% this week
                </div>
              </div>

              <ChartCard
                title="Adaptive feedback score"
                caption="Confidence rating from your twin's prediction engine"
                data={performanceData.map((value, index) => ({ label: `Day ${index + 1}`, value }))}
                type="line"
                footer="Goal: keep score above 80"
              />
            </article>
          </div>

          <div className="space-y-6">
            <article className="rounded-4xl border border-(--border) bg-(--secondary-bg) p-6 text-(--text) shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[rgba(255,255,255,0.7)]">Twin mood</p>
                  <h3 className="mt-2 text-2xl font-semibold">Ready for a momentum boost</h3>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[rgba(255,255,255,0.08)] text-(--primary) shadow-lg shadow-[rgba(124,255,178,0.12)]">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 space-y-4 rounded-3xl bg-[rgba(255,255,255,0.05)] p-4">
                <p className="text-sm leading-6 text-[rgba(255,255,255,0.8)]">Your twin suggests pairing a focused coding block with a short break every 90 minutes to sustain energy and creativity.</p>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] px-4 py-3 transition hover:border-[rgba(124,255,178,0.3)] hover:bg-[rgba(255,255,255,0.1)]">
                    <p className="text-sm font-semibold text-(--text)">Focus session</p>
                    <p className="mt-1 text-xs text-(--muted)">2 x 30 min blocks suggested</p>
                  </div>
                  <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] px-4 py-3 transition hover:border-[rgba(56,189,248,0.3)] hover:bg-[rgba(255,255,255,0.1)]">
                    <p className="text-sm font-semibold text-(--text)">Wellness check-in</p>
                    <p className="mt-1 text-xs text-(--muted)">Add a hydration alert after lunch</p>
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-(--muted)">Latest interaction</p>
                  <h3 className="mt-2 text-2xl font-semibold text-(--text)">Conversation highlights</h3>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.05)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-(--text)">
                  <Clock3 className="h-4 w-4 text-(--secondary)" /> Updated 10 min ago
                </span>
              </div>

              <div className="space-y-4">
                {conversationSnippets.map((snippet) => (
                  <div key={snippet.heading} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4 transition duration-300 hover:border-[rgba(56,189,248,0.35)] hover:shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-semibold text-(--text)">{snippet.heading}</h4>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-(--muted)">{snippet.sentiment}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-(--muted)">{snippet.text}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Copilot;
