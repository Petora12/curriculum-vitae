import { useState, useEffect } from 'react';

export const useIsCentered = (ref, scrollContainerRef) => {
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsCentered(entry.isIntersecting),
      {
        root: scrollContainerRef?.current || null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0,
      },
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [ref, scrollContainerRef]);

  return isCentered;
};
