import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Heart,
  Wallet,
  Briefcase,
  Target,
  Zap,
  GitBranch,
  MessageCircle,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import DigitalTwinLogo from './DigitalTwinLogo';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Health', href: '/health', icon: Heart },
  { label: 'Finance', href: '/finance', icon: Wallet },
  { label: 'Career', href: '/career', icon: Briefcase },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Intelligence', href: '/intelligence', icon: Zap },
  { label: 'Simulation', href: '/simulation', icon: GitBranch },
  { label: 'Twin Copilot', href: '/copilot', icon: MessageCircle },
  { label: 'Notifications', href: '/notifications', icon: Bell },
];

const settingsItem = { label: 'Settings', href: '/settings', icon: Settings };

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`hidden h-screen shrink-0 border-r border-(--border) bg-(--secondary-bg) px-4 py-6 transition-[width] duration-300 lg:block ${
        isCollapsed ? 'w-20' : 'w-68'
      }`}
    >
      <div className="flex h-full flex-col">
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between gap-3'}`}>
        <NavLink to="/dashboard" className="flex min-w-0 items-center gap-3">
          <DigitalTwinLogo className="h-11 w-11 rounded-lg border border-(--border) shadow-lg shadow-[0_18px_55px_rgba(0,0,0,0.18)]" />
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-(--text)">DigitalTwin</p>
            </div>
          )}
        </NavLink>

        {!isCollapsed && (
          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#c8dbe2] text-[#4e6670] transition hover:bg-[#f3f8fa]"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="mx-auto mt-4 flex h-9 w-9 items-center justify-center rounded-lg border border-[#c8dbe2] text-[#4e6670] transition hover:bg-[#f3f8fa]"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      <nav className="mt-9 space-y-1">
        {navItems.map((item) => (
          <SidebarNavItem key={item.label} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>
      <nav className="mt-auto border-t border-(--border) pt-4">
        <SidebarNavItem item={settingsItem} isCollapsed={isCollapsed} />
      </nav>
      </div>
    </aside>
  );
}

function SidebarNavItem({ item, isCollapsed }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      title={isCollapsed ? item.label : undefined}
      className={({ isActive }) =>
        `flex items-center rounded-lg py-2.5 text-sm font-semibold shadcn-transition ${
          isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
        } ${
          isActive
            ? 'bg-[rgba(124,255,178,0.12)] text-(--primary) shadow-sm'
            : 'text-(--muted) hover:bg-[rgba(255,255,255,0.08)] hover:text-(--text) hover:scale-105'
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!isCollapsed && <span>{item.label}</span>}
    </NavLink>
  );
}

export default Sidebar;
