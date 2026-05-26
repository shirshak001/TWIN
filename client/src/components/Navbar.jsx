import { useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';

const pageTitles = {
  '/dashboard': 'Your Digital Twin dashboard',
  '/health': ' ',
  '/finance': ' ',
  '/career': ' ',
  '/intelligence': 'Cross-domain intelligence',
  '/simulation': 'Scenario simulation',
  '/copilot': 'Twin Copilot',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
};

function Navbar() {
  const location = useLocation();
  const user = getStoredUser();
  const firstName = user?.firstName || 'Anjali';
  const pageTitle = pageTitles[location.pathname] || 'DigitalTwin workspace';

  return (
    <header className="sticky top-0 z-10 border-b border-(--border) bg-[rgba(255,255,255,0.04)] px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-semibold text-(--primary)">Good Evening, {firstName}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-(--text)">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-(--border) bg-[rgba(255,255,255,0.08)] text-(--text) shadcn-transition hover:bg-[rgba(255,255,255,0.12)] hover:scale-105" type="button" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary) text-sm font-semibold text-[#0b1020] shadcn-transition hover:scale-105" type="button" aria-label="Profile">
            {firstName.slice(0, 1).toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}

function getStoredUser() {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
export default Navbar;
