import { useState, useEffect } from 'react';

export function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const scrollListener = () => {
      const element = document.documentElement;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const windowScroll = element.scrollTop;

      if (windowScroll === 0) {
        return setWidth(0);
      }

      if (windowScroll > totalHeight) {
        return setWidth(100);
      }

      setWidth((windowScroll / totalHeight) * 100);
    };

    window.addEventListener('scroll', scrollListener);

    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-primary transition-all duration-75 ease-out"
      style={{ width: `${width}%` }}
    />
  );
}
