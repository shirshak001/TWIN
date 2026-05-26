/**
 * Shadcn-inspired animated components
 */
import React from 'react';
import { transitionClasses, hoverEffects } from './animations';
import { cn } from './utils';

/**
 * Animated Card Component
 */
export const AnimatedCard = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-white shadow-sm hover:shadow-md hover:-translate-y-1',
      transitionClasses.normal,
      className
    )}
    {...props}
  >
    {children}
  </div>
));
AnimatedCard.displayName = 'AnimatedCard';

/**
 * Animated Button
 */
export const AnimatedButton = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'px-4 py-2 rounded-lg font-medium',
      'active:scale-95',
      transitionClasses.fast,
      'hover:shadow-lg',
      className
    )}
    {...props}
  >
    {children}
  </button>
));
AnimatedButton.displayName = 'AnimatedButton';

/**
 * Fade In Container
 */
export const FadeInContainer = ({ children, className, delay = 0 }) => (
  <div
    className={cn('animate-fade-in', className)}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

/**
 * Slide In Container
 */
export const SlideInContainer = ({ children, className, direction = 'left', delay = 0 }) => {
  const animationClass = direction === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right';
  return (
    <div
      className={cn(animationClass, className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * Scale In Container
 */
export const ScaleInContainer = ({ children, className, delay = 0 }) => (
  <div
    className={cn('animate-scale-in', className)}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

/**
 * Bounce In Container
 */
export const BounceInContainer = ({ children, className, delay = 0 }) => (
  <div
    className={cn('animate-bounce-in', className)}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

/**
 * Hover Lift Effect
 */
export const HoverLift = ({ children, className }) => (
  <div className={cn('hover:-translate-y-1', transitionClasses.normal, className)}>
    {children}
  </div>
);

/**
 * Icon with animation
 */
export const AnimatedIcon = ({ icon: Icon, className, animate = true, ...props }) => (
  <Icon
    className={cn(
      className,
      animate && 'transition-transform duration-300 hover:scale-110',
    )}
    {...props}
  />
);
