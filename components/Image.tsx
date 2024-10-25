import classNames from "classnames";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { CMS_PUBLIC_URL, AnimationDirection } from "../utils/constants";

// Function to get animation values
function getAnimationValues(direction: AnimationDirection = AnimationDirection.LEFT_TO_RIGHT) {
  switch (direction) {
    case AnimationDirection.TOP_TO_BOTTOM:
      return {
        start: { y: 0 },
        end: { y: "100%" },
      };
    case AnimationDirection.BOTTOM_TO_TOP:
      return {
        start: { y: 0 },
        end: { y: "-100%" },
      };
    case AnimationDirection.LEFT_TO_RIGHT:
      return {
        start: { x: 0 },
        end: { x: "100%" },
      };
    case AnimationDirection.RIGHT_TO_LEFT:
      return {
        start: { x: 0 },
        end: { x: "-100%" },
      };
    default:
      return { start: {}, end: {} };
  }
}

interface Props {
  id: string;
  title: string;
  isBackgroundCss?: boolean;
  className?: string;
  containerClassName?: string;
  direction?: AnimationDirection;
  quality?: string;
}

const Image = ({
  id,
  title,
  isBackgroundCss,
  className,
  containerClassName,
  direction,
  quality = "40",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const imageLink = `${CMS_PUBLIC_URL}/assets/${id}?quality=${quality}&format=webp`;

  // Intersection Observer for lazy loading background images
  useEffect(() => {
    const element = backgroundRef.current;

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && element) {
          element.style.backgroundImage = `url(${imageLink})`;
        }
      });
    };

    const observer = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(onIntersection, { threshold: 0.1 })
      : null;

    if (observer && element) {
      observer.observe(element);
    } else if (element) {
      element.style.backgroundImage = `url(${imageLink})`;
    }

    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [imageLink]);

  // GSAP animation
  useEffect(() => {
    if (ref.current && direction) {
      const { start, end } = getAnimationValues(direction);
      gsap.fromTo(
        ref.current,
        { display: "block", ...start },
        {
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom-=10%",
          },
          duration: 2,
          ...end,
          ease: "power3.out",
        }
      );
    }
  }, [direction]);

  // Class names
  const cssClassImage = classNames("image", {
    "css-image": isBackgroundCss,
    [className || ""]: className,
  });

  const cssClassContainer = classNames("image-container", {
    [containerClassName || ""]: containerClassName,
  });

  return (
    <div className={cssClassContainer}>
      <div ref={ref} className="overlay" />
      {isBackgroundCss ? (
        <div className={cssClassImage} ref={backgroundRef} />
      ) : (
        <img
          className={cssClassImage}
          src={imageLink}
          alt={title}
          loading="lazy"
          width="300"
          height="300"
        />
      )}
    </div>
  );
}

export default Image;
