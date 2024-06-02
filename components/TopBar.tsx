import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MainMenu } from "./MainMenu";
import { MenuAnimation } from "../animations/menu";
import { useUpdateColorOnScroll } from "./useUpdateColorOnScroll";
import { SideNav } from "./SideNav";

export default function TopBar({ mainMenuProps, hasSAV,  sideNavProps} ) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = useRef(new MenuAnimation());
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);const handleScroll = () => {
    const currentScrollY = window.scrollY;
    console.log(currentScrollY)
if(currentScrollY<50)
  {
    setAtTop(true);
  }
  else{
    setAtTop(false)
  }
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scroll down
      setIsVisible(false);
    } else {
      // Scroll up
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
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
    <header className={`${isVisible ? (!atTop?'translate-y-0':'') : 'translate-y-full'}`}>
      <SideNav {...sideNavProps} handleMenuOpen={handleMenuOpen} mainMenuProps={mainMenuProps} />
      
      <MainMenu
        {...mainMenuProps}
        overlayRef={overlayRef}
        handleMenuClose={handleMenuClose}
        hasSAV={hasSAV}
      />
    </header>
  );
}
