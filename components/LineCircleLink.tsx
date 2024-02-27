import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Color } from "../utils/constants";

interface Props {
  href: string;
  text: string;
  color: Color;
  externalLink?: boolean;
}

export function LineCircleLink({ href, text, color, externalLink }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const line = ref.current.querySelector(".line");
    const circle = ref.current.querySelector(".circle circle");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: line,
        start: "top bottom-=10%",
      },
    });

    if (window?.innerWidth > 580) {
      timeline.addLabel("line").fromTo(
        line,
        {
          x: "-100vw",
        },
        {
          x: window?.innerWidth > 768 ? "-232px" : "-197px",
          duration: 2,
          ease: "power3",
          clearProps: "all",
        }
      );
    }

    timeline.addLabel("circle").fromTo(
      circle,
      {
        strokeDasharray: 300,
        strokeDashoffset: 300,
      },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power3.Out",
      },
      "-=0.5"
    );
  }, []);

  return (
    <div ref={ref} className="line-circle-link" data-color={color}>
      <div className="line" />
      {externalLink ? (
        <a href={href} target="_blank">
          <span>{text}</span>
          <div className="svg-container">
            <svg className="circle" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" />
            </svg>
          </div>
        </a>
      ) : (
        <Link href={href} passHref>
          <a>
            <span>{text}</span>
            <div className="svg-container">
              <svg className="circle" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" />
              </svg>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
}
