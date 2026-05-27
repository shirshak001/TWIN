import { useEffect, useState } from 'react';
import { Heart, Moon, Droplets, Activity, Zap, Brain, X } from 'lucide-react';

// Data: Male Health Metrics
const maleMetrics = [
  { id: 'pulse', label: 'Pulse', value: 72, unit: 'bpm', status: 'Optimal', color: 'red', max: 130, data: [70, 72, 71, 72, 70, 73, 72] },
  { id: 'testosterone', label: 'Testosterone', value: 750, unit: 'ng/dL', status: 'Healthy', color: 'blue', max: 1200, data: [740, 745, 750, 755, 750, 745, 750] },
  { id: 'strength', label: 'Muscle Strength', value: 88, unit: '%', status: 'Strong', color: 'purple', max: 100, data: [82, 84, 86, 87, 88, 88, 88] },
  { id: 'sleep', label: 'Sleep Quality', value: 82, unit: '%', status: 'Good', color: 'indigo', max: 100, data: [75, 78, 80, 82, 82, 82, 82] },
  { id: 'cardio', label: 'Cardiovascular', value: 85, unit: '%', status: 'Excellent', color: 'rose', max: 100, data: [78, 80, 82, 83, 85, 85, 85] },
  { id: 'hydration', label: 'Hydration', value: 75, unit: '%', status: 'Moderate', color: 'cyan', max: 100, data: [70, 72, 73, 74, 75, 75, 75] },
];

// Data: Female (Period) Metrics
const femalePeriodicMetrics = [
  { id: 'cycle', label: 'Cycle Day', value: 14, unit: 'of 28', status: 'Ovulation', color: 'pink', max: 28, data: [1, 7, 14, 21, 28] },
  { id: 'energy', label: 'Energy Level', value: 78, unit: '%', status: 'Elevated', color: 'orange', max: 100, data: [65, 70, 75, 78, 75] },
  { id: 'cramps', label: 'Discomfort', value: 3, unit: '/10', status: 'Minimal', color: 'rose', max: 10, data: [2, 3, 5, 2, 1] },
  { id: 'bloating', label: 'Bloating', value: 4, unit: '/10', status: 'Moderate', color: 'amber', max: 10, data: [1, 2, 4, 3, 1] },
  { id: 'mood', label: 'Mood Score', value: 85, unit: '%', status: 'Stable', color: 'purple', max: 100, data: [80, 82, 85, 83, 88] },
  { id: 'hydration', label: 'Hydration', value: 82, unit: '%', status: 'Optimal', color: 'cyan', max: 100, data: [75, 78, 80, 82, 82] },
];

// Data: Female (Pregnancy) Metrics
const femalePregnancyMetrics = [
  { id: 'weeks', label: 'Weeks', value: 18, unit: 'weeks', status: 'Trimester 2', color: 'blue', max: 40, data: [8, 12, 14, 16, 18] },
  { id: 'weight', label: 'Weight Gain', value: 4.2, unit: 'kg', status: 'Optimal', color: 'emerald', max: 12, data: [0, 1, 2.5, 3.2, 4.2] },
  { id: 'fetal', label: 'Fetal Heart', value: 145, unit: 'bpm', status: 'Healthy', color: 'rose', max: 180, data: [120, 135, 142, 144, 145] },
  { id: 'bp', label: 'Blood Pressure', value: 118, unit: '/ 75', status: 'Normal', color: 'indigo', max: 140, data: [115, 116, 118, 118, 118] },
  { id: 'glucose', label: 'Glucose', value: 95, unit: 'mg/dL', status: 'Stable', color: 'orange', max: 120, data: [92, 94, 95, 95, 95] },
  { id: 'hydration', label: 'Hydration', value: 85, unit: '%', status: 'Excellent', color: 'cyan', max: 100, data: [78, 80, 82, 85, 85] },
];

