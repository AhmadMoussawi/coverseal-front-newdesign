import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Color } from "../utils/constants";

interface Props {
  href: string;
  text: string;
  color: Color;
  isHtml?: boolean;
}

export function LineLink({ href, text, color, isHtml }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    gsap.fromTo(
      ref.current,
      {
        x: "-100%",
      },
      {
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=10%",
        },
        duration: 2,
        x: 0,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="line-link" data-color={color}>
      <div ref={ref} className="line" />
      <Link href={href} passHref>
        {isHtml ? (
          <a
            className="link-underline"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ) : (
          <a className="link-underline">{text}</a>
        )}
      </Link>
    </div>
  );
}
