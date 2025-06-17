/**
 * Application Constants
 * 
 * This file contains all application constants organized by category.
 * As the application grows, consider splitting into domain-specific files.
 */

// Time constants (in milliseconds)
export const TIME = {
  ONE_SECOND: 1000,
  ONE_MINUTE: 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
};

// API related constants
export const API = {
  STALE_TIME: TIME.ONE_MINUTE, // Default stale time for queries
  RETRY_COUNT: 3,
  RETRY_DELAY: 2000,
};

// UI related constants
export const UI = {
  TOAST_DURATION: {
    SUCCESS: 3000,
    ERROR: 6000,
    INFO: 4000,
  },
  ANIMATION_DURATION: {
    SHORT: 150,
    MEDIUM: 300,
    LONG: 500,
  },
};
