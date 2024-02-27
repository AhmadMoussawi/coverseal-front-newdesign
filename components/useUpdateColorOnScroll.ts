import { useRouter } from "next/router";
import { useEffect } from "react";
import { Color } from "../utils/constants";
import { useWindowSize } from "./useWindowSize";

function buildThresholdList(numSteps: number) {
  let thresholds = [];

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

export function useUpdateColorOnScroll(cssSelector: string) {
  const router = useRouter();
  const size = useWindowSize();

  useEffect(() => {
    const items = document.querySelectorAll(cssSelector);
    const sections = document.querySelectorAll("section, footer");
    const observers = [];

    items.forEach((item) => {
      const bbox = item.getBoundingClientRect();
      const centerPosition = bbox.bottom - bbox.height / 2;

      let options = {
        threshold: buildThresholdList(100),
      };

      let observer = new IntersectionObserver((entries, _observer) => {
        entries.forEach((entry) => {
          const isElementHoverEntry =
            entry.boundingClientRect.top < centerPosition &&
            entry.boundingClientRect.bottom > centerPosition;

          if (isElementHoverEntry) {
            switch (
              entry.target.attributes.getNamedItem("data-color")?.value as Color
            ) {
              case Color.TERRA_COTTA:
              case Color.ANTHRACITE:
                item.classList.add("white");
                item.classList.remove("terra-cotta");
                break;
              case Color.WHITE:
              case Color.BEIGE:
              case Color.SAND:
              default:
                item.classList.remove("white");
                item.classList.add("terra-cotta");
                break;
            }
          }
        });
      }, options);

      sections.forEach((section) => {
        observer.observe(section);
      });

      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, [router, size]);
}
