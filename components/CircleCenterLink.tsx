import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  href: string;
  text: string;
  external?: boolean;
}

export function CircleCenterLink({ href, text, external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    gsap.fromTo(
      ref.current,
      {
        scale: 0,
      },
      {
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom-=10%",
        },
        duration: 2,
        scale: 1,
        ease: "power3.out",
        clearProps: "all",
      }
    );
  }, []);

  if (external) {
    return (
      <a href={href} target="_blank" ref={ref} className="center-circle-link">
        <span>{text}</span>
      </a>
    );
  }

  return (
    <Link href={href} passHref>
      <a ref={ref} className="center-circle-link">
        <span>{text}</span>
      </a>
    </Link>
  );
}
