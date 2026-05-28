import { useMemo, useState } from 'react';
import { HeartPulse, Wallet, Briefcase, Activity, ArrowRight, Shield, Sparkles } from 'lucide-react';

const healthVariables = {
  weight: 72,
  calories: 2500,
  workoutFrequency: 3,
  sleepQuality: 7,
  waterIntake: 2.4,
  stressLevels: 5,
};

const financeVariables = {
  income: 55000,
  expenses: 38000,
  savings: 12000,
  investments: 18000,
  diningOut: 12000,
  subscriptions: 4500,
};

const careerVariables = {
  studyHours: 3,
  skillGrowth: 6,
  productivity: 70,
  learningConsistency: 5,
  focusScore: 68,
};

function Simulation() {
  const [health, setHealth] = useState(healthVariables);
  const [finance, setFinance] = useState(financeVariables);
  const [career, setCareer] = useState(careerVariables);

  const healthReport = useMemo(() => buildHealthScenario(health), [health]);
  const financeReport = useMemo(() => buildFinanceScenario(finance), [finance]);
  const careerReport = useMemo(() => buildCareerScenario(career), [career]);
  const crossDomainReport = useMemo(
    () => buildCrossDomainScenario(health, finance, career),
    [health, finance, career]
  );

  return (
    <div className="min-h-screen bg-(--secondary-bg) px-4 py-6 sm:px-8 text-(--text)">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-(--border) bg-(--surface) p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <p className="text-sm uppercase tracking-[0.24em] text-(--muted)">AI Life Scenario Simulator</p>
          <h1 className="mt-3 text-4xl font-semibold text-(--text)">Life scenario simulation</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-(--muted)">
            Adjust health, finance, and career variables to see how your life systems interact and what adaptive actions the AI recommends.
          </p>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <h2 className="text-2xl font-semibold text-(--text)">Input variables</h2>
            <p className="mt-2 text-sm text-(--muted)">Edit your current behavior signals to simulate future scenario recommendations.</p>

            <div className="mt-6 space-y-6">
              <VariableGroup title="Health Variables" icon={HeartPulse} variables={health} onChange={setHealth} />
              <VariableGroup title="Finance Variables" icon={Wallet} variables={finance} onChange={setFinance} />
              <VariableGroup title="Career Variables" icon={Briefcase} variables={career} onChange={setCareer} />
            </div>
          </article>

          <aside className="space-y-6">
            <ScenarioPanel title="Health Scenario" report={healthReport} icon={Activity} color="blue" />
            <ScenarioPanel title="Finance Scenario" report={financeReport} icon={Wallet} color="emerald" />
            <ScenarioPanel title="Career Scenario" report={careerReport} icon={Sparkles} color="indigo" />
            <ScenarioPanel title="Cross-Domain Scenario" report={crossDomainReport} icon={Shield} color="purple" />
          </aside>
        </section>
      </div>
    </div>
  );
}

function VariableGroup({ title, icon: Icon, variables, onChange }) {
  return (
    <div className="rounded-[2rem] border border-(--border) bg-(--surface-soft) p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[rgba(124,255,178,0.12)] text-(--primary)">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-(--text)">{title}</h3>
        </div>
      </div>
      <div className="space-y-4">
        {Object.entries(variables).map(([key, value]) => (
          <VariableSlider
            key={key}
            label={formatVariableLabel(key)}
            value={value}
            min={deriveMin(key)}
            max={deriveMax(key)}
            step={deriveStep(key)}
            unit={deriveUnit(key)}
            onChange={(nextValue) => onChange((current) => ({ ...current, [key]: nextValue }))}
          />
        ))}
      </div>
    </div>
  );
}

function VariableSlider({ label, value, min, max, step, unit, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-(--muted)">
        <span>{label}</span>
        <span className="font-semibold text-(--text)">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-(--primary)"
      />
    </div>
  );
}

