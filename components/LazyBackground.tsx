import { useEffect, useRef } from 'react';

const LazyBackground = ({ src, className,cssClassImage, ...props }) => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    let observer;

    if (IntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              element.style.backgroundImage = `url(${src})`;
              observer.unobserve(element);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(element);
    } else {
      // Fallback for browsers that don't support Intersection Observer
      element.style.backgroundImage = `url(${src})`;
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src]);

  return <div className={className}>
  <div  className="overlay">
  <div
    className={cssClassImage}
     ref={ref} {...props}
  ></div>
</div></div>;
};

export default LazyBackground;
