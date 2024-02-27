import gsap from "gsap";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface MenuAnimationParameters {
  overlayMenu: HTMLDivElement;
  wrapper: HTMLDivElement;
  sideNav: HTMLDivElement;
}

const HIDDEN_CSS_CLASS = "hidden";

export class MenuAnimation {
  private parameters: MenuAnimationParameters | undefined;

  setParameters = (parameters: MenuAnimationParameters) => {
    this.parameters = parameters;
  };

  openMenu = () => {
    if (!this.parameters) {
      throw Error("Menu animation parameters undefined");
    }
    const { overlayMenu, wrapper, sideNav } = this.parameters;

    disableBodyScroll(wrapper, {
      reserveScrollBarGap: true,
    });

    sideNav.classList.add("padding-right");
    overlayMenu?.classList.remove(HIDDEN_CSS_CLASS);

    gsap.fromTo(
      overlayMenu,
      {
        width: "0%",
      },
      {
        duration: 1,
        width: "100%",
        ease: "power2.out",
      }
    );
  };

  closeMenu = () => {
    if (!this.parameters) {
      throw Error("Menu animation parameters undefined");
    }
    const { overlayMenu, wrapper, sideNav } = this.parameters;

    enableBodyScroll(wrapper);

    sideNav.classList.remove("padding-right");
    overlayMenu?.classList.add(HIDDEN_CSS_CLASS);

    gsap.fromTo(
      overlayMenu,
      {
        width: "100%",
      },
      {
        duration: 1,
        width: "0%",
        ease: "power2.out",
      }
    );
  };
}
