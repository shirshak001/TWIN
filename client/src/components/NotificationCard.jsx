import { Bell, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const iconMap = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'bg-[rgba(124,255,178,0.14)] text-(--primary) ring-[rgba(124,255,178,0.2)]',
  warning: 'bg-[rgba(245,158,11,0.14)] text-(--warning) ring-[rgba(245,158,11,0.2)]',
  info: 'bg-[rgba(110,168,254,0.14)] text-(--secondary) ring-[rgba(110,168,254,0.2)]',
};

function NotificationCard({ title, message, time, tag, variant = 'info' }) {
  const Icon = iconMap[variant] || Bell;
  const badgeClasses = colorMap[variant] || colorMap.info;

  return (
    <article className="group rounded-3xl border border-(--border) bg-(--surface-soft) p-5 shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:border-(--primary) hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`grid h-11 w-11 place-items-center rounded-3xl ${badgeClasses}`}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-(--text)">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-(--muted)">{message}</p>
          </div>
        </div>
        <div className="text-right text-xs uppercase tracking-[0.18em] text-(--muted)">
          <span className="block font-semibold">{tag}</span>
          <span className="mt-1 block">{time}</span>
        </div>
      </div>
    </article>
  );
}

export default NotificationCard;
