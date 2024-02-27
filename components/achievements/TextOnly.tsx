import gsap from "gsap";
import { useEffect, useRef } from "react";

export function TextOnly({ translations }: AchievementsSectionsDirectus) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    gsap.fromTo(
      ref.current,
      {
        y: "-30%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=10%",
        },
        duration: 2,
        opacity: 1,
        y: 0,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div ref={ref} className="text-only-block block">
      <div
        className="paragraph wysiwyg"
        dangerouslySetInnerHTML={{ __html: translations[0].content }}
      />
    </div>
  );
}
