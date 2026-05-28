import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Target, CalendarCheck, Sparkles, Shield, ListChecks, ArrowRight, BookOpen, Heart, Wallet, Bolt } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const categoryOptions = [
  { value: 'finance', label: 'Finance Goal', icon: Wallet, tone: 'indigo' },
  { value: 'health', label: 'Health Goal', icon: Heart, tone: 'emerald' },
  { value: 'career', label: 'Career Goal', icon: Bolt, tone: 'blue' },
  { value: 'learning', label: 'Learning Goal', icon: BookOpen, tone: 'purple' },
  { value: 'personal', label: 'Personal Development Goal', icon: Target, tone: 'amber' },
];

const defaultGoals = [
  {
    id: 1,
    category: 'career',
    title: 'Build a startup MVP',
    targetDate: '2024-12-15',
    status: 'Active',
    desiredOutcome: 'Launch an initial product to gather user feedback.',
    progress: 36,
    roadmap: ['Define product hypothesis', 'Build core features', 'Run pilot tests'],
    milestones: ['MVP planning', 'User research', 'Prototype review'],
    weeklyPlan: ['Design feature flow', 'Finish first sprint', 'Run user session'],
    probability: 68,
  },
  {
    id: 2,
    category: 'health',
    title: 'Lose 10kg in 6 months',
    targetDate: '2025-03-01',
    status: 'On Track',
    desiredOutcome: 'Sustainable weight loss with better energy and sleep.',
    progress: 22,
    roadmap: ['Track calories', 'Do 4 weekly workouts', 'Improve hydration'],
    milestones: ['Week 1 food log', 'Week 4 workout routine', 'Week 8 consistency review'],
    weeklyPlan: ['Log meals daily', '2 strength sessions', '3 low-impact cardio sessions'],
    probability: 59,
  },
];

