/**
 * Safe localStorage utilities with error handling and type safety
 */

/**
 * Safely retrieves and parses JSON from localStorage
 * @param key - The localStorage key to retrieve
 * @param defaultValue - Default value to return if key doesn't exist or parsing fails
 * @returns The parsed value or defaultValue
 */
export function safeLocalStorageGet<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      return defaultValue;
    }
    return JSON.parse(stored) as T;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to parse localStorage key "${key}":`, error);
    }
    return defaultValue;
  }
}

/**
 * Safely stores a value in localStorage as JSON
 * @param key - The localStorage key to set
 * @param value - The value to store (will be JSON stringified)
 * @returns true if successful, false otherwise
 */
export function safeLocalStorageSet<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to set localStorage key "${key}":`, error);
    }
    return false;
  }
}

/**
 * Safely removes a key from localStorage
 * @param key - The localStorage key to remove
 * @returns true if successful, false otherwise
 */
export function safeLocalStorageRemove(key: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to remove localStorage key "${key}":`, error);
    }
    return false;
  }
}

/**
 * Checks if localStorage is available and working
 * @returns true if localStorage is available and functional
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}
