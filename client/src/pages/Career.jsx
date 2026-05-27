import React from 'react';
import {
  Shield,
  Scale,
  Activity,
  Route,
  Check,
  Play,
  Lock,
  AlertTriangle,
  Moon,
  Sun,
  Zap,
  Lightbulb,
} from 'lucide-react';

const glassCardClass = 'rounded-[1.75rem] border border-(--border) bg-[rgba(15,23,42,0.8)] shadow-[0_18px_55px_rgba(0,0,0,0.18)] transition-all duration-300 hover:shadow-[0_24px_68px_rgba(0,0,0,0.2)] hover:-translate-y-0.5';

const careerMetrics = [
  { label: 'Career Stability', value: 88, status: 'Resilient', icon: Shield, tone: 'primary' },
  { label: 'Productivity Balance', value: 76, status: 'Balanced', icon: Scale, tone: 'neutral' },
  { label: 'Burnout Risk', value: 24, status: 'Low', icon: Activity, tone: 'primary' },
  { label: 'Roadmap Progress', value: 42, status: 'Phase 2', icon: Route, tone: 'warm' },
];

const roadmapSteps = [
  { label: 'Month 1', detail: 'HTML/CSS', status: 'Completed', icon: Check, state: 'done' },
  { label: 'Month 2', detail: 'JavaScript', status: 'In Progress', icon: Play, state: 'active' },
  { label: 'Month 3', detail: 'React & Next.js', status: 'Upcoming', icon: Lock, state: 'locked' },
];

