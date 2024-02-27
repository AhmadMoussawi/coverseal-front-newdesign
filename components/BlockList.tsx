import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Props {
  blocks: any[];
  linksMap: IAnyObject;
  pageProps: any;
}

export function BlockList({ blocks, pageProps, linksMap }: Props) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const children = ref.current.querySelectorAll('li');
    gsap.fromTo(
      children,
      {
        y: "100%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: children[0],
          start: "top bottom+=300px",
        },
        duration: 2,
        y: 0,
        opacity: 1,
        stagger: 0.25,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <ul ref={ref} className="block-list">
      {blocks.map((key) => {
        const link = linksMap[key];
        const title = pageProps[`${key}_title`];
        const paragraph = pageProps[`${key}_paragraph`];
        const link_text = pageProps[`${key}_link_text`];
        return (
          <li key={key}>
            <h3 className="subtitle-poppins subtitle-poppins--terra-cotta">{title}</h3>
            <div
              className="paragraph wysiwyg"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
            <Link href={link}>
              <a className="link-before-translate link-before-translate--anthracite">
                {link_text}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
