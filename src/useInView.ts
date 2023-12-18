import { ref, onMounted } from "vue";
import type { Ref } from "vue";

interface IntersectionObserverOptions {
  root: Element | Document | null;
  rootMargin: string;
  threshold: number | number[];
  trackVisibility: boolean;
  delay: number;
}

const defaultOptions: IntersectionObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
  trackVisibility: false,
  delay: 0,
};

export function useIsInView(
  elementRef: Ref<HTMLElement | Element>,
  options: Partial<IntersectionObserverOptions> = defaultOptions
) {
  const isInView = ref<boolean>(false);

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    const intersecting = entries[0].isIntersecting;
    isInView.value = intersecting;
  }

  onMounted(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      ...defaultOptions,
      ...options,
    });
    observer.observe(elementRef.value);
  });
  return {
    isInView,
  };
}