function ScenarioPanel({ title, report, icon: Icon, color }) {
  return (
    <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">{title}</p>
          <h3 className="mt-2 text-xl font-semibold text-(--text)">{report.headline}</h3>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[rgba(255,255,255,0.08)] text-(--text)">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="text-sm leading-7 text-(--muted)">{report.body}</p>
      <div className="mt-4 space-y-3">
        {report.actions.map((action) => (
          <div key={action} className="rounded-3xl border border-(--border) bg-[rgba(255,255,255,0.05)] p-4 text-sm text-(--muted)">
            {action}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatVariableLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([0-9])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (char) => char.toUpperCase());
}

function deriveMin(key) {
  if (key === 'weight') return 35;
  if (key === 'calories') return 1200;
  if (key === 'workoutFrequency') return 0;
  if (key === 'sleepQuality') return 1;
  if (key === 'waterIntake') return 0;
  if (key === 'stressLevels') return 0;
  if (key === 'income') return 5000;
  if (key === 'expenses') return 1000;
  if (key === 'savings') return 0;
  if (key === 'investments') return 0;
  if (key === 'diningOut') return 0;
  if (key === 'subscriptions') return 0;
  if (key === 'studyHours') return 0;
  if (key === 'skillGrowth') return 0;
  if (key === 'productivity') return 0;
  if (key === 'learningConsistency') return 0;
  if (key === 'focusScore') return 0;
  return 0;
}

function deriveMax(key) {
  if (key === 'weight') return 110;
  if (key === 'calories') return 4200;
  if (key === 'workoutFrequency') return 7;
  if (key === 'sleepQuality') return 10;
  if (key === 'waterIntake') return 5;
  if (key === 'stressLevels') return 10;
  if (key === 'income') return 150000;
  if (key === 'expenses') return 100000;
  if (key === 'savings') return 100000;
  if (key === 'investments') return 100000;
  if (key === 'diningOut') return 30000;
  if (key === 'subscriptions') return 20000;
  if (key === 'studyHours') return 12;
  if (key === 'skillGrowth') return 10;
  if (key === 'productivity') return 100;
  if (key === 'learningConsistency') return 10;
  if (key === 'focusScore') return 100;
  return 100;
}

function deriveStep(key) {
  if (key === 'waterIntake') return 0.1;
  if (key === 'weight') return 0.5;
  if (key === 'calories') return 50;
  return 1;
}

function deriveUnit(key) {
  if (key === 'weight') return 'kg';
  if (key === 'calories') return ' cal';
  if (key === 'sleepQuality') return '/10';
  if (key === 'waterIntake') return 'L';
  if (key === 'stressLevels') return '/10';
  if (key === 'productivity') return '%';
  if (key === 'focusScore') return '%';
  if (key === 'studyHours') return 'h';
  if (key === 'income' || key === 'expenses' || key === 'savings' || key === 'investments' || key === 'diningOut' || key === 'subscriptions') return '₹';
  return '';
}

function buildHealthScenario(health) {
  const calorieDeficit = health.calories - (2200 + health.workoutFrequency * 100);
  const recommendedWorkout = health.workoutFrequency >= 4 ? 'Maintain your current workout frequency.' : 'Add 2 extra low-impact sessions to support your goal.';
  const outcome = calorieDeficit > 300
    ? 'Current intake may be too high for weight loss targets.'
    : 'Calorie intake is in a better range for mild progress.';

  return {
    headline: 'Optimize nutrition and recovery',
    body: `Based on ${health.workoutFrequency} workout sessions per week and ${health.calories} kcal intake, your burn efficiency needs alignment. ${outcome}`,
    actions: [
      `Prefer period-safe movement like walking, stretching, or gentle yoga.`,
      `Improve hydration to ${health.waterIntake < 3 ? '3L' : `${health.waterIntake}L`} for recovery.`,
      recommendedWorkout,
    ],
  };
}

function buildFinanceScenario(finance) {
  const diningRatio = finance.income > 0 ? (finance.diningOut / finance.income) * 100 : 0;
  const savingsTarget = finance.savings / Math.max(1, finance.income) * 100;

  return {
    headline: 'Balance spending to preserve savings',
    body: `You are spending ₹${finance.diningOut.toLocaleString()} per month on dining out, which is ${diningRatio.toFixed(0)}% of your income. Your savings ratio is ${savingsTarget.toFixed(0)}%.`,
    actions: [
      `Reduce dining out to ₹${Math.max(finance.diningOut - 4000, 0).toLocaleString()} to improve savings.`,
      `Review subscriptions and pause non-essential services.`,
      `Consider side income options if expenses remain high.`,
    ],
  };
}

function buildCareerScenario(career) {
  return {
    headline: 'Strengthen study and focus consistency',
    body: `With ${career.studyHours} hours of study and a focus score of ${career.focusScore}%, the AI recommends stabilizing your learning cadence.`,
    actions: [
      `Organize study blocks into 3x 60-minute sessions.`,
      `Use focus breaks to avoid burnout and preserve productivity.`,
      `Track progress with a simple weekly review.`,
    ],
  };
}

function buildCrossDomainScenario(health, finance, career) {
  const correlation = health.stressLevels > 6 && finance.diningOut > 10000
    ? 'High stress levels are linked with increased impulse dining expenses.'
    : 'Cross-domain signals are moderately aligned; maintain current habits.';

  return {
    headline: 'Align behavior across health, finance, and career',
    body: `Your sleep and stress data suggest that emotional pressure may affect spending and focus. ${correlation}`,
    actions: [
      `Start a 15-minute meditation routine to lower stress and improve focus.`,
      `Reduce impulsive dining out when stress spikes.`,
      `Use consistent sleep to support both productivity and financial discipline.`,
    ],
  };
}

export default Simulation;