// Simple Bar Chart Component
const SimpleChart = ({ data, color = 'purple' }) => {
  const fallbackData = [18, 34, 48, 62, 53];
  const validData = Array.isArray(data) && data.length > 0 ? data : fallbackData;
  const max = Math.max(...validData);
  const colorMap = {
    red: '#ef4444', blue: '#3b82f6', purple: '#a855f7', indigo: '#6366f1',
    rose: '#f43f5e', cyan: '#06b6d4', pink: '#ec4899', orange: '#f97316',
    amber: '#f59e0b', emerald: '#10b981'
  };
  
  return (
    <div className="flex items-end gap-1 h-16 w-full">
      {validData.map((value, idx) => (
        <div key={idx} className="flex-1 flex flex-col items-center">
          <div
            className="w-full rounded-t transition-all duration-300 hover:opacity-80"
            style={{
              height: `${(value / max) * 100}%`,
              backgroundColor: colorMap[color] || colorMap.purple,
              minHeight: '4px'
            }}
          />
          <span className="text-xs text-(--muted) mt-1">{idx + 1}</span>
        </div>
      ))}
    </div>
  );
};

function DailyHealthUpdate() {
  const [lastUpdate, setLastUpdate] = useState(() => {
    const stored = localStorage.getItem('healthLastUpdate');
    return stored ? new Date(stored) : null;
  });
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const next = lastUpdate ? new Date(lastUpdate.getTime() + 24 * 60 * 60 * 1000) : null;
      if (!next || now >= next) {
        setTimeLeft('Ready for your next check-in.');
        return;
      }

      const diff = next - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m until next update`);
    };

    calculate();
    const timer = setInterval(calculate, 60 * 1000);
    return () => clearInterval(timer);
  }, [lastUpdate]);

  const handleUpdate = () => {
    const now = new Date();
    localStorage.setItem('healthLastUpdate', now.toISOString());
    setLastUpdate(now);
    setTimeLeft('Your daily update is recorded. Next update available in 24 hours.');
  };

  const nextUpdate = lastUpdate ? new Date(lastUpdate.getTime() + 24 * 60 * 60 * 1000) : null;
  const canUpdate = !nextUpdate || new Date() >= nextUpdate;

  return (
    <section className="mb-6 rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-(--muted)">Daily check-in</p>
          <h2 className="text-xl font-semibold text-(--text)">Health update</h2>
          <p className="mt-1 text-sm text-(--muted)">Complete your summary once every 24 hours to keep your dashboard aligned.</p>
        </div>
        <div className="space-y-2 text-right sm:text-left">
          <p className="text-sm font-semibold text-(--text)">{timeLeft}</p>
          <button
            type="button"
            disabled={!canUpdate}
            onClick={handleUpdate}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              canUpdate
                ? 'bg-(--accent) text-[#0b1020] hover:brightness-110'
                : 'cursor-not-allowed bg-[rgba(255,255,255,0.08)] text-(--muted)'
            }`}
          >
            {canUpdate ? 'Start today’s update' : 'Update unavailable'}
          </button>
        </div>
      </div>
    </section>
  );
}

function HealthSummaryCard({ icon: Icon, title, value, detail, accent }) {
  const accentMap = {
    blue: {
      icon: 'text-sky-400',
      ring: 'bg-[rgba(56,189,248,0.12)] text-sky-300',
      label: 'bg-sky-500/10 text-sky-200',
    },
    red: {
      icon: 'text-rose-400',
      ring: 'bg-[rgba(248,113,113,0.12)] text-rose-300',
      label: 'bg-rose-500/10 text-rose-200',
    },
    cyan: {
      icon: 'text-cyan-400',
      ring: 'bg-[rgba(56,189,248,0.12)] text-cyan-300',
      label: 'bg-cyan-500/10 text-cyan-200',
    },
    emerald: {
      icon: 'text-emerald-400',
      ring: 'bg-[rgba(52,211,153,0.12)] text-emerald-300',
      label: 'bg-emerald-500/10 text-emerald-200',
    },
    purple: {
      icon: 'text-violet-400',
      ring: 'bg-[rgba(192,132,252,0.12)] text-violet-300',
      label: 'bg-violet-500/10 text-violet-200',
    },
  };

  const style = accentMap[accent] || accentMap.purple;

  return (
    <div className="group rounded-[2rem] border border-white/10 bg-[rgba(15,23,42,0.8)] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(192,132,252,0.25)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-(--muted)">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-(--text)">{value}</p>
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-3xl ${style.ring}`}> 
          <Icon className={`h-6 w-6 ${style.icon}`} />
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <p className="text-sm font-medium text-(--muted)">{detail}</p>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${style.label}`}>Live</span>
      </div>
    </div>
  );
}

