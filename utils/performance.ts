/**
 * Performance monitoring utilities for Flik Pay
 */

import { InteractionManager } from 'react-native';

// Performance timing utilities
export const performanceUtils = {
  // Measure function execution time
  measureTime: async <T>(fn: () => Promise<T> | T, label?: string): Promise<T> => {
    const start = Date.now();
    const result = await fn();
    const end = Date.now();
    
    if (__DEV__ && label) {
      console.log(`⏱️ ${label}: ${end - start}ms`);
    }
    
    return result;
  },

  // Defer heavy operations until interactions are complete
  runAfterInteractions: <T>(fn: () => Promise<T> | T): Promise<T> => {
    return new Promise((resolve) => {
      InteractionManager.runAfterInteractions(() => {
        resolve(fn());
      });
    });
  },

  // Batch state updates to prevent multiple re-renders
  batchUpdates: (updates: (() => void)[]): void => {
    InteractionManager.runAfterInteractions(() => {
      updates.forEach(update => update());
    });
  },
};

// Memory management utilities
export const memoryUtils = {
  // Clear large objects from memory
  clearLargeObjects: (objects: Record<string, any>[]): void => {
    objects.forEach(obj => {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          obj[key] = null;
        }
      });
    });
  },

  // Check if device has low memory
  isLowMemoryDevice: (): boolean => {
    // This would typically check device specs
    // For now, return false as a placeholder
    return false;
  },
};

// Bundle size optimization utilities
export const bundleUtils = {
  // Check if component should be loaded
  shouldLoadComponent: (condition: boolean): boolean => {
    return condition;
  },

  // Preload critical components
  preloadComponent: async <T>(importFn: () => Promise<{ default: T }>): Promise<void> => {
    try {
      await importFn();
    } catch (error) {
      console.warn('Failed to preload component:', error);
    }
  },
};

// Network optimization utilities
export const networkUtils = {
  // Debounce network requests
  debounceRequest: <T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  },

  // Retry failed requests
  retryRequest: async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    let lastError: Error;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
      }
    }
    
    throw lastError!;
  },
};

// Image optimization utilities
export const imageUtils = {
  // Get optimized image dimensions
  getOptimizedDimensions: (
    originalWidth: number,
    originalHeight: number,
    maxWidth: number = 400,
    maxHeight: number = 400
  ): { width: number; height: number } => {
    const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
    
    return {
      width: Math.round(originalWidth * ratio),
      height: Math.round(originalHeight * ratio),
    };
  },

  // Check if image should be compressed
  shouldCompressImage: (fileSize: number, maxSize: number = 1024 * 1024): boolean => {
    return fileSize > maxSize;
  },
};

// Development utilities
export const devUtils = {
  // Log performance metrics
  logMetrics: (metrics: Record<string, number>): void => {
    if (__DEV__) {
      console.log('📊 Performance Metrics:', metrics);
    }
  },

  // Monitor component renders
  monitorRenders: (componentName: string): void => {
    if (__DEV__) {
      console.log(`🔄 ${componentName} rendered`);
    }
  },

  // Check for memory leaks
  checkMemoryLeaks: (): void => {
    if (__DEV__) {
      // This would typically use memory profiling tools
      console.log('🔍 Checking for memory leaks...');
    }
  },
};

// Export all utilities
export default {
  performance: performanceUtils,
  memory: memoryUtils,
  bundle: bundleUtils,
  network: networkUtils,
  image: imageUtils,
  dev: devUtils,
};
