/**
 * Icon utility with lucide-react icons and color palettes
 */
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
  Search,
  Calendar,
  Lightbulb,
  Check,
  Moon,
  Sun,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Shield,
  Lock,
  Play,
  Slack,
  Loader,
  MapPin,
} from 'lucide-react';

// Color palette for different contexts
export const iconColors = {
  primary: '#a33bff',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  neutral: '#6b7280',
  sky: '#06b6d4',
  warm: '#f97316',
};

// Icon components with consistent styling
export const Icons = {
  // Navigation
  Home: (props) => <Home {...props} className={props.className || 'w-5 h-5'} />,
  Heart: (props) => <Heart {...props} className={props.className || 'w-5 h-5'} />,
  Wallet: (props) => <Wallet {...props} className={props.className || 'w-5 h-5'} />,
  Briefcase: (props) => <Briefcase {...props} className={props.className || 'w-5 h-5'} />,
  Target: (props) => <Target {...props} className={props.className || 'w-5 h-5'} />,
  Spark: (props) => <Zap {...props} className={props.className || 'w-5 h-5'} />,
  Branch: (props) => <GitBranch {...props} className={props.className || 'w-5 h-5'} />,
  Chat: (props) => <MessageCircle {...props} className={props.className || 'w-5 h-5'} />,
  Bell: (props) => <Bell {...props} className={props.className || 'w-5 h-5'} />,
  Settings: (props) => <Settings {...props} className={props.className || 'w-5 h-5'} />,
  ChevronLeft: (props) => <ChevronLeft {...props} className={props.className || 'w-5 h-5'} />,
  ChevronRight: (props) => <ChevronRight {...props} className={props.className || 'w-5 h-5'} />,
  
  // Dashboard
  Search: (props) => <Search {...props} className={props.className || 'w-5 h-5'} />,
  Calendar: (props) => <Calendar {...props} className={props.className || 'w-5 h-5'} />,
  Lightbulb: (props) => <Lightbulb {...props} className={props.className || 'w-5 h-5'} />,
  Check: (props) => <Check {...props} className={props.className || 'w-5 h-5'} />,
  Moon: (props) => <Moon {...props} className={props.className || 'w-5 h-5'} />,
  Sun: (props) => <Sun {...props} className={props.className || 'w-5 h-5'} />,
  BarChart: (props) => <BarChart3 {...props} className={props.className || 'w-5 h-5'} />,
  TrendingUp: (props) => <TrendingUp {...props} className={props.className || 'w-5 h-5'} />,
  AlertTriangle: (props) => <AlertTriangle {...props} className={props.className || 'w-5 h-5'} />,
  Shield: (props) => <Shield {...props} className={props.className || 'w-5 h-5'} />,
  Lock: (props) => <Lock {...props} className={props.className || 'w-5 h-5'} />,
  Play: (props) => <Play {...props} className={props.className || 'w-5 h-5'} />,
  Pulse: (props) => <Heart {...props} className={props.className || 'w-5 h-5'} style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />,
  MapPin: (props) => <MapPin {...props} className={props.className || 'w-5 h-5'} />,
};

// Icon color variants
export const getIconColor = (tone) => {
  const toneMap = {
    primary: iconColors.primary,
    success: iconColors.success,
    warning: iconColors.warning,
    danger: iconColors.danger,
    info: iconColors.info,
    neutral: iconColors.neutral,
    sky: iconColors.sky,
    warm: iconColors.warm,
  };
  return toneMap[tone] || iconColors.primary;
};
