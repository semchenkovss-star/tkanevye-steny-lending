export const SAMPLES_EVENT = 'polotno:samples';

export const SAMPLES_LIMIT = 5;

/** Открыть окно заказа образцов, опционально с предвыбранным оттенком */
export function openSamples(slug?: string) {
  window.dispatchEvent(new CustomEvent(SAMPLES_EVENT, { detail: { slug } }));
}
