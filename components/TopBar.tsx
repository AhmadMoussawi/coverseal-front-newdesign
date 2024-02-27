import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MainMenu } from "./MainMenu";
import { MenuAnimation } from "../animations/menu";
import { useUpdateColorOnScroll } from "./useUpdateColorOnScroll";

export default function TopBar({ mainMenuProps, hasSAV }: TopBarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuAnimation = useRef(new MenuAnimation());
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    menuAnimation.current.setParameters({
      overlayMenu: document.querySelector<HTMLDivElement>(".overlay-menu")!,
      wrapper: document.querySelector<HTMLDivElement>(
        ".overlay-menu .wrapper"
      )!,
      sideNav: document.querySelector<HTMLDivElement>(".side-nav")!,
    });
  }, []);

  const handleMenuOpen = useCallback(() => {
    menuAnimation.current?.openMenu();
    setIsMenuOpen(true);
    document.querySelector("body").setAttribute('style', 'overflow:hidden !important');;
  }, []);

  const handleMenuClose = useCallback(() => {
    if (isMenuOpen) {
      menuAnimation.current?.closeMenu();
      setIsMenuOpen(false);
      document.querySelector("body").style.overflow = "auto";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    handleMenuClose();
  }, [router]);

  useUpdateColorOnScroll(".open-menu-button");

  return (
    <header>
      <button className="open-menu-button" onClick={handleMenuOpen}>
        <div className="icon">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
        <span>{mainMenuProps.menu_hamburger_text}</span>
      </button>
      <MainMenu
        {...mainMenuProps}
        overlayRef={overlayRef}
        handleMenuClose={handleMenuClose}
        hasSAV={hasSAV}
      />
    </header>
  );
}
