import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { User, Shield, LogOut, Pencil, Sparkles } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function Settings() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [settings, setSettings] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'female',
    age: '',
    height: '',
    weight: '',
    goalPreferences: '',
    healthPreferences: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profile = response.data.data;
        const onboardingData = getStoredOnboardingProfile();
        setUserProfile(profile);
        setSettings((current) => ({
          ...current,
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || '',
          gender: onboardingData.gender || profile.gender || 'female',
          age: onboardingData.age || profile.age || '',
          height: onboardingData.heightCm || profile.heightCm || '',
          weight: onboardingData.weightKg || profile.weightKg || '',
          goalPreferences: (onboardingData.goalPreferences || profile.goalPreferences || []).join(', '),
          healthPreferences: onboardingData.healthPreferences || profile.healthPreferences || '',
        }));
      } catch (error) {
        toast.error('Unable to load profile information.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please sign in again to save settings.');
      setSaving(false);
      return;
    }

    const payload = {
      firstName: settings.firstName,
      lastName: settings.lastName,
      email: settings.email,
      gender: settings.gender,
      age: Number(settings.age) || null,
      heightCm: Number(settings.height) || null,
      weightKg: Number(settings.weight) || null,
      goalPreferences: settings.goalPreferences.split(',').map((item) => item.trim()).filter(Boolean),
      healthPreferences: settings.healthPreferences,
    };

    try {
      await axios.put(`${API_BASE_URL}/api/auth/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await axios.put(`${API_BASE_URL}/api/onboarding/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-(--secondary-bg) px-4 py-6 text-(--text)">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-(--border) bg-(--surface) p-10 text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <p className="text-lg font-semibold text-(--text)">Loading profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--secondary-bg) px-4 py-6 sm:px-8 text-(--text)">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[2rem] border border-(--border) bg-(--surface) p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-(--muted)">Profile settings</p>
              <h1 className="mt-3 text-4xl font-semibold text-(--text)">Personal and account preferences</h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-(--muted)">
                Update your profile, health preferences, and AI behavior settings in one place.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface-soft) px-6 py-3 text-sm font-semibold text-(--text) transition hover:bg-[rgba(255,255,255,0.08)]"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </header>

        <article className="rounded-[2rem] border border-(--border) bg-(--surface) p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[rgba(124,255,178,0.12)] text-(--primary)">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">Account</p>
                  <h2 className="text-2xl font-semibold text-(--text)">Profile overview</h2>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="First name" value={settings.firstName} onChange={(value) => handleChange('firstName', value)} />
                <TextInput label="Last name" value={settings.lastName} onChange={(value) => handleChange('lastName', value)} />
              </div>
              <TextInput label="Email" value={settings.email} onChange={(value) => handleChange('email', value)} type="email" />
              <div className="grid gap-4 sm:grid-cols-3">
                <SelectInput
                  label="Gender"
                  value={settings.gender}
                  options={['female', 'male']}
                  onChange={(value) => handleChange('gender', value)}
                />
                <TextInput label="Age" value={settings.age} onChange={(value) => handleChange('age', value)} type="number" />
                <TextInput label="Height (cm)" value={settings.height} onChange={(value) => handleChange('height', value)} type="number" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextInput label="Weight (kg)" value={settings.weight} onChange={(value) => handleChange('weight', value)} type="number" />
                <TextInput label="Goal preferences" value={settings.goalPreferences} onChange={(value) => handleChange('goalPreferences', value)} placeholder="Finance, Health, Career" />
              </div>
              <TextAreaInput label="Health preferences" value={settings.healthPreferences} onChange={(value) => handleChange('healthPreferences', value)} placeholder="Hydration, recovery, low-impact workouts..." />
            </div>

            <div className="rounded-[2rem] border border-(--border) bg-[rgba(255,255,255,0.04)] p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[rgba(255,255,255,0.08)] text-(--secondary)">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">Security</p>
                  <h2 className="text-2xl font-semibold text-(--text)">Account protection</h2>
                </div>
              </div>
              <p className="text-sm leading-7 text-(--muted)">
                Your saved profile and health preferences feed the AI analytics engine to keep recommendations aligned with your current goals.
              </p>
              <div className="mt-6 space-y-4">
                <InfoCard title="Goal memory" text="The chatbot assistant remembers your current priorities and adjusts prompts over time." />
                <InfoCard title="Adaptive coaching" text="Your settings are used to tune workout safety, pregnancy guidance, and financial recommendations." />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-[rgba(124,255,178,0.95)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Pencil className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save profile'}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <label className="block text-sm font-semibold text-(--text)">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-3xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-[rgba(124,255,178,0.18)]"
      />
    </label>
  );
}

function TextAreaInput({ label, value, onChange, placeholder = '' }) {
  return (
    <label className="block text-sm font-semibold text-(--text)">
      <span>{label}</span>
      <textarea
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-3xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-[rgba(124,255,178,0.18)]"
      />
    </label>
  );
}

function SelectInput({ label, value, options, onChange }) {
  return (
    <label className="block text-sm font-semibold text-(--text)">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-3xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-[rgba(124,255,178,0.18)]"
      >
        {options.map((item) => (
          <option key={item} value={item} className="bg-(--surface)">{item}</option>
        ))}
      </select>
    </label>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
      <p className="text-sm font-semibold text-(--text)">{title}</p>
      <p className="mt-2 text-sm text-(--muted)">{text}</p>
    </div>
  );
}

function getStoredOnboardingProfile() {
  try {
    const raw = localStorage.getItem('lifetwinOnboardingProfile');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default Settings;
