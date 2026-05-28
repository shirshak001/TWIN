import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowRight, Droplets, HeartPulse, Activity, Sparkles, Clock3, Zap } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const initialFormState = {
  mood: 'neutral',
  energy: 6,
  stress: 4,
  productivity: 6,
  symptoms: '',
  waterIntake: 2.2,
  sleepQuality: 6,
  focusLevel: 6,
  spendingHabits: 'balanced',
  workoutCompletion: 'partial',
};

const moodOptions = [
  { value: 'low', label: 'Low' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'high', label: 'High' },
];

const spendingOptions = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'heavy', label: 'High' },
];

const workoutOptions = [
  { value: 'none', label: 'None' },
  { value: 'partial', label: 'Partial' },
  { value: 'complete', label: 'Complete' },
];

function DailyUpdates() {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('dailyUpdatesLatest');
    if (stored) {
      setLastUpdate(JSON.parse(stored));
    }
  }, []);

  const notify = (message) => toast.success(message, { style: { borderRadius: '10px', background: '#111827', color: '#fff' } });
  const reportError = (message) => toast.error(message, { style: { borderRadius: '10px', background: '#111827', color: '#fff' } });

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const createAnalysis = (values) => {
    const suggestions = [];
    if (values.energy < 5 || values.sleepQuality < 5) {
      suggestions.push('Prioritize sleep and hydration before increasing workout intensity.');
    }
    if (values.stress > 6) {
      suggestions.push('A short breathing break or 10-minute walk will help reduce stress and improve clarity.');
    }
    if (values.productivity < 6) {
      suggestions.push('Split tasks into 30-minute focus blocks and review your most important goal.');
    }
    if (values.spendingHabits === 'heavy') {
      suggestions.push('Track one discretionary expense today and compare it with your savings target.');
    }
    if (values.workoutCompletion === 'none') {
      suggestions.push('Try a light movement session: walking, stretching, or gentle yoga.');
    }
    if (values.waterIntake < 2.5) {
      suggestions.push('Increase water intake by 300-500ml to support recovery and mental clarity.');
    }
    return suggestions.length ? suggestions : ['Your daily update looks balanced. Keep the current rhythm and stay consistent.'];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('authToken');
    if (!token) {
      reportError('Please sign in again to save your update.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/onboarding/daily-updates`,
        { dailyUpdate: form },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const payload = {
        ...form,
        timestamp: new Date().toISOString(),
        summary: response.data.message || 'Daily update saved',
      };
      setLastUpdate(payload);
      localStorage.setItem('dailyUpdatesLatest', JSON.stringify(payload));
      setAnalysis(createAnalysis(form));
      notify('Daily update saved and synced with your AI engine.');
    } catch (error) {
      reportError(error.response?.data?.message || 'Failed to save daily update.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--secondary-bg) px-4 py-6 sm:px-8 text-(--text)">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[2rem] border border-(--border) bg-(--surface) p-8 shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-(--muted)">Daily updates</p>
              <h1 className="text-4xl font-semibold text-(--text)">Feed your AI life system with today’s state.</h1>
              <p className="max-w-2xl text-sm leading-7 text-(--muted)">
                Share your mood, energy, sleep, spending, and workout completion to improve cross-domain recommendations across health, finance, and career.
              </p>
            </div>
            <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4 text-sm text-(--text)">
              <p className="font-semibold">Latest sync</p>
              <p className="mt-2 text-sm text-(--muted)">{lastUpdate ? new Date(lastUpdate.timestamp).toLocaleString() : 'No update submitted yet'}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Mood" value={form.mood} options={moodOptions} onChange={(value) => handleChange('mood', value)} />
              <RangeField
                label="Energy"
                value={form.energy}
                min={1}
                max={10}
                onChange={(value) => handleChange('energy', value)}
                unit="/10"
              />
              <RangeField
                label="Stress"
                value={form.stress}
                min={1}
                max={10}
                onChange={(value) => handleChange('stress', value)}
                unit="/10"
              />
              <RangeField
                label="Productivity"
                value={form.productivity}
                min={1}
                max={10}
                onChange={(value) => handleChange('productivity', value)}
                unit="/10"
              />
              <RangeField
                label="Water intake"
                value={form.waterIntake}
                min={0}
                max={5}
                step={0.1}
                onChange={(value) => handleChange('waterIntake', value)}
                unit="L"
              />
              <RangeField
                label="Sleep quality"
                value={form.sleepQuality}
                min={1}
                max={10}
                onChange={(value) => handleChange('sleepQuality', value)}
                unit="/10"
              />
              <RangeField
                label="Focus level"
                value={form.focusLevel}
                min={1}
                max={10}
                onChange={(value) => handleChange('focusLevel', value)}
                unit="/10"
              />
              <SelectField
                label="Spending habits"
                value={form.spendingHabits}
                options={spendingOptions}
                onChange={(value) => handleChange('spendingHabits', value)}
              />
              <SelectField
                label="Workout completion"
                value={form.workoutCompletion}
                options={workoutOptions}
                onChange={(value) => handleChange('workoutCompletion', value)}
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-semibold text-(--text)">Symptoms or notes</label>
              <textarea
                rows={4}
                value={form.symptoms}
                onChange={(event) => handleChange('symptoms', event.target.value)}
                className="w-full rounded-3xl border border-(--border) bg-(--surface-soft) p-4 text-sm text-(--text) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-[rgba(124,255,178,0.18)]"
                placeholder="Headache, fatigue, cravings, mental state, or anything else to note"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-3xl bg-(--primary) px-6 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-[rgba(124,255,178,0.95)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Saving update...' : 'Submit daily update'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">Insights</p>
                  <h2 className="mt-2 text-2xl font-semibold text-(--text)">Adaptive signals</h2>
                </div>
                <Sparkles className="h-5 w-5 text-(--primary)" />
              </div>
              <div className="space-y-4">
                <SummaryItem icon={HeartPulse} title="Hydration" value={`${form.waterIntake.toFixed(1)} L`} />
                <SummaryItem icon={Droplets} title="Sleep" value={`${form.sleepQuality}/10`} />
                <SummaryItem icon={Zap} title="Stress" value={`${form.stress}/10`} />
                <SummaryItem icon={Activity} title="Workout" value={workoutOptions.find((item) => item.value === form.workoutCompletion)?.label} />
              </div>
            </div>

            <div className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">Quick advice</p>
                  <h2 className="mt-2 text-2xl font-semibold text-(--text)">What this means</h2>
                </div>
                <Clock3 className="h-5 w-5 text-(--secondary)" />
              </div>
              <div className="space-y-3">
                {(analysis || createAnalysis(form)).slice(0, 4).map((item, index) => (
                  <div key={index} className="rounded-3xl border border-(--border) bg-[rgba(255,255,255,0.04)] p-4 text-sm text-(--muted)">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, options, onChange }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-(--text)">{label}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${
              value === option.value
                ? 'border-(--primary) bg-[rgba(124,255,178,0.16)] text-(--text)'
                : 'border-(--border) bg-[rgba(255,255,255,0.05)] text-(--muted) hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function RangeField({ label, value, min, max, step = 1, unit, onChange }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-(--text)">{label}</p>
        <span className="text-sm text-(--muted)">{value}{unit}</span>
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

function SelectField({ label, value, options, onChange }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-(--text)">{label}</p>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-3xl border border-(--border) bg-(--surface-soft) px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-[rgba(124,255,178,0.18)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-(--surface)">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryItem({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-(--border) bg-[rgba(255,255,255,0.04)] p-4">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[rgba(124,255,178,0.12)] text-(--primary)">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-(--text)">{title}</p>
        <p className="text-sm text-(--muted)">{value}</p>
      </div>
    </div>
  );
}

export default DailyUpdates;
