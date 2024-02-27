import gsap from "gsap";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { AnimationDirection } from "../../utils/constants";
import { Image } from "../Image";

export function TextImage({
  image,
  translations,
  text_image_variant,
}: AchievementsSectionsDirectus) {
  const cssClass = classNames({
    "text-image-block": true,
    block: true,
    "image-left": text_image_variant === "image_left",
    "image-right": text_image_variant === "image_right",
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    gsap.fromTo(
      ref.current,
      {
        x: text_image_variant === "image_right" ? "30%" : "-30%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=10%",
        },
        duration: 2,
        opacity: 1,
        x: 0,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className={cssClass}>
      <div
        ref={ref}
        className="paragraph wysiwyg"
        dangerouslySetInnerHTML={{ __html: translations[0].content }}
      />
      <Image
        id={image}
        title="image"
        direction={
          text_image_variant === "image_right"
            ? AnimationDirection.RIGHT_TO_LEFT
            : undefined
        }
      />
    </div>
  );
}
