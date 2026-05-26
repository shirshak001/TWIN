/**
 * Shadcn-inspired animation utilities for smooth transitions
 */

export const animations = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  
  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  
  // Slide animations
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  
  // Bounce animations
  bounce: 'animate-bounce',
  bounceIn: 'animate-bounce-in',
  
  // Pulse animations
  pulse: 'animate-pulse',
  
  // Spin animations
  spin: 'animate-spin',
};

export const transitionClasses = {
  // Fast transitions (150ms)
  fast: 'transition-all duration-150',
  
  // Normal transitions (300ms)
  normal: 'transition-all duration-300',
  
  // Smooth transitions (500ms)
  smooth: 'transition-all duration-500',
  
  // Slower transitions (700ms)
  slower: 'transition-all duration-700',
};

export const hoverEffects = {
  lift: 'hover:-translate-y-1 hover:shadow-lg',
  scale: 'hover:scale-105',
  colorShift: 'hover:text-opacity-75',
  glow: 'hover:shadow-lg hover:shadow-blue-500/50',
};

export const focusRing = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