function Career() {
  return (
    <div className="min-h-full bg-(--secondary-bg) px-5 py-6 text-(--text) sm:px-6 lg:px-8">
      {/* 1. Dashboard Header */}
      <header className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-(--text)">Career Intelligence</h1>
        <p className="mt-2 text-sm text-gray-700">
          Monitoring structural risk vectors, milestone velocity, and cross-disciplinary trajectory.
        </p>
      </header>

      {/* 2. Target Metrics Row */}
      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {careerMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      {/* 3. Mid-Section: Roadmap, Warnings, and Cross-Domain Cards */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12 mb-6">
        
        {/* Left Sub-Column (Roadmap + Burnout) */}
        <div className="space-y-6 xl:col-span-8 flex flex-col justify-between">
          {/* AI Learning Roadmap */}
          <article className={`${glassCardClass} p-6 flex-1`}>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">AI Learning Roadmap</h2>
                <p className="text-sm text-(--muted) mt-2 max-w-xl">A clean progression of your AI skill milestones, showing completed, active, and upcoming learning phases.</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-[rgba(66,153,225,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Phase 2 in progress</span>
            </div>
            <div className="flex items-center gap-4 overflow-x-auto pb-1">
              {roadmapSteps.map((step, index) => (
                <React.Fragment key={step.label}>
                  <RoadmapStep step={step} />
                  {index < roadmapSteps.length - 1 && (
                    <div className="hidden h-1 flex-1 items-center bg-gradient-to-r from-[rgba(255,255,255,0.08)] via-[rgba(65,111,130,0.65)] to-[rgba(255,255,255,0.08)] md:flex" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </article>

          {/* Burnout Warning */}
          <article className="rounded-lg border border-l-4 border-l-orange-600 border-orange-300 bg-[rgba(251,146,60,0.1)] p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-orange-700">Burnout Warning</h2>
                <p className="mt-1 text-sm text-gray-700">Detected anomalous high intensity cycle</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-orange-600 shrink-0" />
            </div>
            <div className="mb-5 rounded-lg border-2 border-orange-300 bg-orange-100/50 p-4">
              <p className="text-sm italic leading-6 text-orange-800">
                Late-night coding detected for 4 consecutive days. Your cognitive recovery capacity is down 14%.
              </p>
            </div>
            <ProgressBar label="Fatigue Accumulation" value="68%" width="68%" color="#8b4e3f" />
          </article>
        </div>

        {/* Right Sub-Column: Dedicated AI Observation, Suggestion, and Cross-Domain Cards */}
        <aside className="space-y-4 xl:col-span-4 flex flex-col justify-between">
          <ObservationCard 
            icon={Moon} 
            title="AI Observation" 
            detail="Sleep consistency is directly improving coding block speed and structural logic accuracy." 
          />
          <ObservationCard 
            icon={Lightbulb} 
            title="AI Suggestion" 
            detail="Shift focus to raw project architecture over certificates to secure market velocity." 
          />
          
          {/* Enhanced Cross-Domain Impact Analysis Card */}
          <article className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.08)] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.14)] border-l-4 border-l-[#416f82]">
            <div className="flex items-center gap-2 text-[#416f82] mb-2">
              <Zap className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-[0.14em]">Cross-Domain Analysis</h3>
            </div>
            <p className="text-sm font-semibold text-[#1b1c1c] mb-2">Systemic Ripple Effect Detected</p>
            <p className="text-xs leading-relaxed text-[#596467]">
              Pushing <span className="font-semibold text-[#8b4e3f]">12-hour study blocks</span> forces a high career roadmap velocity, but risks a critical drop in <span className="font-semibold text-amber-700">Health capacity</span> (Sleep debt/Cognitive strain) and drops long-term <span className="font-semibold text-emerald-700">Finance performance</span> due to immediate medical or recovery overhead risks.
            </p>
          </article>
        </aside>
      </section>

      {/* 4. Full-Width Macro Future Trajectory at the very bottom */}
      <section className="w-full">
        <article className={`${glassCardClass} p-6`}>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Future Trajectory Model</h2>
              <p className="text-sm text-(--muted) mt-2 max-w-2xl">Predictive milestones showing where balanced growth diverges from fatigue risk across the next months.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-[rgba(79,70,229,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">Actionable Projection</span>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 820 280">
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#4299e1" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <line x1="40" x2="40" y1="20" y2="240" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="40" x2="780" y1="240" y2="240" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              {[1, 2, 3, 4].map((row) => (
                <line key={row} x1="40" x2="780" y1={240 - row * 44} y2={240 - row * 44} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              <path d="M40 220 C180 180 320 150 470 120 C580 105 680 90 780 70" fill="none" stroke="url(#lineGradient)" strokeWidth="5" strokeLinecap="round" />
              <path d="M40 220 C180 205 320 190 470 180 C580 172 680 165 780 160" fill="none" stroke="#f6ad55" strokeWidth="4" strokeDasharray="12 10" strokeLinecap="round" />
              {[40, 180, 320, 470, 580, 680, 780].map((x, index) => (
                <circle key={x} cx={x} cy={220 - [0, 15, 32, 55, 70, 80, 90][index]} r="4" fill="#4fd1c5" />
              ))}
            </svg>
            <div className="absolute left-6 top-6 flex flex-col gap-3 text-[11px] uppercase tracking-[0.18em] text-(--muted)">
              <div className="inline-flex items-center gap-2">
                <span className="h-1.5 w-6 rounded-full bg-[#4fd1c5]" /> Balanced Growth Path
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="h-1.5 w-6 rounded-full bg-[#f6ad55]" /> Fatigue/Burnout Trajectory
              </div>
            </div>
            <div className="absolute bottom-6 left-0 right-0 px-6">
              <div className="grid grid-cols-4 gap-2 text-[11px] uppercase tracking-[0.18em] text-(--muted)">
                {['Month 1','Month 2','Month 3','Month 4'].map((label) => (
                  <span key={label} className="text-center">{label}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <ProgressBar label="Sustainable Career Outlook" value="+34%" width="85%" color="#4fd1c5" />
          </div>
        </article>
      </section>
    </div>
  );
}

{/* --- Pure Layout & Structural Sub-Components --- */}

function MetricCard({ metric }) {
  const Icon = metric.icon;
  const tone = metric.tone === 'warm' ? '#8b4e3f' : metric.tone === 'neutral' ? '#5e5e5b' : '#416f82';

  return (
    <article className={`${glassCardClass} p-5 flex flex-col items-center justify-center`}>
      <div className="relative mb-3 h-14 w-14 flex items-center justify-center">
        <ProgressRing value={metric.value} color={tone} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="h-5 w-5" style={{ color: tone }} />
        </div>
      </div>
      <p className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#596467]">{metric.label}</p>
      <p className="text-sm font-semibold" style={{ color: tone }}>{metric.status}</p>
    </article>
  );
}

function RoadmapStep({ step }) {
  const Icon = step.icon;
  const isLocked = step.state === 'locked';
  const isActive = step.state === 'active';

  return (
    <div className={`min-w-[170px] rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5 text-center shadow-[0_20px_55px_rgba(0,0,0,0.12)] transition-all duration-300 ${isActive ? 'scale-[1.01] border-cyan-400/40 bg-[rgba(79,206,196,0.08)]' : ''} ${isLocked ? 'opacity-60' : ''}`}>
      <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 ${isLocked ? 'border-slate-600 bg-slate-700 text-slate-400' : isActive ? 'border-cyan-300 bg-cyan-500/10 text-cyan-200' : 'border-white/10 bg-[rgba(255,255,255,0.08)] text-white'}`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm font-semibold text-(--text)">{step.label}</p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-(--muted)">{step.detail}</p>
      <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${isLocked ? 'bg-white/5 text-(--muted)' : isActive ? 'bg-cyan-500/15 text-cyan-200' : 'bg-[rgba(255,255,255,0.05)] text-white/80'}`}>
        {step.status}
      </span>
    </div>
  );
}

function ProgressRing({ value, color }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg className="h-full w-full -rotate-90" viewBox="0 0 64 64">
      <circle cx="32" cy="32" fill="none" r={radius} stroke="#e4e2e1" strokeWidth="4" />
      <circle cx="32" cy="32" fill="none" r={radius} stroke={color} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

function ProgressBar({ label, value, width, color }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-(--muted)">
        <span>{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#e4e2e1]">
        <div className="h-full rounded-full transition-all duration-500" style={{ width, backgroundColor: color }} />
      </div>
    </div>
  );
}

function ObservationCard({ icon: Icon, title, detail }) {
  return (
    <article className={`${glassCardClass} flex gap-4 p-4 items-start flex-1 w-full`}>
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#e6f1f4] text-[#416f82]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-(--muted)/70 mb-0.5">{title}</p>
        <p className="text-xs font-medium leading-relaxed text-(--muted)">{detail}</p>
      </div>
    </article>
  );
}

export default Career;