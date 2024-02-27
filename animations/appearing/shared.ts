import gsap from "gsap";

const translateInDistance = 30;
const duration = 2;

export function translateInFromLeftToRight(selector: string) {
  gsap.fromTo(
    selector,
    {
      x: `-${translateInDistance}%`,
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: selector,
        start: "top bottom-=10%",
      },
      duration,
      opacity: 1,
      x: 0,
      ease: "power3.out",
    }
  );
}

export function translateInFromRightToLeft(selector: string) {
  gsap.fromTo(
    selector,
    {
      x: `${translateInDistance}%`,
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: selector,
        start: "top bottom-=10%",
      },
      duration,
      opacity: 1,
      x: 0,
      ease: "power3.out",
    }
  );
}