function Goals() {
  const [goals, setGoals] = useState(defaultGoals);
  const [showModal, setShowModal] = useState(false);
  const [goalStep, setGoalStep] = useState(1);
  const [newGoal, setNewGoal] = useState({
    category: 'health',
    title: '',
    targetDate: '',
    currentStatus: 'Planning',
    desiredOutcome: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('digitalTwinGoals');
    if (stored) {
      setGoals(JSON.parse(stored));
    }
  }, []);

  const activeGoals = goals.filter((goal) => goal.status !== 'Completed').length;
  const averageProgress = useMemo(() => {
    if (!goals.length) return 0;
    return Math.round(goals.reduce((total, goal) => total + (goal.progress || 0), 0) / goals.length);
  }, [goals]);

  const handleNewGoalChange = (field, value) => {
    setNewGoal((current) => ({ ...current, [field]: value }));
  };

  const generatePlan = (goal) => {
    const category = categoryOptions.find((option) => option.value === goal.category);
    const roadmap = [
      `Map the first 2–4 steps for ${goal.title.toLowerCase()}.`,
      `Break the journey into weekly milestones aligned to ${goal.category} focus.`,
      `Review progress every 7 days and adjust actions.`,
    ];
    const milestones = [
      `Outline core outcome for ${goal.title}.`,
      `Create a clear second milestone by next week.`,
      `Set a measurable check-in before ${goal.targetDate}.`,
    ];
    const weeklyPlan = [
      `Spend 30 minutes on the highest-impact ${goal.category} action.`,
      `Allocate one recovery or awareness session this week.`,
      `Log progress in the app at the end of each day.`,
    ];

    return {
      roadmap,
      milestones,
      weeklyPlan,
      probability: Math.max(45, Math.min(95, 40 + Math.floor(Math.random() * 45))),
      color: category?.tone || 'blue',
    };
  };

  const persistGoals = (updatedGoals) => {
    localStorage.setItem('digitalTwinGoals', JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const saveGoal = async () => {
    const trimmedTitle = newGoal.title.trim();
    const trimmedOutcome = newGoal.desiredOutcome.trim();
    if (!trimmedTitle || !newGoal.targetDate || !trimmedOutcome) {
      toast.error('Please complete the goal title, date, and outcome.');
      return;
    }

    const goalPayload = {
      id: Date.now(),
      category: newGoal.category,
      title: trimmedTitle,
      targetDate: newGoal.targetDate,
      status: newGoal.currentStatus || 'Active',
      desiredOutcome: trimmedOutcome,
      progress: 0,
      ...generatePlan(newGoal),
    };

    setSaving(true);
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await axios.post(`${API_BASE_URL}/api/onboarding/goals`, goalPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      persistGoals([...goals, goalPayload]);
      toast.success('New goal added with an AI-generated roadmap.');
      setShowModal(false);
      setGoalStep(1);
      setNewGoal({ category: 'health', title: '', targetDate: '', currentStatus: 'Planning', desiredOutcome: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to save goal.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--secondary-bg) px-4 py-6 sm:px-6 lg:px-8 text-(--text)">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-(--border) bg-(--surface) p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-(--muted)">Goal architecture</p>
              <h1 className="text-4xl font-semibold text-(--text)">AI goal system</h1>
              <p className="max-w-2xl text-sm leading-7 text-(--muted)">
                Add a goal, then let your AI Life Operating System generate a roadmap, milestones, and weekly action plan.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-[rgba(124,255,178,0.95)]"
            >
              <ListChecks className="h-5 w-5" /> Add New Goal
            </button>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <article className="space-y-6 rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricSummary title="Active goals" value={String(activeGoals)} icon={Target} accent="blue" />
              <MetricSummary title="Average progress" value={`${averageProgress}%`} icon={Sparkles} accent="emerald" />
              <MetricSummary title="Roadmap count" value={String(goals.length)} icon={CalendarCheck} accent="purple" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">Action plan</p>
                  <h2 className="mt-2 text-2xl font-semibold text-(--text)">AI coaching summary</h2>
                </div>
                <Sparkles className="h-5 w-5 text-(--secondary)" />
              </div>
              <p className="text-sm leading-7 text-(--muted)">
                Your new goals feed the simulation engine and cross-domain intelligence system for smarter life planning.
              </p>
            </div>

            <div className="rounded-[2rem] border border-(--border) bg-(--surface-soft) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <h3 className="text-xl font-semibold text-(--text)">Quick startup checklist</h3>
              <ul className="mt-4 space-y-3 text-sm text-(--muted)">
                <li>• Align each goal with a measurable weekly step.</li>
                <li>• Keep one health and one finance goal active at all times.</li>
                <li>• Use daily updates to calibrate urgency and risk.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[2rem] border border-(--border) bg-(--secondary-bg) p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">Add new goal</p>
                <h2 className="mt-2 text-3xl font-semibold text-(--text)">{goalStep === 1 ? 'Choose a goal category' : 'Define your goal details'}</h2>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="text-(--muted) hover:text-(--text)">Close</button>
            </div>
            <div className="grid gap-6">
              {goalStep === 1 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {categoryOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleNewGoalChange('category', option.value)}
                        className={`rounded-3xl border p-5 text-left transition ${
                          newGoal.category === option.value
                            ? 'border-(--primary) bg-[rgba(124,255,178,0.14)] shadow-sm'
                            : 'border-(--border) bg-(--surface-soft) hover:border-[rgba(124,255,178,0.18)]'
                        }`}
                      >
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[rgba(124,255,178,0.12)] text-(--primary)`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <p className="text-lg font-semibold text-(--text)">{option.label}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid gap-4">
                  <label className="space-y-2 text-sm text-(--text)">
                    <span>Goal title</span>
                    <input
                      value={newGoal.title}
                      onChange={(event) => handleNewGoalChange('title', event.target.value)}
                      placeholder="E.g. Save ₹1,00,000"
                      className="w-full rounded-3xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--text) outline-none focus:border-(--primary) focus:ring-2 focus:ring-[rgba(124,255,178,0.18)]"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-(--text)">
                    <span>Target date</span>
                    <input
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(event) => handleNewGoalChange('targetDate', event.target.value)}
                      className="w-full rounded-3xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--text) outline-none focus:border-(--primary) focus:ring-2 focus:ring-[rgba(124,255,178,0.18)]"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-(--text)">
                    <span>Desired outcome</span>
                    <textarea
                      rows={4}
                      value={newGoal.desiredOutcome}
                      onChange={(event) => handleNewGoalChange('desiredOutcome', event.target.value)}
                      placeholder="E.g. Develop career-ready React project and launch MVP."
                      className="w-full rounded-3xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--text) outline-none focus:border-(--primary) focus:ring-2 focus:ring-[rgba(124,255,178,0.18)]"
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setGoalStep((prev) => Math.max(1, prev - 1))}
                className="rounded-full border border-(--border) bg-(--surface) px-6 py-3 text-sm font-semibold text-(--text) hover:bg-[rgba(255,255,255,0.08)]"
              >
                Back
              </button>
              {goalStep === 1 ? (
                <button
                  type="button"
                  onClick={() => setGoalStep(2)}
                  className="rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-[#0b1020] hover:bg-[rgba(124,255,178,0.95)]"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={saveGoal}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-[#0b1020] hover:bg-[rgba(124,255,178,0.95)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? 'Creating goal...' : 'Create goal'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricSummary({ title, value, icon: Icon, accent }) {
  return (
    <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[rgba(124,255,178,0.1)] text-(--primary)">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-(--text)">{value}</p>
        </div>
      </div>
    </div>
  );
}

function GoalCard({ goal }) {
  return (
    <div className="rounded-[2rem] border border-(--border) bg-(--surface-soft) p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-(--muted)">{goal.category.replace(/^[a-z]/, (c) => c.toUpperCase())} Goal</p>
          <h3 className="mt-2 text-xl font-semibold text-(--text)">{goal.title}</h3>
        </div>
        <span className="rounded-full bg-[rgba(124,255,178,0.15)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-(--primary)">{goal.status}</span>
      </div>
      <p className="text-sm text-(--muted)">{goal.desiredOutcome}</p>
      <div className="mt-4 space-y-3">
        <ProgressMeter label="Roadmap progress" value={goal.progress} color={goal.color} />
        <div className="rounded-3xl border border-(--border) bg-(--surface) p-4">
          <p className="text-sm font-semibold text-(--text)">Probability</p>
          <p className="mt-1 text-3xl font-bold text-(--text)">{goal.probability}%</p>
        </div>
      </div>
    </div>
  );
}

function ProgressMeter({ label, value, color }) {
  const colorMap = {
    blue: '#2563eb',
    emerald: '#10b981',
    indigo: '#4338ca',
    amber: '#d97706',
    purple: '#7c3aed',
  };
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-(--muted)">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: colorMap[color] || '#2563eb' }} />
      </div>
    </div>
  );
}

export default Goals;