function getMetricMax(metric) {
  if (typeof metric.max === 'number') return metric.max;
  if (metric.unit.includes('of')) {
    const parts = metric.unit.split('of').map(part => part.trim());
    return Number(parts[1]) || 100;
  }
  if (metric.unit.includes('/10')) return 10;
  if (metric.unit.includes('%')) return 100;
  if (metric.unit.includes('weeks')) return 40;
  if (metric.unit.includes('kg')) return 12;
  if (metric.unit.includes('bpm')) return 180;
  if (metric.unit.includes('mg/dL')) return 120;
  return Math.max(...(metric.data || []), metric.value, 100);
}

function getMetricScore(metric) {
  const value = Number(metric.value) || 0;
  const max = getMetricMax(metric);
  const ratio = max > 0 ? value / max : 0;
  return Math.min(100, Math.max(5, Math.round(ratio * 100)));
}

function CircularMetricCard({ metric }) {
  const score = getMetricScore(metric);
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getColorValue(metric.color, 600);

  return (
    <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-5 shadow-sm transition-all duration-300 hover:-translate-y-1">
      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr] items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-(--muted)">{metric.label}</p>
          <p className="text-3xl font-semibold text-(--text) mt-2">{metric.value}<span className="text-sm text-(--muted) ml-1">{metric.unit}</span></p>
          <p className="mt-3 text-sm text-(--muted)">{metric.status}</p>
        </div>
        <div className="relative mx-auto h-24 w-24">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <span className="text-base font-semibold text-(--text)">{score}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildTrendPath(values, width, height) {
  if (!values?.length) return '';
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max === min ? 1 : max - min;

  return values
    .map((value, index) => {
      const x = Math.round((index / Math.max(values.length - 1, 1)) * width);
      const y = Math.round(height - ((value - min) / range) * height);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}

function Health() {
  const [gender, setGender] = useState('female'); // 'male' or 'female'
  const [femaleMode, setFemaleMode] = useState('period'); // 'period' or 'pregnancy'
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics', 'trends', 'ai'

  // Select appropriate metrics based on gender and mode
  const currentMetrics = 
    gender === 'male' ? maleMetrics : 
    femaleMode === 'period' ? femalePeriodicMetrics : 
    femalePregnancyMetrics;

  // AI Suggestions
  const aiSuggestions = [
    { icon: Brain, title: 'Hydration Alert', text: 'Increase water intake by 600ml daily. Current level suboptimal for recovery.', color: 'cyan' },
    { icon: Activity, title: 'Exercise Recommendation', text: gender === 'male' ? 'Strength training 3x weekly optimal for testosterone maintenance.' : 'Low-impact yoga improves flexibility without stress.', color: 'emerald' },
    { icon: Moon, title: 'Sleep Optimization', text: 'Maintain 10 PM bedtime. Your REM cycles peak at 2-4 AM window.', color: 'indigo' },
    { icon: Zap, title: 'Energy Management', text: gender === 'male' ? 'Peak workout window: 2-4 PM (natural cortisol peak)' : femaleMode === 'period' ? 'Conserve energy today (peak menstrual phase)' : 'Ideal time for prenatal exercises: 10-11 AM', color: 'amber' },
  ];

  // Metric Card Component
  const MetricCard = ({ metric }) => (
    <button
      onClick={() => setSelectedMetric(metric)}
      className="rounded-xl border-2 p-4 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-left h-full flex flex-col justify-between group border-(--border) bg-(--surface-soft)"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-(--muted) mb-2">{metric.label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-(--text)">{metric.value}</span>
          <span className="text-xs text-(--muted)">{metric.unit}</span>
        </div>
        <p className="text-xs text-(--muted) mt-1">{metric.status}</p>
      </div>
      <div className="mt-3 group-hover:opacity-100 transition-opacity">
        <SimpleChart data={metric.data} color={metric.color} />
      </div>
    </button>
  );

  // AI Card Component
  const AICard = ({ suggestion }) => (
    <div className="rounded-xl border border-(--border) bg-(--surface-soft) p-4 shadow-md hover:shadow-lg transition-all duration-300 flex gap-3 hover:scale-105">
      <div className="shrink-0">
        <suggestion.icon className="h-5 w-5" style={{ color: getColorValue(suggestion.color, 600) }} />
      </div>
      <div>
        <p className="text-sm font-bold text-(--text)">{suggestion.title}</p>
        <p className="text-xs text-(--muted) mt-0.5">{suggestion.text}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-(--secondary-bg) px-4 py-6 sm:px-8 overflow-hidden text-(--text)">
      {/* Header with Gender & Mode Selector */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-(--text)">Health Intelligence</h1>
          <p className="text-sm text-(--muted) mt-1">Real-time biometric analysis & AI recommendations</p>
        </div>

        {/* Gender Selector */}
        <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] backdrop-blur border border-(--border) rounded-full p-1">
          <button
            onClick={() => setGender('male')}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
              gender === 'male'
                ? 'bg-(--secondary) text-[#0b1020] shadow-lg shadow-[rgba(124,255,178,0.18)]'
                : 'text-(--muted) hover:text-(--text)'
            }`}
          >
            Male
          </button>
          <button
            onClick={() => setGender('female')}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
              gender === 'female'
                ? 'bg-(--accent) text-[#0b1020] shadow-lg shadow-[rgba(192,132,252,0.18)]'
                : 'text-(--muted) hover:text-(--text)'
            }`}
          >
            Female
          </button>
        </div>
      </div>

      {/* Female Mode Selector - Only shown when Female selected */}
      {gender === 'female' && (
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFemaleMode('period')}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
              femaleMode === 'period'
                ? 'bg-[rgba(236,72,153,0.18)] text-(--text) shadow-lg shadow-[rgba(236,72,153,0.18)]'
                : 'bg-[rgba(255,255,255,0.06)] text-(--muted) border border-(--border) hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            Period Mode
          </button>
          <button
            onClick={() => setFemaleMode('pregnancy')}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
              femaleMode === 'pregnancy'
                ? 'bg-[rgba(56,189,248,0.18)] text-(--text) shadow-lg shadow-[rgba(56,189,248,0.18)]'
                : 'bg-[rgba(255,255,255,0.06)] text-(--muted) border border-(--border) hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            Pregnancy Mode
          </button>
        </div>
      )}

      {/* Health Summary Quick View */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <HealthSummaryCard icon={Moon} title="Sleep Duration" value="7.1 hr" detail="Recovery good" accent="blue" />
        <HealthSummaryCard icon={Heart} title="Pulse" value="72 bpm" detail="Normal range" accent="red" />
        <HealthSummaryCard icon={Droplets} title="Hydration" value="2.8 L" detail="Target met" accent="cyan" />
        <HealthSummaryCard icon={Activity} title="Steps" value="9,400" detail="Active day" accent="emerald" />
        <HealthSummaryCard icon={Zap} title="Stress" value="24%" detail="Low tension" accent="purple" />
      </div>

      <DailyHealthUpdate />

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {['metrics', 'trends', 'ai'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              activeTab === tab
                ? 'bg-(--accent) text-[#0b1020] shadow-lg shadow-[rgba(192,132,252,0.18)]'
                : 'bg-[rgba(255,255,255,0.06)] text-(--muted) border border-(--border) hover:bg-[rgba(255,255,255,0.12)]'
            }`}
          >
            {tab === 'metrics' ? 'Metrics' : tab === 'trends' ? 'Trends' : 'AI Tips'}
          </button>
        ))}
      </div>

      {/* Main Content Area - Fits on one page max height */}
      <div className="max-h-[calc(100vh-320px)] overflow-y-auto">
        {/* Metrics Grid */}
        {activeTab === 'metrics' && (
          <div className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 xl:grid-cols-3">
            {currentMetrics.map(metric => (
              <CircularMetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        )}

        {/* Trends View */}
        {activeTab === 'trends' && (
          <div className="space-y-4 pb-4">
            <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
              <div className="rounded-xl border border-(--border) bg-(--surface) p-4 shadow-lg">
                <h3 className="text-lg font-bold text-(--text) mb-4">7-Day Trends Overview</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {currentMetrics.slice(0, 4).map(metric => (
                    <div key={metric.id} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-(--muted)">{metric.label}</p>
                          <p className="text-xl font-semibold text-(--text) mt-1">{metric.value}{metric.unit}</p>
                        </div>
                        <div className="h-16 w-16">
                          <svg viewBox="0 0 100 100" className="h-full w-full">
                            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                            <circle
                              cx="50"
                              cy="50"
                              r="28"
                              fill="none"
                              stroke={getColorValue(metric.color, 600)}
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={2 * Math.PI * 28}
                              strokeDashoffset={2 * Math.PI * 28 - (getMetricScore(metric) / 100) * 2 * Math.PI * 28}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-(--muted)">{metric.status}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-(--border) bg-(--surface) p-4 shadow-lg">
                <h3 className="text-lg font-bold text-(--text) mb-4">Trend Line</h3>
                <div className="relative h-64 overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] p-4">
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 240" preserveAspectRatio="none">
                    <line x1="0" y1="200" x2="760" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    <line x1="0" y1="160" x2="760" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <line x1="0" y1="120" x2="760" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <line x1="0" y1="80" x2="760" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <path
                      d={buildTrendPath(currentMetrics[0]?.data || [50, 70, 65, 78, 74, 82, 80], 760, 180)}
                      fill="none"
                      stroke="rgba(56,189,248,0.85)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={buildTrendPath(currentMetrics[0]?.data || [50, 70, 65, 78, 74, 82, 80], 760, 180)}
                      fill="none"
                      stroke="rgba(56,189,248,0.22)"
                      strokeWidth="20"
                    />
                  </svg>
                  <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--muted)">
                    <span>Day 1</span>
                    <span>Day 3</span>
                    <span>Day 5</span>
                    <span>Day 7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Tips View */}
        {activeTab === 'ai' && (
          <div className="space-y-3 pb-4">
            {aiSuggestions.map((suggestion, idx) => (
              <AICard key={idx} suggestion={suggestion} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <div className="rounded-lg bg-(--surface-soft) border border-(--border) p-3 text-center shadow-md">
          <p className="text-xs text-(--muted)">Overall Health</p>
          <p className="text-2xl font-bold text-(--primary)">82%</p>
        </div>
        <div className="rounded-lg bg-(--surface-soft) border border-(--border) p-3 text-center shadow-md">
          <p className="text-xs text-(--muted)">Risk Level</p>
          <p className="text-2xl font-bold text-(--secondary)">Low</p>
        </div>
        <div className="rounded-lg bg-(--surface-soft) border border-(--border) p-3 text-center shadow-md">
          <p className="text-xs text-(--muted)">Recommendations</p>
          <p className="text-2xl font-bold text-(--accent)">4</p>
        </div>
        <div className="rounded-lg bg-(--surface-soft) border border-(--border) p-3 text-center shadow-md">
          <p className="text-xs text-(--muted)">Action Items</p>
          <p className="text-2xl font-bold text-(--warning)">2</p>
        </div>
      </div>

      {/* Smoking Reduction & Recovery Trajectory */}
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-(--border) bg-(--surface) p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-(--text)">Smoking Reduction Plan</h2>
              <p className="text-sm text-(--muted)">Tracking frequency, recovery, and motivational streaks.</p>
            </div>
            <span className="rounded-full bg-[rgba(245,158,11,0.12)] px-3 py-1 text-xs font-semibold text-(--warning)">Reduce by 15%</span>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl bg-(--surface-soft) p-4 border border-(--border)">
              <p className="text-sm font-semibold text-(--text)">Today</p>
              <p className="text-3xl font-bold text-(--warning)">2 cigarettes</p>
            </div>
            <div className="rounded-xl bg-(--surface-soft) p-4 border border-(--border)">
              <p className="text-sm font-semibold text-(--text)">Weekly Reduction</p>
              <p className="text-lg font-bold text-(--text)">-18% compared to last week</p>
            </div>
            <div className="rounded-xl bg-(--surface-soft) p-4 border border-(--border)">
              <p className="text-sm font-semibold text-(--text)">Recovery streak</p>
              <p className="text-lg font-bold text-(--primary)">5 days</p>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-(--border) bg-(--surface) p-6 shadow-md">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-(--text)">Future Recovery Trajectory</h2>
            <p className="text-sm text-(--muted)">Projected recovery based on current health behaviors.</p>
          </div>
          <div className="relative h-64 overflow-hidden rounded-xl border border-(--border) bg-[rgba(255,255,255,0.04)] p-4">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 780 240" preserveAspectRatio="none">
              <line x1="0" y1="200" x2="780" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              <path d="M0 180 C180 150 320 140 450 130 C560 122 660 102 780 90" fill="none" stroke="rgba(56,189,248,0.8)" strokeWidth="4" />
              <path d="M0 180 C180 165 320 158 450 148 C560 136 660 120 780 110" fill="none" stroke="rgba(16,185,129,0.8)" strokeWidth="4" strokeDasharray="8 8" />
            </svg>
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--muted)">
              <span>Today</span>
              <span>1 mo</span>
              <span>3 mo</span>
              <span>6 mo</span>
            </div>
          </div>
        </article>
      </div>

      {/* Detailed View Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4 z-50">
          <div className="bg-(--secondary-bg) rounded-2xl shadow-2xl border border-(--border) max-w-md w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-(--border) bg-(--surface)">
              <h2 className="text-xl font-bold text-(--text)">{selectedMetric.label} Details</h2>
              <button
                onClick={() => setSelectedMetric(null)}
                className="text-(--muted) hover:text-(--text) transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Current Value */}
              <div>
                <p className="text-sm text-(--muted) mb-2">Current Value</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-(--text)">{selectedMetric.value}</span>
                  <span className="text-lg text-(--muted)">{selectedMetric.unit}</span>
                </div>
                <p className="text-sm mt-2 px-3 py-1 bg-[rgba(124,255,178,0.14)] text-(--primary) rounded-full inline-block">✓ {selectedMetric.status}</p>
              </div>

              {/* 7-Day Trend */}
              <div>
                <p className="text-sm font-semibold text-(--text) mb-3">7-Day Trend</p>
                <div className="h-20">
                  <SimpleChart data={selectedMetric.data} color={selectedMetric.color} />
                </div>
              </div>

              {/* Analysis */}
              <div>
                <p className="text-sm font-semibold text-(--text) mb-2">Analysis</p>
                <p className="text-sm text-(--muted) leading-relaxed">
                  Your {selectedMetric.label.toLowerCase()} is performing well. {selectedMetric.status === 'Optimal' || selectedMetric.status === 'Excellent' ? 'Continue current habits.' : 'Minor adjustments recommended.'}
                </p>
              </div>

              <button
                onClick={() => setSelectedMetric(null)}
                className="w-full bg-(--accent) hover:bg-[rgba(192,132,252,0.9)] text-[#0b1020] font-semibold py-2 rounded-lg transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get Tailwind color values
function getColorValue(colorName, shade) {
  const colors = {
    red: { 50: '#fef2f2', 100: '#fee2e2', 300: '#f87171', 600: '#dc2626' },
    blue: { 50: '#eff6ff', 100: '#dbeafe', 300: '#93c5fd', 600: '#2563eb' },
    purple: { 50: '#faf5ff', 100: '#f3e8ff', 300: '#d8b4fe', 600: '#9333ea' },
    indigo: { 50: '#f0f4ff', 100: '#e0e7ff', 300: '#a5b4fc', 600: '#4f46e5' },
    rose: { 50: '#fff1f5', 100: '#ffe4e6', 300: '#f472b6', 600: '#e11d48' },
    cyan: { 50: '#ecf7ff', 100: '#cffafe', 300: '#06b6d4', 600: '#0891b2' },
    pink: { 50: '#fdf2f8', 100: '#fce7f3', 300: '#f472b6', 600: '#db2777' },
    orange: { 50: '#fff7ed', 100: '#ffedd5', 300: '#fed7aa', 600: '#ea580c' },
    amber: { 50: '#fffbeb', 100: '#fef3c7', 300: '#fcd34d', 600: '#d97706' },
    emerald: { 50: '#f0fdf4', 100: '#dcfce7', 300: '#6ee7b7', 600: '#059669' }
  };
  return colors[colorName]?.[shade] || '#f3f4f6';
}

export default Health;
