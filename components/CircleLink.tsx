import React, { useCallback, useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import classNames from "classnames";
import { useWindowSize } from "./useWindowSize";

interface LinkProps {
  href: string;
  text: string;
}

interface Props {
  mainLink: LinkProps;
  secondLink?: LinkProps;
  textAlign?: "left" | "right" | "bottom";
}

export function CircleLink({ mainLink, secondLink, textAlign }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const circle = ref.current.querySelector(".circle circle");
    const link = ref.current.querySelector(".main-link");

    gsap.fromTo(
      circle,
      {
        strokeDasharray: 300,
        strokeDashoffset: 300,
      },
      {
        scrollTrigger: {
          trigger: link,
          start: size.height < 500 ? "top bottom" : "top bottom-=10%",
        },
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power3.Out",
      }
    );
  }, []);

  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return (
    <div
      ref={ref}
      className={classNames({
        "circle-link": true,
        "text-right": textAlign === "right",
        "text-bottom": textAlign === "bottom",
        "is-hover": isHover,
      })}
    >
      <svg className="circle" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" />
      </svg>
      <div className="text-container">
        <Link href={mainLink.href} passHref>
          <a
            className="main-link"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {mainLink.text}
          </a>
        </Link>
        {secondLink && (
          <Link href={secondLink.href} passHref>
            <a className="second-link">{secondLink.text}</a>
          </Link>
        )}
      </div>
    </div>
  );
}
