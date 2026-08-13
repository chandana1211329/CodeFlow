// Google Analytics (GA4) Utility Module

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false;

/**
 * Initializes Google Analytics 4 dynamically if a Measurement ID is configured.
 */
export const initGA = (): boolean => {
  if (isInitialized) return true;
  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.log('[Analytics] Google Analytics Measurement ID is not configured (VITE_GA_MEASUREMENT_ID). Operating in noop mode.');
    }
    return false;
  }

  try {
    // Inject Google Analytics script tag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Page views handled explicitly for React SPA route tracking
    });

    isInitialized = true;
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Google Analytics initialized with ID: ${GA_MEASUREMENT_ID}`);
    }
    return true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize Google Analytics:', error);
    return false;
  }
};

/**
 * Track SPA Page View
 * @param path Relative path or hash route (e.g., '/playground' or '/dashboard')
 * @param title Optional document title override
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!isInitialized && !initGA()) {
    if (import.meta.env.DEV) {
      console.log(`[Analytics Noop] Page View: ${path}`);
    }
    return;
  }

  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      send_to: GA_MEASUREMENT_ID,
    });
  }
};

/**
 * Track Custom Event
 * @param eventName Name of the GA4 event (e.g. 'run_code', 'login_success')
 * @param params Optional event parameters
 */
export const trackEvent = (eventName: string, params?: Record<string, any>): void => {
  if (!isInitialized && !initGA()) {
    if (import.meta.env.DEV) {
      console.log(`[Analytics Noop] Event: ${eventName}`, params);
    }
    return;
  }

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};
