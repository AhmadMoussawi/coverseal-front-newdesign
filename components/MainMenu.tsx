import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { LogoSymbol, Cross, Globe } from "./icons";
import { Color, COUNTRIES } from "../utils/constants";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
interface Props extends MainMenuProps {
  hasSAV: boolean;
  overlayRef: React.RefObject<HTMLDivElement>;
  handleMenuClose: () => void;
}

// TODO: refactor the language logic here, it's disgusting, messy and unreliable
export function MainMenu(props: Props) {
  const { overlayRef, handleMenuClose, faqPath, modelsPath, hasSAV, blogsPath, hasblogs } = props;
  const router = useRouter();
  const { locale, asPath, basePath } = router;
  const [language, country] = locale.split("-");

  const [currentLanguage, setCurrentLanguage] = useState(language || "");
  const [currentLanguageList, setCurrentLanguageList] = useState(() => {
    if (locale === "default") {
      return [];
    }
    return COUNTRIES.find((c) => c.code === country).languages;
  });
  const [currentCountry, setCurrentCountry] = useState(country || "");

  useEffect(() => {
    setCurrentLanguage(language || "");
    setCurrentLanguageList(() => {
      if (locale === "default") {
        return [];
      }
      return COUNTRIES.find((c) => c.code === country).languages;
    });
    setCurrentCountry(country || "");
  }, [language, country]);
 
  const mainMenuItems = useMemo(
    () => [
      {
        key: "the_coverseal",
        href: "/the-coverseal",
      },
      {
        key: "benefits",
        href: "/benefits",
      },
      {
        key: "models",
        href: modelsPath,
      },
      {
        key: "achievements",
        href: "/achievements",
      },
      {
        key: "about_us",
        href: "/about-us",
      },
    ],
    [modelsPath]
  );

  const subMenuItems = useMemo(
    () => {
      
      return [
      {
        key: "contact",
        href: "/contact",
      },
      {
        key: "jobs",
        href: "/jobs",
      },
      {
        key: "partnerships",
        href: "/partnerships",
      },
      {
        key: "faq",
        href: faqPath,
      },
      ...(hasSAV
        ? [
            {
              key: "after_sale",
              href: "/after-sale",
            },
          ]
        : []),
        ...(hasblogs
          ? [
              {
                key: "blogs",
        href: blogsPath,
              },
            ]
          : []),
      {
        key: "documents",
        href: "/documents",
      },      
      /*{
        key: "reviews",
        href: "/reviews",
      },*/
    ]},
    [faqPath]
  );

  const onCountryChange = useCallback(
    (c: string) => {
      const languages = COUNTRIES.find(
        (country) => country.code === c
      ).languages;
      const locale = `${languages[0].toLocaleLowerCase()}-${c}`;
      document.cookie = `LOCALE=${locale};`;
      window.location.href="/" + locale + (asPath.lastIndexOf("?")>-1?asPath.substring(0,asPath.lastIndexOf("?")):asPath);
      /*router.push(asPath, undefined, {
        locale,
        shallow:false
      });*/
    },
    [asPath]
  );

  const onLanguageChange = useCallback(
    (l) => {
      /*router.push(asPath, undefined, {
        locale: `${l.toLocaleLowerCase()}-${currentCountry}`,
        shallow:false
      });*/
      window.location.href="/" + `${l.toLocaleLowerCase()}-${currentCountry}` + (asPath.lastIndexOf("?")>-1?asPath.substring(0,asPath.lastIndexOf("?")):asPath);
    },
    [asPath, currentCountry]
  );

  return (
    <div className="overlay-menu hidden">
      <div className="wrapper" ref={overlayRef}>
        <div className="section-container">
          <div className="top">
            <div className="logo-container">
              <Link href="/" passHref>
                <a>
                  <LogoSymbol color={Color.TERRA_COTTA} />
                </a>
              </Link>
            </div>
            <button className="close-menu-button" onClick={handleMenuClose}>
              <Cross color={Color.TERRA_COTTA} />
            </button>
          </div>
          <nav>
            <div className="left" />
            <ul className="main-menu">
              {mainMenuItems.filter(x=>x.href!='').map(({ href, key }) => (
                <li key={key}>
                  <Link href={href} passHref>
                    <a>{(props as any)[`${key}_main_nav_link_text`]}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="bottom">
            <div className="left">
              <div className="icon-container">
                <Globe color={Color.TERRA_COTTA} />
              </div>
              <LanguageSwitcher
                list={COUNTRIES}
                currentValue={currentCountry}
                onChange={onCountryChange}
              />
              <LanguageSwitcher
                list={currentLanguageList.map((language) => ({
                  name: language,
                  code: language,
                }))}
                currentValue={currentLanguage.toUpperCase()}
                onChange={onLanguageChange}
              />
            </div>
            <ul className="sub-menu">
              {subMenuItems.map(({ key, href }) => {
                if(key!="blogs")
                {
                return (
                <li key={key} data-item={key}>
                  <Link href={href} passHref>
                    <a className="link-underline">
                      {(props as any)[`${key}_main_nav_link_text`] ||
                        (props as any)[`${key}_nav_link_text`]}
                    </a>
                  </Link>
                </li>
              )
                }
                else{
                  return (
                    <li key={key} data-item={key}>
                        <a href={"/" + locale + href} className="link-underline">
                          {(props as any)[`${key}_main_nav_link_text`] ||
                            (props as any)[`${key}_nav_link_text`]}
                        </a>
                      
                    </li>
                  )
                }
            })}
            </ul>
            
          </div>
          <div className="bottom">
            <br/>
          </div>
        </div>
      </div>
    </div>
  );
}
