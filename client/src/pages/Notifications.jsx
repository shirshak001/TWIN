import { useMemo, useState } from 'react';
import { Bell, CheckCircle2, Clock3, ArrowRight, Info, Sparkles } from 'lucide-react';
import NotificationCard from '../components/NotificationCard';
import ChartCard from '../components/ChartCard';

const dummyNotifications = [
  {
    id: 1,
    title: 'Twin Copilot recommended a focus shift',
    message: 'Move your next task until after your midday energy peak for better concentration.',
    time: '5 min ago',
    tag: 'Action',
    variant: 'info',
  },
  {
    id: 2,
    title: 'Weekly balance summary is ready',
    message: 'Your health and finance scores improved by 9% compared to last week.',
    time: '30 min ago',
    tag: 'Summary',
    variant: 'success',
  },
  {
    id: 3,
    title: 'New alert from your wellbeing tracker',
    message: 'Your recovery score dipped slightly after two late nights in a row.',
    time: '1 hr ago',
    tag: 'Warning',
    variant: 'warning',
  },
  {
    id: 4,
    title: 'Goal progress unlocked',
    message: 'You completed 4 of 5 steps toward your week-long streak goal.',
    time: '2 hrs ago',
    tag: 'Progress',
    variant: 'success',
  },
];

const engagementData = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 56 },
  { label: 'Wed', value: 63 },
  { label: 'Thu', value: 77 },
  { label: 'Fri', value: 84 },
  { label: 'Sat', value: 71 },
  { label: 'Sun', value: 88 },
];

function Notifications() {
  const [filter, setFilter] = useState('all');
  const filteredNotifications = useMemo(() => {
    if (filter === 'all') return dummyNotifications;
    return dummyNotifications.filter((item) => item.variant === filter);
  }, [filter]);

  return (
    <div className="page page-notifications min-h-screen bg-(--secondary-bg) px-6 py-6 lg:px-10 text-(--text)">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="glass-card overflow-hidden rounded-4xl p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-[rgba(255,255,255,0.08)] px-4 py-2 text-sm font-semibold text-(--text) shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <Bell className="h-4 w-4 text-(--primary)" /> Notifications center
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-(--text)">Pulse, alerts, and twin updates.</h1>
              <p className="max-w-2xl text-sm leading-7 text-(--muted)">
                Keep your routine on track with the latest signals from your DigitalTwin and see how the week is trending across focus, recovery, and task momentum.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {['all', 'success', 'info', 'warning'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-300 ${filter === option ? 'border-(--primary) bg-(--primary) text-[#0b1020] shadow-sm' : 'border-(--border) bg-(--surface-soft) text-(--text) hover:border-(--primary) hover:text-(--text)'}`}
                >
                  {option === 'all' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.65fr]">
          <article className="space-y-4 rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-(--text)">Recent notifications</h2>
                <p className="mt-1 text-sm text-(--muted)">All your latest Copilot triggers and system summaries in one place.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-(--surface-soft) px-4 py-2 text-sm font-semibold text-(--text) transition hover:bg-[rgba(255,255,255,0.12)]">
                <CheckCircle2 className="h-4 w-4 text-(--primary)" /> Mark all read
              </button>
            </div>

            <div className="space-y-3">
              {filteredNotifications.map((item) => (
                <NotificationCard key={item.id} {...item} />
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <article className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-(--muted)">Engagement trend</p>
                  <h3 className="mt-2 text-xl font-semibold text-(--text)">Signal momentum</h3>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.05)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-(--text)">
                  <Sparkles className="h-4 w-4 text-(--secondary)" /> +18% week
                </span>
              </div>
              <ChartCard
                title="Notification engagement"
                caption="Week-over-week engagement from your twin and system alerts"
                data={engagementData}
                type="bar"
                footer="Most active day: Sunday"
              />
            </article>

            <article className="rounded-4xl border border-(--border) bg-(--secondary-bg) p-6 text-(--text) shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.22)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[rgba(255,255,255,0.55)]">Action summary</p>
              <h3 className="mt-3 text-2xl font-semibold">Today’s priority signals</h3>
              <ul className="mt-6 space-y-3 text-(--text)">
                <li className="flex items-start gap-3 rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-4 transition hover:border-[rgba(124,255,178,0.3)] hover:bg-[rgba(255,255,255,0.1)]">
                  <span className="mt-1 rounded-2xl bg-[rgba(124,255,178,0.15)] p-2 text-(--primary)"><ArrowRight className="h-4 w-4" /></span>
                  <div>
                    <p className="font-semibold text-(--text)">Protect your focus window</p>
                    <p className="mt-1 text-sm text-(--muted)">Silence low-value alerts during your deep work hours.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-4 transition hover:border-[rgba(56,189,248,0.3)] hover:bg-[rgba(255,255,255,0.1)]">
                  <span className="mt-1 rounded-2xl bg-[rgba(56,189,248,0.15)] p-2 text-(--secondary)"><Info className="h-4 w-4" /></span>
                  <div>
                    <p className="font-semibold text-(--text)">Stay ahead of the balance dip</p>
                    <p className="mt-1 text-sm text-(--muted)">Review the recovery summary before evening to avoid burnout risk.</p>
                  </div>
                </li>
              </ul>
            </article>
          </aside>
        </section>
      </div>
    </div>
  );
}

export default Notifications;
