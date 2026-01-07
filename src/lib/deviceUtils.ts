/**
 * Device performance detection utilities
 * Used to optimize effects for slower devices
 */

export type PerformanceTier = 'high' | 'medium' | 'low';

interface DeviceCapabilities {
  tier: PerformanceTier;
  particleCount: number;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  cpuCores: number;
  deviceMemory: number | null;
}

/**
 * Detects device capabilities and returns recommended settings
 */
export function getDeviceCapabilities(): DeviceCapabilities {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Check if mobile
  const isMobile =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  // Get CPU cores (default to 4 if not available)
  const cpuCores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;

  // Get device memory in GB (Chrome only, default to null)
  const deviceMemory = typeof navigator !== 'undefined' ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory || null : null;

  // Determine performance tier
  let tier: PerformanceTier = 'high';

  if (prefersReducedMotion) {
    tier = 'low';
  } else if (isMobile) {
    // Mobile devices get medium or low tier
    if (cpuCores <= 4 || (deviceMemory !== null && deviceMemory < 4)) {
      tier = 'low';
    } else {
      tier = 'medium';
    }
  } else {
    // Desktop
    if (cpuCores <= 2 || (deviceMemory !== null && deviceMemory < 4)) {
      tier = 'low';
    } else if (cpuCores <= 4 || (deviceMemory !== null && deviceMemory < 8)) {
      tier = 'medium';
    }
  }

  // Determine particle count based on tier
  const particleCount = {
    high: 300,
    medium: 150,
    low: 80,
  }[tier];

  return {
    tier,
    particleCount,
    prefersReducedMotion,
    isMobile,
    cpuCores,
    deviceMemory,
  };
}

/**
 * Hook-friendly version that can be used in React components
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    // SSR fallback - return medium settings
    return {
      tier: 'medium',
      particleCount: 150,
      prefersReducedMotion: false,
      isMobile: false,
      cpuCores: 4,
      deviceMemory: null,
    };
  }
  return getDeviceCapabilities();
}
