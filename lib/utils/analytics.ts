/**
 * Analytics utility for tracking user interactions
 * Provides a consistent interface for event tracking
 */

type EventCategory = "content" | "navigation" | "interaction" | "error" | "performance";

interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: "ms" | "bytes" | "count";
}

class Analytics {
  private enabled: boolean;
  private debug: boolean;

  constructor() {
    this.enabled = typeof window !== "undefined";
    this.debug = process.env.NODE_ENV === "development";
  }

  /**
   * Track a custom event
   */
  trackEvent({ category, action, label, value, metadata }: AnalyticsEvent): void {
    if (!this.enabled) return;

    const event = {
      category,
      action,
      label,
      value,
      metadata,
      timestamp: new Date().toISOString(),
    };

    if (this.debug) {
      console.log("[Analytics] Event:", event);
    }

    // Store in session for later analysis
    this.storeEvent(event);
  }

  /**
   * Track page view
   */
  trackPageView(path: string, title?: string): void {
    this.trackEvent({
      category: "navigation",
      action: "page_view",
      label: path,
      metadata: { title },
    });
  }

  /**
   * Track content interaction
   */
  trackContentView(slug: string, category: string): void {
    this.trackEvent({
      category: "content",
      action: "view",
      label: slug,
      metadata: { contentCategory: category },
    });
  }

  /**
   * Track content completion
   */
  trackContentComplete(slug: string, timeSpentMs: number): void {
    this.trackEvent({
      category: "content",
      action: "complete",
      label: slug,
      value: timeSpentMs,
    });
  }

  /**
   * Track feature usage
   */
  trackFeatureUsage(feature: string, action: string): void {
    this.trackEvent({
      category: "interaction",
      action: `feature_${action}`,
      label: feature,
    });
  }

  /**
   * Track errors
   */
  trackError(error: Error, context?: string): void {
    this.trackEvent({
      category: "error",
      action: error.name,
      label: error.message,
      metadata: {
        context,
        stack: error.stack?.slice(0, 500),
      },
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance({ name, value, unit }: PerformanceMetric): void {
    this.trackEvent({
      category: "performance",
      action: name,
      value,
      metadata: { unit },
    });
  }

  /**
   * Store event in session storage
   */
  private storeEvent(event: object): void {
    if (typeof sessionStorage === "undefined") return;

    try {
      const events = JSON.parse(sessionStorage.getItem("analytics_events") || "[]");
      events.push(event);

      // Keep only last 100 events
      if (events.length > 100) {
        events.shift();
      }

      sessionStorage.setItem("analytics_events", JSON.stringify(events));
    } catch {
      // Silently fail if storage is full
    }
  }

  /**
   * Get stored events for debugging
   */
  getStoredEvents(): object[] {
    if (typeof sessionStorage === "undefined") return [];

    try {
      return JSON.parse(sessionStorage.getItem("analytics_events") || "[]");
    } catch {
      return [];
    }
  }

  /**
   * Clear stored events
   */
  clearStoredEvents(): void {
    if (typeof sessionStorage === "undefined") return;
    sessionStorage.removeItem("analytics_events");
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Export types for consumers
export type { AnalyticsEvent, PerformanceMetric, EventCategory };
